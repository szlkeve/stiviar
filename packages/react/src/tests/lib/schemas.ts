import { z } from "zod";
import { Movie, Movies, User } from "./types";

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
