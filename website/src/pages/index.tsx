import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { ContractDiagram } from "../components/ContractDiagram";
import styles from "./index.module.css";

const FEATURES = [
  {
    tag: "TYPES",
    title: "Type safety, without backend coupling",
    description:
      "Your types are defined by you, in your frontend codebase — not generated from someone else's backend schema.",
  },
  {
    tag: "VALIDATE",
    title: "Runtime validation, not just compile-time hope",
    description:
      "Every response is checked against your schema. If the backend changes shape, you find out immediately, with a clear error, instead of shipping a bug to production.",
  },
  {
    tag: "CACHE",
    title: "Built-in caching",
    description:
      "Call the same state from ten components; one request, one shared cache entry.",
  },
  {
    tag: "STATE",
    title: "Automatic loading & error states",
    description: "No more hand-rolled useState triplets in every component.",
  },
  {
    tag: "URLS",
    title: "Dynamic URLs",
    description:
      "Path params, query params, OData-style filters — your URL logic lives in one place, not scattered across every fetch call in your app.",
  },
  {
    tag: "AGNOSTIC",
    title: "Any backend, any language",
    description:
      ".NET, Java, Go, a REST API someone else's team owns in a separate repo — none of it matters. If it returns JSON over HTTP, this works.",
  },
  {
    tag: "CONTRACT",
    title: "Upfront contract, zero drift",
    description:
      "Your team agrees on the shape of the data once, writes it down as a schema, and every consumer of that state is guaranteed to match it — or fail loudly if it doesn't.",
  },
  {
    tag: "SIMPLE",
    title: "No codegen, no versioning, no ceremony",
    description:
      "There's no generator to run, no spec file to keep in sync, no schema registry, no CLI step between changing a type and using it. Write the schema, call the hook, done.",
  },
  {
    tag: "LEARN",
    title: "Barely any API to learn",
    description:
      "One function to register your states, one hook to consume them. If you know React and zod, you already know this library.",
  },
] as const;

const COMPARISON_ROWS = [
  {
    label: "Backend language",
    lib: "Any",
    trpc: "TypeScript only",
    orpc: "TypeScript only (backend), OpenAPI-exported for other clients",
    raw: "Any",
  },
  {
    label: "Backend location",
    lib: "Any repo",
    trpc: "Same monorepo (typically)",
    orpc: "Same monorepo (typically)",
    raw: "Any",
  },
  { label: "Type safety", lib: "✅", trpc: "✅", orpc: "✅", raw: "❌" },
  {
    label: "Runtime validation",
    lib: "✅",
    trpc: "Partial (via zod, optional)",
    orpc: "✅ (zod, Valibot, ArkType, etc.)",
    raw: "❌",
  },
  {
    label: "Caching",
    lib: "✅ Built in",
    trpc: "Via React Query",
    orpc: "Via React Query (adapter)",
    raw: "❌ Manual",
  },
  {
    label: "Independent team scaling",
    lib: "✅",
    trpc: "❌ Backend & frontend coupled",
    orpc: "⚠️ Backend still must be TS",
    raw: "✅",
  },
  {
    label: "Codegen step",
    lib: "❌ None",
    trpc: "❌ None (type inference)",
    orpc: "⚠️ OpenAPI spec generation for non-TS clients",
    raw: "❌ None",
  },
  {
    label: "API versioning / schema registry",
    lib: "❌ None needed",
    trpc: "N/A",
    orpc: "⚠️ Often paired with one",
    raw: "❌ None",
  },
  {
    label: "Setup",
    lib: "Declare once, no learning curve",
    trpc: "Requires shared router/types",
    orpc: "Requires shared procedures/router",
    raw: "Repeated boilerplate per call",
  },
] as const;

export default function Home() {
  const videoSrc = useBaseUrl("/videos/type_demo.mp4");

  return (
    <Layout
      title="A typesafe, decoupled API layer for your frontend"
      description="Define your app's API contract once — types, validation, and URLs — and never think about data fetching again."
    >
      <div className={styles.root}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>ONE CONTRACT. ANY BACKEND.</p>
            <h1 className={styles.headline}>
              Lightweight type wrapper around your API endpoint
            </h1>
            <p className={styles.subtitle}>
              A fully decoupled, declarative, type-safe API layer for your
              frontend.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="/docs/getting-started">
                Get started
              </Link>
              <Link className={styles.secondaryButton} to="/docs/intro">
                Read the docs
              </Link>
            </div>
          </div>

          <div className={styles.demoFrame}>
            <div className={styles.demoFrameBar}>
              <span className={styles.dot} data-color="red" />
              <span className={styles.dot} data-color="yellow" />
              <span className={styles.dot} data-color="green" />
            </div>
            <video
              className={styles.demoVideo}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              controls
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className={styles.explainer}>
          <div className={styles.explainerText}>
            <h2>Why this exists</h2>
            <p>
              Every frontend team eventually writes the same brittle layer by
              hand: a fetch call, a response cast to <code>any</code>, a loading
              flag, an error flag, and a silent hope that the backend didn't
              change shape overnight.
            </p>
            <p>
              Type-safe API clients like tRPC and oRPC solve part of this — but
              only if your backend is TypeScript, in the same monorepo, and
              willing to couple its release cycle to your frontend's.
            </p>
            <p>
              <strong>
                This library takes a different approach: the contract lives on
                the frontend, and the backend can be anything.
              </strong>
            </p>
          </div>
          <ContractDiagram className={styles.diagram} />
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionHeading}>What you get</h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <div key={feature.tag} className={styles.featureCard}>
                <span className={styles.featureTag}>{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparison}>
          <h2 className={styles.sectionHeading}>How it compares</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th>This library</th>
                  <th>tRPC</th>
                  <th>oRPC</th>
                  <th>fetch / Axios</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.lib}</td>
                    <td>{row.trpc}</td>
                    <td>{row.orpc}</td>
                    <td>{row.raw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to stop writing the same data-fetching boilerplate?</h2>
          <p>
            Head to the Getting Started guide to install the library and define
            your first API model in under five minutes.
          </p>
          <Link className={styles.primaryButton} to="/docs/getting-started">
            Get started
          </Link>
        </section>
      </div>
    </Layout>
  );
}
