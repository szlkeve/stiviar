import {
  BaseApiTypeMap,
  createUpdateOptimisticOptions,
  UseDataArgs,
} from "./types";
import { getQueryKey } from "./getQueryKey";
import { QueryClient } from "@tanstack/react-query";

export function createUpdateOptimisticFunction<
  ApiTypeMap extends BaseApiTypeMap,
>(client: QueryClient) {
  type State<NAME extends keyof ApiTypeMap> =
    ApiTypeMap[NAME]["type"] | undefined;
  const updateOptimistic = async <NAME extends keyof ApiTypeMap>(
    state: UseDataArgs<ApiTypeMap, NAME>,
    getNewData: (currentData: State<NAME>) => State<NAME>,
    action: () => Promise<unknown>,
    options: createUpdateOptimisticOptions,
  ) => {
    const queryKey = getQueryKey<ApiTypeMap, NAME>(...state);
    const [[, currentData]] = client.getQueriesData<State<NAME> | undefined>({
      queryKey,
    });
    const newData = getNewData(currentData);
    client.setQueryData(queryKey, newData);
    await action();
    if (options.invalidateAfterAction)
      await client.invalidateQueries({ queryKey });
  };
  return updateOptimistic;
}
