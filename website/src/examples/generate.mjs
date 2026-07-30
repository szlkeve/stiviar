import { codeToHtml } from "shiki";
import { readFileSync, writeFileSync } from "node:fs";

const examplePath = "raw/helloWorldExample.ts";
const code = readFileSync(new URL(examplePath, import.meta.url), "utf-8");

console.log("code: ", code);

const html = await codeToHtml(code, {
  lang: "ts",
  theme: "vitesse-dark",
});

const generatedPath = "generated/generated.ts";
writeFileSync(
  new URL(generatedPath, import.meta.url),
  `export const generated = ${JSON.stringify(html)};\n`,
);
