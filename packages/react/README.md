# @stiviar/modeled-react

React bindings for [modeled](https://github.com/szlkeve/stiviar) — a declarative, type-safe API layer.

## Install

```bash
npm i @stiviar/modeled-react
```

## Usage

Define your models once:

```ts
// api.ts
import { register } from "@stiviar/modeled-react";
import { Todos, TodosSchema, Users, UsersSchema } from "./types";

export const api = register<{
  users: { type: Users };
  todos: { type: Todos };
}>({
  users: {
    url: "https://api.example.com/users",
    schema: UsersSchema,
  },
  todos: {
    url: "https://api.example.com/todos",
    schema: TodosSchema,
  },
});

export const useData = api.useData;
export const isContractValid = api.isContractValid;
```

Use it in a component:

```tsx
// Component.tsx
import { useData } from "./api";

export function Component() {
  const { data, isLoading, error } = useData("users");

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;

  return <div>user count: {data?.length}</div>;
}
```

Types declared for a model flow through the whole codebase — hover `data` in your IDE and see the inferred type, with a compile-time error if your schema and type ever drift apart.

## Testing

Swap the fetch implementation at registration time so components stay testable without a network:

```ts
export const api = register<TypeModel>(apiModel, {
  fetchFn: IS_DEV ? mockFetch : fetch,
});
```

## API

- `useData(key, params?)` — TanStack Query-backed fetch hook for a registered endpoint
- `isContractValid(openApiSchema)` — validates a live OpenAPI contract against your registered types

## License

MIT