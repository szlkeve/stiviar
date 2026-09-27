import { baseUrl, updateOptimistic } from "./api.ts";
import type { Todo } from "./types.ts";

const endpoint = (path: string) => new URL(path, baseUrl).toString();

export async function addTodo(title: string) {
  const action = async () =>
    await fetch(endpoint("/todos"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
  const newTodo: Todo = {
    title,
    completed: true,
    id: Math.random().toString(),
    createdAt: Date.now().toString(),
  };
  await updateOptimistic(
    ["todos"],
    (currentData) => [...(currentData ?? []), newTodo],
    action,
    {
      invalidateAfterAction: false,
    },
  );
}

export async function toggleTodo(id: string, completed: boolean) {
  const action = async () =>
    await fetch(endpoint(`/todos/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  await updateOptimistic(
    ["todos"],
    (currentData) =>
      currentData?.map((cd) =>
        cd.id === id ? { ...cd, completed: cd.completed } : cd,
      ),
    action,
    {
      invalidateAfterAction: false,
    },
  );
}

export async function deleteTodo(id: string) {
  const action = async () =>
    await fetch(endpoint(`/todos/${id}`), { method: "DELETE" });

  await updateOptimistic(
    ["todos"],
    (currentData) => currentData?.filter((cd) => cd.id !== id),
    action,
    {
      invalidateAfterAction: false,
    },
  );
}
