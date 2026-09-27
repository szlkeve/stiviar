// TodoApp.tsx
import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { baseUrl, invalidate, useData } from "../api.ts";

// ─────────────────────────────────────────────
// mutations.ts content
// ─────────────────────────────────────────────

const endpoint = (path: string) => new URL(path, baseUrl).toString();

async function addTodo(title: string) {
  await fetch(endpoint("/todos"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  invalidate("todos");
}

async function toggleTodo(id: string, completed: boolean) {
  await fetch(endpoint(`/todos/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  invalidate("todos");
}

async function deleteTodo(id: string) {
  await fetch(endpoint(`/todos/${id}`), { method: "DELETE" });
  invalidate("todos");
}

// ─────────────────────────────────────────────
// TodoApp component
// ─────────────────────────────────────────────

type Filter = "all" | "active" | "completed";

export function TodoApp() {
  const [filter, setFilter] = useState<Filter>("all");
  const [newTitle, setNewTitle] = useState("");

  const { data: allTodos, isLoading: isLoadingAll } = useData("todos");
  const { data: activeTodos, isLoading: isLoadingActive } = useData(
    "todosByStatus",
    { completed: false },
  );
  const { data: completedTodos, isLoading: isLoadingCompleted } = useData(
    "todosByStatus",
    { completed: true },
  );

  const todos =
    filter === "active"
      ? activeTodos
      : filter === "completed"
        ? completedTodos
        : allTodos;

  const isLoading =
    filter === "active"
      ? isLoadingActive
      : filter === "completed"
        ? isLoadingCompleted
        : isLoadingAll;

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTodo(newTitle.trim());
    setNewTitle("");
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <Card.Header>
        <Card.Title>Todos</Card.Title>
        <Card.Description>
          {allTodos?.length ?? 0} total · {activeTodos?.length ?? 0} active
        </Card.Description>
      </Card.Header>

      <Card.Content className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "primary" : "secondary"}
            onPress={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "primary" : "secondary"}
            onPress={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "primary" : "secondary"}
            onPress={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>

        <TextField
          className="w-full"
          value={newTitle}
          onChange={setNewTitle}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        >
          <Label>New todo</Label>
          <Input placeholder="What needs doing?" />
        </TextField>
        <Button onPress={handleAdd}>Add todo</Button>

        {isLoading && <Spinner />}

        <ul className="flex flex-col gap-2">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between gap-3"
            >
              <Checkbox
                isSelected={todo.completed}
                onChange={(isSelected) => toggleTodo(todo.id, isSelected)}
              >
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <span
                    className={todo.completed ? "line-through text-muted" : ""}
                  >
                    {todo.title}
                  </span>
                </Checkbox.Content>
              </Checkbox>

              <div className="flex items-center gap-2">
                {todo.completed && <Chip>Done</Chip>}
                <Button variant="secondary" onPress={() => deleteTodo(todo.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
}
