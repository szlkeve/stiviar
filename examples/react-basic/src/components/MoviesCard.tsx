import { useFetch } from "../fetch/useFetch.ts";

export function MoviesCard() {
  const state = useFetch("movies");

  return <p>{JSON.stringify(state)}</p>;
}
