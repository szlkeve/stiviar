import { useEffect, useState } from "react";
import type z from "zod";
import { validate } from "./validate.ts";
import type { Movies, User } from "../lib/types.ts";
import { MoviesSchema, UserSchema } from "../lib/schemas.ts";

type ApiTypeMap = {
  user: { type: User };
  movies: { type: Movies };
};

const ApiModel: {
  [NAME in keyof ApiTypeMap]: {
    url: string;
    schema: z.ZodType<ApiTypeMap[NAME]["type"]>;
  };
} = {
  user: {
    url: "",
    schema: UserSchema,
  },
  movies: {
    url: "",
    schema: MoviesSchema,
  },
};

function register() {
  function useFetch<NAME extends keyof ApiTypeMap>(stateName: NAME) {
    type StateType = ApiTypeMap[NAME]["type"];
    const { url, schema } = ApiModel[stateName];
    const [data, setData] = useState<StateType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      fetch("http://localhost:3001/api" + url)
        .then((res) => res.json())
        .then((data) => setData(validate(schema, data)))
        .catch((e) => setError(String(e)))
        .finally(() => setLoading(false));
    }, [schema, url]);

    return { error, loading, data };
  }
  return { useFetch };
}

export const { useFetch } = register();
