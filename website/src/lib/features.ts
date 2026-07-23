export const FEATURES = [
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

export const COMPARISON_ROWS = [
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
