import {transformerTwoslash} from "@shikijs/twoslash";
import {codeToHtml} from "shiki";
import {readFileSync, writeFileSync} from "node:fs";

async function generateHtml(path: string, lang: "ts" | "tsx") {
  const code = readFileSync(new URL(path, import.meta.url), "utf-8");
  return codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
    transformers: [transformerTwoslash()],
  });
}

const apiHtml = await generateHtml("raw/api.ts", "ts");
const pageHtml = await generateHtml("raw/page.tsx", "tsx");

const generatedPath = "generated/generated.ts";
writeFileSync(
    new URL(generatedPath, import.meta.url),
    `export const apiHtml = ${JSON.stringify(apiHtml)};\nexport const pageHtml = ${JSON.stringify(pageHtml)};\n`,
);