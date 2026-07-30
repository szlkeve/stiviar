import { apiHtml, pageHtml } from "@site/src/examples/generated/generated";
import { CodeFile } from "@site/src/components/CodeFile";

export function HeroCodeSample() {
  return (
    <div className="row">
      <CodeFile codeHtml={pageHtml} fileName="api.ts" />
      <CodeFile codeHtml={apiHtml} fileName="Page.tsx" />
    </div>
  );
}
