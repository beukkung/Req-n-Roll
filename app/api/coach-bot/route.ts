import { NextRequest, NextResponse } from "next/server";
import {
  buildCoachBotFallbackReply,
  buildCoachPrompt,
  detectSensitiveBankingData,
  hasSensitiveDataBlock,
  validateCoachMessages,
} from "@/lib/coach-bot";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateBucket>();

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function checkRateLimit(clientKey: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(clientKey);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

function getGeminiApiKey() {
  return (
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY
  );
}

function buildError(code: string, message: string, status: number) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
      },
    },
    { status },
  );
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.ok) {
    return NextResponse.json(
      {
        error: {
          code: "rate_limit_exceeded",
          message: "ส่งข้อความถี่เกินไป ลองใหม่อีกครั้งหลังเวลาที่กำหนด",
        },
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return buildError("invalid_json", "Request body must be valid JSON", 400);
  }

  const parsed = validateCoachMessages(body);
  if (!parsed.ok) {
    return buildError(parsed.error.code, parsed.error.message, 422);
  }

  const sensitiveFindings = detectSensitiveBankingData(
    parsed.messages.map((message) => message.content).join("\n"),
  );
  const fallback = buildCoachBotFallbackReply(parsed.messages, parsed.mode);
  const sensitiveBlock = hasSensitiveDataBlock(sensitiveFindings);

  if (sensitiveBlock.block) {
    return NextResponse.json({
      data: {
        provider: "local-fallback",
        reply: sensitiveBlock.message,
        sensitiveFindings,
      },
      meta: {
        mode: parsed.mode,
        sensitiveDataBlocked: true,
      },
    });
  }

  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return NextResponse.json({
      data: {
        ...fallback,
        sensitiveFindings,
      },
      meta: {
        mode: parsed.mode,
        warning: "GEMINI_API_KEY or GOOGLE_API_KEY is not configured",
      },
    });
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model,
  )}:generateContent`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: buildCoachPrompt(parsed.messages, parsed.mode) }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          topP: 0.9,
          maxOutputTokens: 900,
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        data: {
          ...fallback,
          sensitiveFindings,
        },
        meta: {
          mode: parsed.mode,
          providerError: "Gemini request failed",
          providerStatus: response.status,
        },
      });
    }

    const payload = (await response.json()) as GeminiGenerateContentResponse;
    const reply = payload.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .map((part) => part.text)
      .filter((text): text is string => Boolean(text?.trim()))
      .join("\n")
      .trim();

    if (!reply) {
      return NextResponse.json({
        data: {
          ...fallback,
          sensitiveFindings,
        },
        meta: {
          mode: parsed.mode,
          providerError: "Gemini returned an empty response",
        },
      });
    }

    return NextResponse.json({
      data: {
        provider: "gemini",
        model,
        reply,
        sensitiveFindings,
      },
      meta: {
        mode: parsed.mode,
      },
    });
  } catch {
    return NextResponse.json({
      data: {
        ...fallback,
        sensitiveFindings,
      },
      meta: {
        mode: parsed.mode,
        providerError: "Gemini request could not be completed",
      },
    });
  }
}
