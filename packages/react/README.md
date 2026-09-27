# @stiviar/modeled-react

A declarative, type-safe API layer for React. Register your API once — as a type, a URL, and a Zod schema — and get a fully typed data-fetching hook with built-in caching and runtime validation.

No codegen, no backend language restrictions, no manual `any` casting between fetch and component. Just describe the shape of what you're calling, and `modeled-react` handles the rest.

## Install

```bash
npm i @stiviar/modeled-react
```

## Usage

Define your models once — covering a simple list, a single resource by id, a filtered list, and an OData-style query:

```ts
// api.ts
import { register } from "@stiviar/modeled-react";
import { Todo, TodoSchema, Todos, TodosSchema } from "./types";

export const api = register<{
  todos: { type: Todos }; // simple endpoint — no params
  todo: { type: Todo; params: { id: string } }; // single resource, accessed by id
  todosByStatus: { type: Todos; params: { completed: boolean } }; // filtered list, plain query params
  todosOData: {
    type: Todos;
    params: { $filter?: string; $orderby?: string; $top?: number };
  }; // OData-style query
}>({
  todos: {
    url: "https://api.example.com/todos",
    schema: TodosSchema, // schema is type checked agains the registered type - no mismatch possible
  },
  todo: {
    url: (p) => `https://api.example.com/todos/${p.id}`, // type of p: {id: string}
    schema: TodoSchema,
  },
  todosByStatus: {
    url: (p) => `https://api.example.com/todos?completed=${p.completed}`, // type of p: {completed: boolean}
    schema: TodosSchema,
  },
  todosOData: {
    url: (p) => {
      // type of p: { $filter?: string; $orderby?: string; $top?: number }
      const query = new URLSearchParams(
        Object.entries(p).map(([k, v]) => [k, String(v)]),
      );
      return `https://api.example.com/odata/todos?${query.toString()}`;
    },
    schema: TodosSchema,
  },
});

export const useData = api.useData;
```

Use it in a component:

```tsx
// Component.tsx
import { useData } from "./api";

export function Component() {
  const { data: allTodos } = useData("todos");
  const { data: oneTodo } = useData("todo", { id: "42" });
  const { data: activeTodos } = useData("todosByStatus", { completed: false });
  const { data: topTodos } = useData("todosOData", {
    $filter: "completed eq false",
    $orderby: "createdAt desc",
    $top: 10,
  });

  return <div>{allTodos?.length} todos total</div>;
}
```

Types declared for a model flow through the whole codebase — hover `data` in your IDE and see the inferred type, with a compile-time error if your schema and type ever drift apart. Every response is also validated at runtime against the same schema, so a change on the backend fails loudly instead of silently breaking the UI.

## Features

- Full type safety, no manual casting
- Runtime validation on every fetch
- Built-in caching (TanStack Query under the hood)
- Typed error handling

## Testing

Swap the fetch implementation at registration time so components stay testable without a network:

```ts
export const api = register<TypeModel>(apiModel, {
  fetchFn: IS_DEV ? mockFetch : fetch,
});
```

## API

- `useData(key, params?)` — TanStack Query-backed fetch hook for a registered endpoint

## License

MIT
