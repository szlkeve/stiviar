import { type Todos, TodosSchema } from "./types.ts";
import { register } from "@stiviar/modeled-react";

const apiKey = import.meta.env.VITE_MOCKAPI_KEY;
export const baseUrl = `https://${apiKey}.mockapi.io`;

export const api = register<{
  todos: { type: Todos };
}>(
  {
    todos: {
      url: "/todos",
      schema: TodosSchema,
    },
  },
  { baseUrl },
);

export const useData = api.useData;
export const invalidate = api.invalidate;
export const updateOptimistic = api.updateOptimistic;
