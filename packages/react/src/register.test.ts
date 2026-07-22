import { renderHook } from "@testing-library/react";
import { register } from "./register";
import { z } from "zod";

export type User = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  year: number;
};

export type Movies = Movie[];

export const UserSchema: z.ZodType<User> = z.object({
  id: z.number(),
  name: z.string(),
});

export const MovieSchema: z.ZodType<Movie> = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
});

export const MoviesSchema: z.ZodType<Movies> = z.array(MovieSchema);
const BASE_URL = "http://localhost:3001/api";

describe("useCounter", () => {
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
  it("initializes with default value", () => {
    const { result } = renderHook(() => useFetch("user"));
    expect(result.current.data).toBe(undefined);
  });
});
