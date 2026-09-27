import { updateOptimistic } from "./api.ts";
import type { Todo } from "./types.ts";
import { postAddTodo, postDeleteTodo, postToggleTodo } from "./actions.ts";

export async function addTodo(title: string) {
  const newTodo: Todo = {
    title,
    completed: true,
    id: Math.random().toString(),
    createdAt: Date.now().toString(),
  };
  await updateOptimistic(
    ["todos"],
    (currentData) => [...(currentData ?? []), newTodo],
    () => postAddTodo(title),
    { invalidateAfterAction: false },
  );
}

export async function toggleTodo(id: string, completed: boolean) {
  await updateOptimistic(
    ["todos"],
    (currentData) =>
      currentData?.map((cd) =>
        cd.id === id ? { ...cd, completed: cd.completed } : cd,
      ),
    () => postToggleTodo(id, completed),
    { invalidateAfterAction: false },
  );
}

export async function deleteTodo(id: string) {
  await updateOptimistic(
    ["todos"],
    (currentData) => currentData?.filter((cd) => cd.id !== id),
    () => postDeleteTodo(id),
    { invalidateAfterAction: false },
  );
}
