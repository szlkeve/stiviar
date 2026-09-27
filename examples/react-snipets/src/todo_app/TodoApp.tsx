import { useState } from "react";
import { Button, Card, Input, Label, Spinner, TextField } from "@heroui/react";
import { addTodo } from "./mutations.ts";
import { TodoItem } from "./TodoItem.tsx";
import type { Filter } from "./types.ts";
import { useTodos } from "./useTodos.ts";

export function TodoApp() {
  const [filter, setFilter] = useState<Filter>("all");
  const [newTitle, setNewTitle] = useState("");
  const { todos, activeTodos, isLoading, allTodos } = useTodos(filter);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTodo(newTitle.trim());
    setNewTitle("");
  };

  return (
    <div className="py-16">
      <Card className="w-full max-w-xl mx-auto">
        <Card.Header className="flex flex-row items-center justify-between">
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
            variant="secondary"
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
    </div>
  );
}
