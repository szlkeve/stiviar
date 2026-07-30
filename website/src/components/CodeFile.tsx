export function CodeFile({
  fileName,
  codeHtml,
}: {
  fileName: string;
  codeHtml: string;
}) {
  return (
    <div className="w-full flex flex-col gap-2 rounded-md border-border bg-surface p-2">
      <div className="text--secondary pl-2">{fileName}</div>
      <div
        className="flex-1 min-h-0 [&_pre.shiki]:h-full [&_pre.shiki]:m-0 [&_pre.shiki]:box-border"
        dangerouslySetInnerHTML={{ __html: codeHtml }}
      />
    </div>
  );
}
