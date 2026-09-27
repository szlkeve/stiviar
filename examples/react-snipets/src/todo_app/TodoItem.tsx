import { Button, Checkbox, Chip } from "@heroui/react";
import { deleteTodo, toggleTodo } from "./mutations.ts";
import type { Todo } from "./types.ts";

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <Checkbox
        isSelected={todo.completed}
        onChange={(isSelected) => toggleTodo(todo.id, isSelected)}
      >
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <span className={todo.completed ? "line-through text-muted" : ""}>
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
  );
}
