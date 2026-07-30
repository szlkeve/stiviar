import { transformerTwoslash } from "@shikijs/twoslash";
import { codeToHtml } from "shiki";
import { writeFileSync } from "node:fs";

const html = await codeToHtml(`console.log()`, {
  lang: "ts",
  theme: "vitesse-dark",
  transformers: [transformerTwoslash()],
});

const generatedPath = "generated/generated.ts";
writeFileSync(
  new URL(generatedPath, import.meta.url),
  `export const heroCodeSampleHtml = ${JSON.stringify(html)};\n`,
);
