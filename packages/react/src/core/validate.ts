import z from "zod";
import { ApiError } from "./errors";

type Simplify<T> = { [K in keyof T]: T[K] } & {};
export function validate<T>(schema: z.ZodType<T>, raw: unknown): Simplify<T> {
  const result = schema.safeParse(raw);
  if (result.success) return result.data;
  throw new ApiError("VALIDATION_ERROR", {
    cause: result.error,
    message: result.error.message,
  });
}
