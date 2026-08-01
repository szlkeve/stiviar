import { useState } from "react";
import { CodeFile } from "@site/src/lib/types";

export function FileGroup({ files }: { files: CodeFile[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFile = files[activeIndex];

  if (files.length === 0) return <></>;
  return (
    <div className="w-full flex flex-col rounded-md border-border bg-surface p-2">
      <div className="flex flex-row gap-1">
        {files.map((file, index) => (
          <button
            key={file.fileName}
            onClick={() => setActiveIndex(index)}
            className={`px-3 py-1.5 text-sm font-mono rounded-md transition-colors cursor-pointer ${
              index === activeIndex
                ? "bg-surface-alt text-accent border-b-2 border-accent"
                : "text-muted hover:text-accent bg-surface"
            }`}
          >
            {file.fileName}
          </button>
        ))}
      </div>
      <div
        className="flex-1 min-h-0 [&_pre.shiki]:h-full [&_pre.shiki]:m-0 [&_pre.shiki]:box-border"
        dangerouslySetInnerHTML={{ __html: activeFile.codeHtml }}
      />
    </div>
  );
}
