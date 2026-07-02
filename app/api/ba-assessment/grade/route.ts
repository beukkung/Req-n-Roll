import { NextRequest, NextResponse } from "next/server";
import {
  detectSensitiveBankingData,
  hasSensitiveDataBlock,
} from "@/lib/coach-bot";
import {
  buildGradeFallback,
  buildGradePrompt,
  findWrittenPrompt,
  parseGradeResponse,
  validateGradeRequest,
} from "@/lib/ba-assessment-grade";

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
          message: "ส่งคำขอถี่เกินไป ลองใหม่อีกครั้งหลังเวลาที่กำหนด",
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

  const parsed = validateGradeRequest(body);
  if (!parsed.ok) {
    return buildError(parsed.error.code, parsed.error.message, 422);
  }

  const resolved = findWrittenPrompt(parsed.setId, parsed.promptId);
  if (!resolved) {
    return buildError(
      "prompt_not_found",
      "ไม่พบชุดข้อสอบหรือข้อเขียนที่ระบุ",
      404,
    );
  }

  const { set, prompt } = resolved;
  const fallback = buildGradeFallback(prompt, parsed.answer);

  const sensitiveFindings = detectSensitiveBankingData(parsed.answer);
  const sensitiveBlock = hasSensitiveDataBlock(sensitiveFindings);
  if (sensitiveBlock.block) {
    return NextResponse.json({
      data: {
        ...fallback,
        sensitiveFindings,
        sensitiveBlockMessage: sensitiveBlock.message,
      },
      meta: {
        setId: parsed.setId,
        promptId: parsed.promptId,
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
        setId: parsed.setId,
        promptId: parsed.promptId,
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
            parts: [{ text: buildGradePrompt(set, prompt, parsed.answer) }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          maxOutputTokens: 900,
          responseMimeType: "application/json",
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
          setId: parsed.setId,
          promptId: parsed.promptId,
          providerError: "Gemini request failed",
          providerStatus: response.status,
        },
      });
    }

    const payload = (await response.json()) as GeminiGenerateContentResponse;
    const text = payload.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .map((part) => part.text)
      .filter((value): value is string => Boolean(value?.trim()))
      .join("\n")
      .trim();

    if (!text) {
      return NextResponse.json({
        data: {
          ...fallback,
          sensitiveFindings,
        },
        meta: {
          setId: parsed.setId,
          promptId: parsed.promptId,
          providerError: "Gemini returned an empty response",
        },
      });
    }

    let grade;
    try {
      grade = parseGradeResponse(text);
    } catch {
      return NextResponse.json({
        data: {
          ...fallback,
          sensitiveFindings,
        },
        meta: {
          setId: parsed.setId,
          promptId: parsed.promptId,
          providerError: "Gemini response could not be parsed",
        },
      });
    }

    return NextResponse.json({
      data: {
        ...grade,
        model,
        sensitiveFindings,
      },
      meta: {
        setId: parsed.setId,
        promptId: parsed.promptId,
        model,
      },
    });
  } catch {
    return NextResponse.json({
      data: {
        ...fallback,
        sensitiveFindings,
      },
      meta: {
        setId: parsed.setId,
        promptId: parsed.promptId,
        providerError: "Gemini request could not be completed",
      },
    });
  }
}
