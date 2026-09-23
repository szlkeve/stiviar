import { register } from "@styviar/api_model";
import { z } from "zod";

export const UserSchema: z.ZodType<string> = z.string();
export const MoviesSchema: z.ZodType<string> = z.string();

export type User = string;
export type Movies = string;

export const api = register<{
  user: { type: User };
  movies: { type: User };
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
