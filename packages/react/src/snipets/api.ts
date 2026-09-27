// api.ts
import { Todo, TodoSchema, Todos, TodosSchema } from "./types";
import { register } from "../core/register";

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
    schema: TodosSchema, // schema is type checked against the registered type - no mismatch possible
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
    // type of p: { $filter?: string; $orderby?: string; $top?: number }
    url: (p) => `https://api.example.com/odata/todos?${paramsToQuerystring(p)}`,
    schema: TodosSchema,
  },
});

const paramsToQuerystring = (params: object) =>
  new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  ).toString();
