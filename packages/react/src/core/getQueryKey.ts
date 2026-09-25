import { BaseApiTypeMap, UseDataArgs } from "./types";

export function getQueryKey<
  ApiTypeMap extends BaseApiTypeMap,
  NAME extends keyof ApiTypeMap,
>(...args: UseDataArgs<ApiTypeMap, NAME>) {
  const [stateName, params] = args;
  const paramKeys = Object.values(params ?? {});
  return [stateName, ...paramKeys];
}
