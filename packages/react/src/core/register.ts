import { QueryClient } from "@tanstack/react-query";
import { ApiModel, BaseApiTypeMap, Options, UseDataArgs } from "./types";
import { getQueryClientOptions } from "./getQueryClientOptions";
import { createDataHook } from "./createDataHook";
import { createInvalidateFunction } from "./invalidate";

export function register<ApiTypeMap extends BaseApiTypeMap>(
  apiModel: ApiModel<ApiTypeMap>,
  options?: Options,
) {
  const client = new QueryClient(getQueryClientOptions());
  const useData = createDataHook(apiModel, client, options);
  const invalidate = createInvalidateFunction(client);
  return { useData, client, invalidate };
}
