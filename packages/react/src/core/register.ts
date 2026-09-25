import { QueryClient } from "@tanstack/react-query";
import { ApiModel, BaseApiTypeMap, Options } from "./types";
import { getQueryClientOptions } from "./getQueryClientOptions";
import { createDataHook } from "./createDataHook";

export function register<ApiTypeMap extends BaseApiTypeMap>(
  apiModel: ApiModel<ApiTypeMap>,
  options?: Options,
) {
  const client = new QueryClient(getQueryClientOptions());
  const useData = createDataHook(apiModel, client, options);
  return { useData, client };
}
