import { useFetch } from "../fetch/useFetch.ts";

export function UserCard() {
  const state = useFetch("user");
  return <p>{JSON.stringify(state)}</p>;
}
