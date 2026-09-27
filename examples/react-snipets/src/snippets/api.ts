import { type Todo, TodoSchema, type Todos, TodosSchema } from "./types.ts";
import { register } from "@stiviar/modeled-react";

const apiKey = import.meta.env.VITE_MOCKAPI_KEY;
const baseUrl = `https://${apiKey}.mockapi.io/api/`;
export const api = register<{
  todos: { type: Todos }; // simple endpoint — no params
  todo: { type: Todo; params: { id: string } }; // single resource, accessed by id
  todosByStatus: { type: Todos; params: { completed: boolean } }; // filtered list, plain query params
  todosOData: {
    type: Todos;
    params: { $filter?: string; $orderby?: string; $top?: number };
  }; // OData-style query
}>(
  {
    todos: {
      url: "/todos",
      schema: TodosSchema, // schema is type checked against the registered type - no mismatch possible
    },
    todo: {
      url: (p) => `/todos/${p.id}`, // type of p: {id: string}
      schema: TodoSchema,
    },
    todosByStatus: {
      url: (p) => `/todos?completed=${p.completed}`, // type of p: {completed: boolean}
      schema: TodosSchema,
    },
    todosOData: {
      // type of p: { $filter?: string; $orderby?: string; $top?: number }
      url: (p) => `/odata/todos?${paramsToQuerystring(p)}`,
      schema: TodosSchema,
    },
  },
  { baseUrl },
);

const paramsToQuerystring = (params: object) =>
  new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  ).toString();

export const useData = api.useData;
