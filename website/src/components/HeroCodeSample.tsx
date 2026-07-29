import {heroCodeSampleHtml} from "@site/src/components/heroCodeSample.generated";

export function HeroCodeSample() {
  return (
    <div
      className="hero-code-sample"
      dangerouslySetInnerHTML={{ __html: heroCodeSampleHtml }}
    />
  );
}
