# stiviar

Declarative, type-safe API layer for frontend apps — React & Vue bindings, runtime validation, contract testing.

A fully decoupled, declarative, type-safe API layer for your frontend — and a deterministic harness for the AI era.

## The problem

Every frontend team eventually writes the same brittle layer by hand: a fetch call, a response cast to `any`, a loading flag, an error flag, and a silent hope that the backend didn't change shape overnight. Type-safe RPC clients solve this only if your backend is TypeScript, lives in the same monorepo, and is willing to couple its release cycle to your frontend's.

`stiviar` doesn't care what backend you use or where it lives.

## Features

- **Full type safety** — no guessing, casting, or hacky validation in components
- **Comprehensive caching** — built on TanStack Query
- **Runtime validation** — every fetch is checked against a registered schema, so backend drift fails loudly instead of silently
- **Built-in error handling** — a typed `ApiError` with a static `ErrorDefinitions` map
- **Fully unit testable** — swap the fetch implementation at registration time
- **Automatic contract validation** — `isContractValid()` keeps frontend and backend in sync
- **Declarative model** — describe your external service once, use it everywhere
- **Framework support** — React, Vue, and more to come

## Packages

| Package | Description |
|---|---|
| [`@stiviar/core`](./packages/core) | Framework-agnostic engine: model registration, validation, caching, errors |
| [`@stiviar/react`](./packages/react) | React bindings (`useFetch`) |
| [`@stiviar/vue`](./packages/vue) | Vue bindings |

## Quick start

```bash
npm i @stiviar/core @stiviar/react
```

```ts
// api.ts
import { register } from "@stiviar/core";
import { Users, UsersSchema } from "./types";

export const api = register<{ users: { type: Users } }>({
  users: {
    url: "https://api.example.com/users",
    schema: UsersSchema,
  },
});

export const useFetch = api.useFetch;
```

```tsx
// Component.tsx
import { useFetch } from "./api";

export function Component() {
  const { data } = useFetch("users");
  return <div>user count: {data?.length}</div>;
}
```

See each package's README for framework-specific usage.

## Development

Monorepo managed with npm workspaces.

```bash
npm install
npm run build
npm test
```

## License

MIT
