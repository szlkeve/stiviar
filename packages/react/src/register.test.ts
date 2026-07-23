import { renderHook } from "@testing-library/react";
import { register } from "./register";
import { Movies, User } from "./lib/types";
import { MoviesSchema, UserSchema } from "./lib/schemas";

const BASE_URL = "http://localhost:3001/api";

const { useFetch } = register<{
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

describe("useCounter", () => {
  it("initializes with default value", () => {
    const { result } = renderHook(() => useFetch("user"));
    expect(result.current.data).toBe(undefined);
  });
});
