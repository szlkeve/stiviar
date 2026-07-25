export type BaseApiTypeMap = { [stateName: string]: { type: object } };
import z from "zod";

export type ApiModel<ApiTypeMap extends BaseApiTypeMap> = {
  [NAME in keyof ApiTypeMap]: {
    url: string;
    schema: z.ZodType<ApiTypeMap[NAME]["type"]>;
  };
};
