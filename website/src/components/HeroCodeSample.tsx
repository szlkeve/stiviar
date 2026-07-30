import { apiHtml, pageHtml } from "@site/src/examples/generated/generated";
import { CodeFile } from "@site/src/components/CodeFile";

export function HeroCodeSample() {
  return (
    <div className="flex gap-4 h-[32rem]">
      <CodeFile codeHtml={pageHtml} fileName="Pasge.tsx" />
      <CodeFile codeHtml={apiHtml} fileName="api.ts" />
    </div>
  );
}
