import { generated } from "@site/src/examples/generated/generated";

export function HeroCodeSample() {
  return (
    <div className="hero-code-sample" style={{ height: 400 }}>
      <style>{`
        .hero-code-sample { height: 400px; }
        .hero-code-sample pre.shiki {
          height: 100%;
          margin: 0;
          box-sizing: border-box;
          overflow: auto;
        }
      `}</style>
      <div
        style={{ height: "100%" }}
        dangerouslySetInnerHTML={{ __html: generated }}
      />
    </div>
  );
}
