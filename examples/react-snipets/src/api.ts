import { type Todo, TodoSchema, type Todos, TodosSchema } from "./types.ts";
import { register } from "@stiviar/modeled-react";

const apiKey = import.meta.env.VITE_MOCKAPI_KEY;
export const baseUrl = `https://${apiKey}.mockapi.io/api/`;

export const api = register<{
  todos: { type: Todos }; // simple endpoint — no params
  todo: { type: Todo; params: { id: string } }; // single resource, accessed by id
  todosByStatus: { type: Todos; params: { completed: boolean } }; // filtered list, plain query params
  todosPaginated: {
    type: Todos;
    params: { page: number; limit: number };
  }; // paginated list
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
    todosPaginated: {
      url: (p) => `/todos?${paramsToQuerystring(p)}`, // type of p: {page: number; limit: number}
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
export const invalidate = api.invalidate;
