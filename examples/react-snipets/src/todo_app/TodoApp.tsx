// TodoApp.tsx
import { useState } from "react";
import { Button, Card, Input, Label, Spinner, TextField } from "@heroui/react";
import { useData } from "./api.ts";
import { addTodo } from "./mutations.ts";
import { TodoItem } from "./TodoItem.tsx";

type Filter = "all" | "active" | "completed";

export function TodoApp() {
  const [filter, setFilter] = useState<Filter>("all");
  const [newTitle, setNewTitle] = useState("");
  const { data: allTodos, isLoading } = useData("todos");
  const activeTodos = allTodos.filter((todo) => !todo.completed);
  const completedTodos = allTodos.filter((todo) => todo.completed);
  const todos =
    filter === "active"
      ? activeTodos
      : filter === "completed"
        ? completedTodos
        : allTodos;

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
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
}
