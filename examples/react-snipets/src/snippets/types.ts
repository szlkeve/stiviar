// types.ts
import { z } from "zod";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export const TodoSchema: z.ZodType<Todo> = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
});

export const TodosSchema = z.array(TodoSchema);
export type Todos = Todo[];
