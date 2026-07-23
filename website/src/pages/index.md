---
title: A typesafe, decoupled API layer for your frontend
description: Define your app's API contract once — types, validation, and URLs — and never think about data fetching again.
slug: /
---



# Lightweight type wrapper around your API endpoint 

**A fully decoupled, declarative, type-safe API layer for your frontend.**


<video
src="/videos/type_demo.mp4"
autoPlay
muted
loop
playsInline
controls
style={{ width: "100%", borderRadius: "8px", marginTop: "1rem" }}
>
Your browser does not support the video tag.
</video>




## Why this exists




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