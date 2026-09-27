import { baseUrl, invalidate } from "./api.ts";

const endpoint = (path: string) => new URL(path, baseUrl).toString();

export async function addTodo(title: string) {
  await fetch(endpoint("/todos"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  await invalidate("todos");
}

export async function toggleTodo(id: string, completed: boolean) {
  await fetch(endpoint(`/todos/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  await invalidate("todos");
}

export async function deleteTodo(id: string) {
  await fetch(endpoint(`/todos/${id}`), { method: "DELETE" });
  await invalidate("todos");
}
