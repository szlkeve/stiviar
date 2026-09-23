import React from "react";
import { useFetch } from "@site/src/examples/jsonplaceholder/api";

export function Component() {
  const { data } = useFetch("users");

  return <div>user: {data?.length}</div>;
}
