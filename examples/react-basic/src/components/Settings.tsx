import { useFetch } from "../fetch/useFetch.ts";

export function Settings() {
  const state = useFetch("user");
  return <p>setting {state.data?.name}</p>;
}
