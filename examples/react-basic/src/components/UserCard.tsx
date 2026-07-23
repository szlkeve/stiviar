import { useFetch } from "../lib/useFetch.ts";

export function UserCard() {
  const { data, isLoading, error } = useFetch("user");

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  return <p>{data?.name}</p>;
}
