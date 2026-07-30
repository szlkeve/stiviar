import { apiHtml, pageHtml } from "@site/src/examples/generated/generated";

export function HeroCodeSample() {
  return (
    <div className="two-file-code-sample">
      <style>{`
        .two-file-code-sample {
          display: flex;
          gap: 16px;
          height: 400px;
        }
        .two-file-code-sample .file-panel {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .two-file-code-sample .file-label {
          font-size: 0.8em;
          opacity: 0.6;
          padding: 4px 8px;
        }
        .two-file-code-sample pre.shiki {
          flex: 1;
          margin: 0;
          box-sizing: border-box;
          overflow: auto;
        }
      `}</style>
      <div className="file-panel">
        <div className="file-label">api.ts</div>
        <div
          style={{ height: "100%" }}
          dangerouslySetInnerHTML={{ __html: apiHtml }}
        />
      </div>
      <div className="file-panel">
        <div className="file-label">page.tsx</div>
        <div
          style={{ height: "100%" }}
          dangerouslySetInnerHTML={{ __html: pageHtml }}
        />
      </div>
    </div>
  );
}
