import { useFetch } from "../lib/useFetch.ts";

export function UserCard() {
  const { data } = useFetch("user");
  return <p>{JSON.stringify(data)}</p>;
}
