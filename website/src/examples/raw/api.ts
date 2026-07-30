import { register } from "@styviar/api_model";
import { z } from "zod";

export const UserSchema: z.ZodType<string> = z.string();
export const MoviesSchema: z.ZodType<string> = z.string();

export const api = register<{
  user: { type: string };
  movies: { type: string };
}>({
  user: {
    url: "/api/user",
    schema: UserSchema,
  },
  movies: {
    url: "/api/movies",
    schema: MoviesSchema,
  },
});

export const useFetch = api.useFetch;
