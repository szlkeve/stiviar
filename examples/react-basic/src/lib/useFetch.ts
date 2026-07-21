import { useEffect, useState } from "react";
import type z from "zod";

export function useFetch<T>(url: string, schema: z.ZodType<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api" + url)
      .then((res) => res.json())
      .then((data) => setData(validate(schema, data)))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [schema, url]);

  return { error, loading, data };
}

function validate<T>(schema: z.ZodType<T>, raw: unknown): T {
  const result = schema.safeParse(raw);
  if (result.success) return result.data;
  throw new Error(`Invalid response shape: ${result.error.message}`);
}
