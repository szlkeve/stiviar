import { ApiModel, BaseApiTypeMap, Options, UseDataArgs } from "./types";
import { validate } from "./validate";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { defaultFetchFn } from "./defaultFetchFn";

export function createDataHook<ApiTypeMap extends BaseApiTypeMap>(
  apiModel: ApiModel<ApiTypeMap>,
  client: QueryClient,
  options?: Options,
) {
  const fetchFn = options?.fetchFn ?? defaultFetchFn;
  function useData<NAME extends keyof ApiTypeMap>(
    ...args: UseDataArgs<ApiTypeMap, NAME>
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

  return useData;
}
