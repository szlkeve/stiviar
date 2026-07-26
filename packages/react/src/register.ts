import { QueryClient, useQuery } from "@tanstack/react-query";
import { validate } from "./lib/validate";
import { defaultFetchFn } from "./lib/defaultFetchFn";
import { ApiModel, BaseApiTypeMap, UseFetchArgs } from "./lib/types";
import { getQueryClientOptions } from "./tests/getQueryClientOptions";

export function register<ApiTypeMap extends BaseApiTypeMap>(
  apiModel: ApiModel<ApiTypeMap>,
  options?: {
    fetchFn?: (url: string) => Promise<unknown>;
    queryClient?: QueryClient;
  },
) {
  const fetchFn = options?.fetchFn ?? defaultFetchFn;
  const client =
    options?.queryClient ?? new QueryClient(getQueryClientOptions());
  function useFetch<NAME extends keyof ApiTypeMap>(
    ...args: UseFetchArgs<ApiTypeMap, NAME>
  ) {
    const [stateName, params] = args;
    type StateType = ApiTypeMap[NAME]["type"];
    const { url, schema } = apiModel[stateName];
    const resolvedUrl: string = typeof url === "string" ? url : url(params);
    const paramKeys = Object.values(params ?? {});
    const queryKey = [stateName, ...paramKeys];
    const queryFn = async (): Promise<StateType> =>
      validate(schema, await fetchFn(resolvedUrl));
    const { data, isLoading, error } = useQuery({ queryKey, queryFn }, client);
    const dataWithType: StateType | undefined = data;
    return { data: dataWithType, isLoading, error };
  }
  return { useFetch };
}
