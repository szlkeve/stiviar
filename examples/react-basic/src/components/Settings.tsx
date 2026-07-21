import { useFetch } from "../fetch/useFetch.ts";
import { UserSchema } from "../lib/schemas.ts";

export function Settings() {
  const state = useFetch("/user", UserSchema);
  return <p>setting {state.data?.name}</p>;
}
