export function CodeFile({
  fileName,
  codeHtml,
}: {
  fileName: string;
  codeHtml: string;
}) {
  return (
    <div className="col">
      <style>{`
        .code-file {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 0;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--ifm-color-emphasis-300);
          background: var(--ifm-background-surface-color);
        }
        .code-file .file-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--ifm-background-color);
          border-bottom: 1px solid var(--ifm-color-emphasis-300);
          font-family: var(--ifm-font-family-monospace, monospace);
          font-size: 0.8em;
          color: var(--ifm-color-emphasis-600);
        }
        .code-file .file-header::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ifm-color-primary);
          flex-shrink: 0;
        }
        .code-file .file-body {
          flex: 1;
          min-height: 0;
          overflow: auto;
        }
        .code-file .file-body pre.shiki {
          height: 100%;
          margin: 0;
          padding: 12px 14px;
          box-sizing: border-box;
          background: transparent !important;
        }
      `}</style>
      <div className="file-header">{fileName}</div>
      <div
        className="file-body"
        dangerouslySetInnerHTML={{ __html: codeHtml }}
      />
    </div>
  );
}
