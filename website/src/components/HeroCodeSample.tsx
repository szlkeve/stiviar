import { apiHtml, pageHtml } from "@site/src/examples/generated/generated";
import { CodeFile } from "@site/src/components/CodeFile";

export function HeroCodeSample() {
  return (
    <div className="flex gap-4">
      <CodeFile codeHtml={pageHtml} fileName="api.ts" />
      <CodeFile codeHtml={apiHtml} fileName="Page.tsx" />
    </div>
  );
}
