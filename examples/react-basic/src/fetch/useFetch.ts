import type { Movies, User } from "../lib/types.ts";
import { MoviesSchema, UserSchema } from "../lib/schemas.ts";
import { register } from "./register.ts";

const BASE_URL = "http://localhost:3001/api";
export const { useFetch } = register<{
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
