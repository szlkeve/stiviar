import { useFetch } from "../lib/useFetch.ts";

export function MoviesCard() {
  const state = useFetch("movies");

  return <p>{JSON.stringify(state)}</p>;
}
