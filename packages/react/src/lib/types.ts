import z from "zod";

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
