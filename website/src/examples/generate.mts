import { transformerTwoslash } from "@shikijs/twoslash";
import { codeToHtml } from "shiki";
import { readFileSync, writeFileSync } from "node:fs";

async function generateHtml(path: string, lang: "ts" | "tsx") {
  const code = readFileSync(new URL(path, import.meta.url), "utf-8");
  return codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
    transformers: [transformerTwoslash()],
  });
}

// api.ts has no imports of its own, so it can render standalone as-is
const apiHtml = await generateHtml("raw/api.ts", "ts");

// page.tsx needs api.ts's real content available for resolution,
// but hidden from the rendered output via ---cut---
const apiCode = readFileSync(new URL("raw/api.ts", import.meta.url), "utf-8");
const pageCode = readFileSync(
  new URL("raw/page.tsx", import.meta.url),
  "utf-8",
);

const pageWithHiddenDep = `// @filename: api.ts\n${apiCode}\n// @filename: page.tsx\n// ---cut---\n${pageCode}`;

const pageHtml = await codeToHtml(pageWithHiddenDep, {
  lang: "tsx",
  theme: "vitesse-dark",
  transformers: [transformerTwoslash()],
});

const generatedPath = "generated/generated.ts";
writeFileSync(
  new URL(generatedPath, import.meta.url),
  `export const apiHtml = ${JSON.stringify(apiHtml)};\nexport const pageHtml = ${JSON.stringify(pageHtml)};\n`,
);
