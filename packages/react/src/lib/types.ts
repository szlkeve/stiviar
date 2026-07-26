import z from "zod";
import { QueryClient } from "@tanstack/react-query";

export type BaseApiTypeMap = {
  [stateName: string]: { type: object } & (
    { params: { [param: string]: string | number } } | { params?: undefined }
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

export type UseFetchArgs<
  ApiTypeMap extends BaseApiTypeMap,
  NAME extends keyof ApiTypeMap,
> = ApiTypeMap[NAME]["params"] extends object
  ? [stateName: NAME, params: ApiTypeMap[NAME]["params"]]
  : [stateName: NAME, params?: undefined];

export type Options = {
  fetchFn?: (url: string) => Promise<unknown>;
  queryClient?: QueryClient;
};