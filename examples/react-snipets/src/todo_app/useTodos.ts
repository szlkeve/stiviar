import { useData } from "./api.ts";
import type { Filter } from "./types.ts";

export function useTodos(filter: Filter) {
  const { data: allTodos, isLoading } = useData("todos");

  const activeTodos = allTodos?.filter((todo) => !todo.completed);
  const completedTodos = allTodos?.filter((todo) => todo.completed);
  const todos =
    filter === "active"
      ? activeTodos
      : filter === "completed"
        ? completedTodos
        : allTodos;

  return { todos, activeTodos, isLoading, allTodos };
}
