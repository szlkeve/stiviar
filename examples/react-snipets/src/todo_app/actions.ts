import { baseUrl } from "./api.ts";

const endpoint = (path: string) => new URL(path, baseUrl).toString();

export async function postAddTodo(title: string) {
  await fetch(endpoint("/todos"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
}

export async function postToggleTodo(id: string, completed: boolean) {
  await fetch(endpoint(`/todos/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
}

export async function postDeleteTodo(id: string) {
  await fetch(endpoint(`/todos/${id}`), { method: "DELETE" });
}
