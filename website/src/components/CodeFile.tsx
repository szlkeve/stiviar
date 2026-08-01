import { CodeFile } from "@site/src/lib/types";

export function CodeFileCard({ file }: { file: CodeFile }) {
  return (
    <div className="w-full flex flex-col gap-2 rounded-md border-border bg-surface p-2">
      <div className="text--secondary pl-2">{file.fileName}</div>
      <div
        className="flex-1 min-h-0 [&_pre.shiki]:h-full [&_pre.shiki]:m-0 [&_pre.shiki]:box-border"
        dangerouslySetInnerHTML={{ __html: file.codeHtml }}
      />
    </div>
  );
}
