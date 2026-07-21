import { useFetch } from "../fetch/useFetch.ts";
import { UserSchema } from "../lib/schemas.ts";
import type { User } from "../lib/types.ts";

export function UserCard() {
  const state = useFetch<User>("/user", UserSchema);
  console.log("state: ", state);
  return <p>{JSON.stringify(state)}</p>;
}
