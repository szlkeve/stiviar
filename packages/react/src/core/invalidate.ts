import { BaseApiTypeMap, UseDataArgs } from "./types";
import { getQueryKey } from "./getQueryKey";
import { QueryClient } from "@tanstack/react-query";

export function createInvalidateFunction<ApiTypeMap extends BaseApiTypeMap>(
  client: QueryClient,
) {
  const invalidate = async <NAME extends keyof ApiTypeMap>(
    ...args: UseDataArgs<ApiTypeMap, NAME>
  ) => {
    const queryKey = getQueryKey<ApiTypeMap, NAME>(...args);
    await client.invalidateQueries({ queryKey });
  };
  return invalidate;
}
