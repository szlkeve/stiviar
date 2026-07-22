import z from "zod";
import {QueryClient, useQuery} from "@tanstack/react-query";
import {validate} from "./validate";

export function register<
  ApiTypeMap extends { [stateName: string]: { type: object } },
>(apiModel: {
  [NAME in keyof ApiTypeMap]: {
    url: string;
    schema: z.ZodType<ApiTypeMap[NAME]["type"]>;
  };
}) {
  const client = new QueryClient();
  function useFetch<NAME extends keyof ApiTypeMap>(stateName: NAME) {
    type StateType = ApiTypeMap[NAME]["type"];
    const { url, schema } = apiModel[stateName];
    const { data, isLoading, error } = useQuery(
      {
        queryKey: [stateName],
        queryFn: async (): Promise<StateType> => {
          const res = await fetch(url);
          const raw: unknown = await res.json();
          return validate(schema, raw);
        },
      },
      client,
    );
    const dataWithType: StateType | undefined = data;
    return { data: dataWithType, loading: isLoading, error };
  }
  return { useFetch };
}
