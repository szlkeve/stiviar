import { codeToHtml } from "shiki";
import { readFileSync, writeFileSync } from "node:fs";
import { transformerTwoslash } from "@shikijs/twoslash";

const examplePath = "raw/helloWorldExample.ts";
const code = readFileSync(new URL(examplePath, import.meta.url), "utf-8");

const html = await codeToHtml(code, {
  lang: "ts",
  theme: "vitesse-dark",
  transformers: [transformerTwoslash()],
});

const generatedPath = "generated/generated.ts";
writeFileSync(
  new URL(generatedPath, import.meta.url),
  `export const generated = ${JSON.stringify(html)};\n`,
);
