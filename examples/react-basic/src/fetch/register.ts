import { useEffect, useState } from "react";
import { validate } from "./validate.ts";
import z from "zod";

export function register<
  ApiTypeMap extends { [stateName: string]: { type: object } },
>(apiModel: {
  [NAME in keyof ApiTypeMap]: {
    url: string;
    schema: z.ZodType<ApiTypeMap[NAME]["type"]>;
  };
}) {
  function useFetch<NAME extends keyof ApiTypeMap>(stateName: NAME) {
    type StateType = ApiTypeMap[NAME]["type"];
    const { url, schema } = apiModel[stateName];
    const [data, setData] = useState<StateType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(validate(schema, data)))
        .catch((e) => setError(String(e)))
        .finally(() => setLoading(false));
    }, [schema, url]);

    return { error, loading, data };
  }
  return { useFetch };
}
