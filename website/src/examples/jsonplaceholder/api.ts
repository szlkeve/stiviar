// api.ts

import { register } from "@stiviar/api_model";
import {
  Todos,
  TodosSchema,
  Users,
  UsersSchema,
} from "@site/src/examples/jsonplaceholder/types";


export const api = register<{
  users: { type: Users };
  todos: { type: Todos };
}>({
  users: {
    url: "https://jsonplaceholder.typicode.com/users",
    schema: UsersSchema,
  },
  todos: {
    url: "https://jsonplaceholder.typicode.com/todos",
    schema: TodosSchema,
  },
});

export const useFetch = api.useFetch