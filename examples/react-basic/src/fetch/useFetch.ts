import type { Movies, User } from "../lib/types.ts";
import { MoviesSchema, UserSchema } from "../lib/schemas.ts";
import { register } from "@styviar/api_model";

const BASE_URL = "http://localhost:3001/api";
export const api = register<{
  user: { type: User };
  movies: { type: Movies };
}>({
  user: {
    url: BASE_URL + "/user",
    schema: UserSchema,
  },
  movies: {
    url: BASE_URL + "/movies",
    schema: MoviesSchema,
  },
});

export const useFetch = api.useFetch;
