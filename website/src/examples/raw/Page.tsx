import React from "react";
import { useFetch } from "./api";

export function Page() {
  const user = useFetch("user");

  return <div>Hello, {user.data}</div>;
}
