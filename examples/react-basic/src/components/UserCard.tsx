import { useFetch } from "../lib/useFetch.ts";
import { UserSchema } from "../lib/schemas.ts";
import type { User } from "../lib/types.ts";

export function UserCard() {
  const { error, loading, data } = useFetch<User>("/user", UserSchema);
  return <p>{JSON.stringify({ loading, error, data })}</p>;
}
