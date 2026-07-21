import { useFetch } from "../lib/useFetch.ts";
import { MoviesSchema } from "../lib/schemas.ts";
import type { Movies } from "../lib/types.ts";

export function MoviesCard() {
  const { error, loading, data } = useFetch<Movies>("/movies", MoviesSchema);
  return <p>{JSON.stringify({ loading, error, data })}</p>;
}
