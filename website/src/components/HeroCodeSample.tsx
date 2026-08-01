import { apiHtml, pageHtml } from "@site/src/examples/generated/generated";
import { CodeFileCard } from "@site/src/components/CodeFile";
import { FileGroup } from "@site/src/components/FileGroup";

export function HeroCodeSample() {
  return (
    <div className="flex gap-4 h-[32rem] w-full overflow-auto">
      <CodeFileCard
        file={{
          codeHtml: pageHtml,
          fileName: "Page.ts",
        }}
      />
      <FileGroup
        files={[
          {
            codeHtml: apiHtml,
            fileName: "api.ts",
          },
          {
            codeHtml: apiHtml,
            fileName: "types.ts",
          },
          {
            codeHtml: apiHtml,
            fileName: "schemas.ts",
          },
        ]}
      />
    </div>
  );
}
