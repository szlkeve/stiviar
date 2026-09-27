import z from "zod";

export type Params = string | number | boolean;

export type BaseApiTypeMap = {
  [stateName: string]: { type: object | string | number | boolean } & (
    { params: { [param: string]: Params } } | { params?: undefined }
  );
};

export type ApiModel<ApiTypeMap extends BaseApiTypeMap> = {
  [NAME in keyof ApiTypeMap]: {
    schema: z.ZodType<ApiTypeMap[NAME]["type"]>;
    url: ApiTypeMap[NAME]["params"] extends object
      ? (params: ApiTypeMap[NAME]["params"]) => string
      : string;
  };
};

export type UseDataArgs<
  ApiTypeMap extends BaseApiTypeMap,
  NAME extends keyof ApiTypeMap,
> = ApiTypeMap[NAME]["params"] extends object
  ? [stateName: NAME, params: ApiTypeMap[NAME]["params"]]
  : [stateName: NAME, params?: undefined];

export type Options = {
  fetchFn?: (url: string) => Promise<unknown>;
  baseUrl?: string;
};

export type createUpdateOptimisticOptions = {
  /** Whether to invalidate (and refetch) the query after applying the optimistic update. */
  invalidateAfterAction: false;
};
