---
title: A typesafe, decoupled API layer for your frontend
description: Define your app's API contract once — types, validation, and URLs — and never think about data fetching again.
slug: /
---

# Stop wiring up fetch calls. Start declaring your API model.

**A fully decoupled, declarative, type-safe API layer for your frontend.**

Define the shape of your app's data once — a type, a validation schema, and a URL — and get automatic type safety, runtime validation, caching, and error handling for free. No backend coupling. No codegen step. No versioning. No language lock-in. Set up in minutes, with almost nothing new to learn.

<div className="row">
<div className="col col--6">

```tsx
export const api = register<{
  user: { type: User };
  movies: { type: Movies };
}>({
  user: {
    url: BASE_URL + "/user",
    schema: UserSchema,
  },
  movies: {
    url: BASE_URL + "/movies",
    schema: MoviesSchema,
  },
});

export const useFetch = api.useFetch;
```

</div>
<div className="col col--6">

```tsx
function Settings() {
  const state = useFetch("user");
  return <p>Settings for {state.data?.name}</p>;
}
```

</div>
</div>

That's the whole integration. `state.data` is fully typed as `User | null`, validated against `UserSchema` at runtime, cached, and automatically re-fetched or shared across every component that calls `useFetch("user")`.

---

## Why this exists

Every frontend team eventually writes the same brittle layer by hand: a `fetch` call, a `.json()` cast to `any`, a loading flag, an error flag, and a silent hope that the backend didn't change shape overnight. Type-safe API clients like tRPC and oRPC solve part of this — but only if your backend is TypeScript, in the same monorepo, and willing to couple its release cycle to your frontend's. oRPC loosens this slightly by exporting an OpenAPI spec so non-TS clients can call in, but the backend implementation itself is still tied to TypeScript.

This library takes a different approach: **the contract lives on the frontend, and the backend can be anything.**

## What you get

- **Type safety, without backend coupling** — your types are defined by *you*, in your frontend codebase, not generated from someone else's backend schema.
- **Runtime validation, not just compile-time hope** — every response is checked against your schema. If the backend changes shape, you find out immediately, with a clear error, instead of shipping `undefined.toUpperCase()` to production.
- **Built-in caching** — call the same state from ten components; one request, one shared cache entry.
- **Automatic loading & error states** — no more hand-rolled `useState` triplets in every component.
- **Dynamic URLs** — path params, query params, OData-style filters — your URL logic lives in one place, not scattered across every `fetch` call in your app.
- **Any backend, any language** — .NET, Java, Go, a REST API someone else's team owns in a separate repo — none of it matters. If it returns JSON over HTTP, this works.
- **Upfront contract, zero drift** — your team agrees on the shape of the data once, writes it down as a schema, and every consumer of that state is guaranteed to match it — or fail loudly if it doesn't.
- **No codegen, no versioning, no ceremony** — there's no generator to run, no `.proto` or spec file to keep in sync, no schema registry, no CLI step between changing a type and using it. Write the schema, call the hook, done.
- **Barely any API to learn** — one function to register your states, one hook to consume them. If you know React and zod, you already know this library.

## How it compares

| | This library | tRPC | oRPC | Raw `fetch` / Axios |
|---|---|---|---|---|
| Backend language | Any | TypeScript only | TypeScript only (backend), OpenAPI-exported for other clients | Any |
| Backend location | Any repo | Same monorepo (typically) | Same monorepo (typically) | Any |
| Type safety | ✅ | ✅ | ✅ | ❌ |
| Runtime validation | ✅ | Partial (via zod, optional) | ✅ (zod, Valibot, ArkType, etc.) | ❌ |
| Caching | ✅ Built in | Via React Query | Via React Query (adapter) | ❌ Manual |
| Independent team scaling | ✅ | ❌ Backend & frontend coupled | ⚠️ Backend still must be TS | ✅ |
| Codegen step | ❌ None | ❌ None (type inference) | ⚠️ OpenAPI spec generation for non-TS clients | ❌ None |
| API versioning / schema registry | ❌ None needed | N/A | ⚠️ Often paired with one | ❌ None |
| Setup | Declare once, no learning curve | Requires shared router/types | Requires shared procedures/router | Repeated boilerplate per call |

## Get started

Ready to stop writing the same data-fetching boilerplate in every component? Head to the [Getting Started](/docs/getting-started) guide to install the library and define your first API model in under five minutes.