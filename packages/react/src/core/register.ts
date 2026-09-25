import { QueryClient } from "@tanstack/react-query";
import { ApiModel, BaseApiTypeMap, Options } from "./types";
import { getQueryClientOptions } from "./getQueryClientOptions";
import { createUseFetch } from "./createUseFetch";

export function register<ApiTypeMap extends BaseApiTypeMap>(
  apiModel: ApiModel<ApiTypeMap>,
  options?: Options,
) {
  const client =
    options?.queryClient ?? new QueryClient(getQueryClientOptions());
  const useData = createUseFetch(apiModel, client, options);
  return { useData };
}
