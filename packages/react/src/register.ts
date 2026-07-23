import z from "zod";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { validate } from "./lib/validate";
import { defaultFetchFunction } from "./lib/defaultFetchFunction";

export function register<
  ApiTypeMap extends { [stateName: string]: { type: object } },
>(
  apiModel: {
    [NAME in keyof ApiTypeMap]: {
      url: string;
      schema: z.ZodType<ApiTypeMap[NAME]["type"]>;
    };
  },
  fetchFunction = defaultFetchFunction,
) {
  const client = new QueryClient();
  function useFetch<NAME extends keyof ApiTypeMap>(stateName: NAME) {
    type StateType = ApiTypeMap[NAME]["type"];
    const { url, schema } = apiModel[stateName];
    const queryKey = [stateName];
    const queryFn = async (): Promise<StateType> =>
      validate(schema, await fetchFunction(url));
    const { data, isLoading, error } = useQuery({ queryKey, queryFn }, client);
    const dataWithType: StateType | undefined = data;
    return { data: dataWithType, isLoading, error };
  }
  return { useFetch };
}
