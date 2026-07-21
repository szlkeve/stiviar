import z from "zod";

export function validate<T>(schema: z.ZodType<T>, raw: unknown): T {
  const result = schema.safeParse(raw);
  if (result.success) return result.data;
  throw new Error(`Invalid response shape: ${result.error.message}`);
}
