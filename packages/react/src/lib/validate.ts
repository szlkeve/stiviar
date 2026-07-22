import z from "zod";

type Simplify<T> = { [K in keyof T]: T[K] } & {};
export function validate<T>(schema: z.ZodType<T>, raw: unknown): Simplify<T> {
  const result = schema.safeParse(raw);
  if (result.success) return result.data;
  throw new Error(`Invalid response shape: ${result.error.message}`);
}
