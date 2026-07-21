import { useFetch } from "../fetch/useFetch.ts";
import { MoviesSchema } from "../lib/schemas.ts";
import type { Movies } from "../lib/types.ts";

export function MoviesCard() {
  const state = useFetch<Movies>("/movies", MoviesSchema);
  return <p>{JSON.stringify(state)}</p>;
}
