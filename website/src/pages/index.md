---
title: A typesafe, decoupled API layer for your frontend
description: Define your app's API contract once — types, validation, and URLs — and never think about data fetching again.
slug: /
---

# Stop wiring up fetch calls. Start declaring your API model.

**A fully decoupled, declarative, type-safe API layer for your frontend.**

Define the shape of your app's data once — a type, a validation schema, and a URL — and get automatic type safety, runtime validation, caching, and error handling for free. No backend coupling. No codegen step tied to a specific server. No language lock-in.

```tsx
export const api = register<{
  user: { type: User };
  movies: { type: Movies };
}>({
  user: {
    url: "api/user",
    schema: UserSchema,
  },
  movies: {
    url: "api/movies",
    schema: MoviesSchema,
  },
});

export const useFetch = api.useFetch;
```

```tsx
function Settings() {
  const state = useFetch("user");
  return <p>Settings for {state.data?.name}</p>;
}
```

That's the whole integration. `state.data` is fully typed as `User | null`, validated against `UserSchema` at runtime, cached, and automatically re-fetched or shared across every component that calls `useFetch("user")`.

---

## Why this exists

Every frontend team eventually writes the same brittle layer by hand: a `fetch` call, a `.json()` cast to `any`, a loading flag, an error flag, and a silent hope that the backend didn't change shape overnight. Type-safe API clients like tRPC solve part of this — but only if your backend is TypeScript, in the same monorepo, and willing to couple its release cycle to your frontend's.

This library takes a different approach: **the contract lives on the frontend, and the backend can be anything.**

## What you get

- **Type safety, without backend coupling** — your types are defined by *you*, in your frontend codebase, not generated from someone else's backend schema.
- **Runtime validation, not just compile-time hope** — every response is checked against your schema. If the backend changes shape, you find out immediately, with a clear error, instead of shipping `undefined.toUpperCase()` to production.
- **Built-in caching** — call the same state from ten components; one request, one shared cache entry.
- **Automatic loading & error states** — no more hand-rolled `useState` triplets in every component.
- **Dynamic URLs** — path params, query params, OData-style filters — your URL logic lives in one place, not scattered across every `fetch` call in your app.
- **Any backend, any language** — .NET, Java, Go, a REST API someone else's team owns in a separate repo — none of it matters. If it returns JSON over HTTP, this works.
- **Upfront contract, zero drift** — your team agrees on the shape of the data once, writes it down as a schema, and every consumer of that state is guaranteed to match it — or fail loudly if it doesn't.

## How it compares

| | This library | tRPC | Raw `fetch` / Axios |
|---|---|---|---|
| Backend language | Any | TypeScript only | Any |
| Backend location | Any repo | Same monorepo (typically) | Any |
| Type safety | ✅ | ✅ | ❌ |
| Runtime validation | ✅ | Partial (via zod, optional) | ❌ |
| Caching | ✅ Built in | Via React Query | ❌ Manual |
| Independent team scaling | ✅ | ❌ Backend & frontend coupled | ✅ |
| Setup | Declare once | Requires shared router/types | Repeated boilerplate per call |

## Get started

Ready to stop writing the same data-fetching boilerplate in every component? Head to the [Getting Started](/docs/getting-started) guide to install the library and define your first API model in under five minutes.