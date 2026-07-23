import type { Movies, User } from "./types.ts";
import { MoviesSchema, UserSchema } from "./schemas.ts";
import { register } from "@styviar/api_model";
import { BASE_URL } from "./constants.ts";

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
