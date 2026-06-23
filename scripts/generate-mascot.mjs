// AI-generate the Req'n Roll mascot (Riff) via fal.ai.
// Reads FAL_KEY from .env.local (or process.env). No MCP required.
//
// Usage:
//   node scripts/generate-mascot.mjs              # nano-banana-2 (cheap, fast, iterate)
//   node scripts/generate-mascot.mjs --pro        # nano-banana-pro (final, higher fidelity)
//   node scripts/generate-mascot.mjs --seed 7     # reproducible
//
// Outputs PNGs to public/mascot/riff-<n>.png

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public", "mascot");

const args = process.argv.slice(2);
const usePro = args.includes("--pro");
const seedArg = args.includes("--seed") ? Number(args[args.indexOf("--seed") + 1]) : undefined;

const MODEL = usePro ? "fal-ai/nano-banana-pro" : "fal-ai/nano-banana-2";

const PROMPT = [
  "Cute mascot illustration of a friendly ginger orange tabby cat,",
  "Studio Ghibli inspired soft warm hand-drawn illustration style,",
  "big round glossy dark green eyes with bright sparkle highlights, soft pink blush cheeks,",
  "gentle happy smile, small rounded ears with cream inner ears, a few subtle darker ginger tabby stripes,",
  "wearing small round music headphones, sitting upright facing forward, full body, centered composition,",
  "warm cream and soft amber background, cozy adorable approachable mood,",
  "clean simple shapes, soft natural shading, professional mascot logo sticker look, high quality,",
  "no text, no words, no letters, square composition with generous padding around the character",
].join(" ");

function readEnvLocal(key) {
  const p = resolve(ROOT, ".env.local");
  if (!existsSync(p)) return undefined;
  const lines = readFile(p, "utf8");
  return lines.then((txt) => {
    const re = new RegExp(`^\\s*${key}\\s*=\\s*(.*)\\s*$`, "m");
    const m = txt.match(re);
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
  });
}

async function getKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY;
  const fromFile = await readEnvLocal("FAL_KEY");
  return fromFile;
}

async function falQueue(model, input) {
  const base = `https://queue.fal.run/${model}`;
  const res = await fetch(base, {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env._FAL}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`submit ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function pollStatus(statusUrl) {
  // poll until COMPLETED or error
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    const r = await fetch(statusUrl, {
      headers: { Authorization: `Key ${process.env._FAL}` },
    });
    const j = await r.json();
    if (j.status === "COMPLETED") return j;
    if (j.status === "FAILED" || j.status === "ERROR") {
      throw new Error(`generation failed: ${JSON.stringify(j)}`);
    }
    process.stdout.write(".");
    await new Promise((q) => setTimeout(q, 2500));
  }
  throw new Error("timed out waiting for generation");
}

async function fetchResult(responseUrl) {
  const r = await fetch(responseUrl, {
    headers: { Authorization: `Key ${process.env._FAL}` },
  });
  if (!r.ok) throw new Error(`result ${r.status}: ${await r.text()}`);
  return r.json();
}

function pickImages(result) {
  const imgs = result.images || (result.image ? [result.image] : []);
  return imgs
    .map((im) => (typeof im === "string" ? im : im.url))
    .filter(Boolean);
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download ${url} -> ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  const key = await getKey();
  if (!key) {
    console.error("No FAL_KEY found. Add  FAL_KEY=xxxx  to .env.local and re-run.");
    process.exit(1);
  }
  process.env._FAL = key; // stash for helpers without re-reading

  await mkdir(OUT_DIR, { recursive: true });

  const input = {
    prompt: PROMPT,
    image_size: "square",
    num_images: 2,
  };
  if (seedArg !== undefined) input.seed = seedArg;
  if (usePro) input.guidance_scale = 7.5;

  console.log(`Model:    ${MODEL}`);
  console.log(`Output:   ${OUT_DIR}`);
  console.log("Submitting");

  const submitted = await falQueue(MODEL, input);
  const { request_id, status_url, response_url } = submitted;
  if (!response_url) {
    throw new Error(`unexpected submit response: ${JSON.stringify(submitted)}`);
  }
  console.log(`request:  ${request_id}`);

  process.stdout.write("Generating");
  await pollStatus(status_url);
  console.log(" done");

  const result = await fetchResult(response_url);
  const images = pickImages(result);
  if (!images.length) {
    console.error("No image URLs in result:", JSON.stringify(result).slice(0, 500));
    process.exit(1);
  }

  let i = 0;
  for (const url of images) {
    i++;
    const dest = resolve(OUT_DIR, `riff-${i}.png`);
    const bytes = await download(url, dest);
    console.log(`  saved ${dest}  (${(bytes / 1024).toFixed(0)} KB)`);
  }
  console.log(`\nDone. Review public/mascot/riff-*.png and tell me which (or how to tweak the prompt).`);
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
