import { register } from "../register";
import { UserSchema } from "./lib/schemas";

const BASE_URL = "http://localhost:3001/api";
const userUrl = BASE_URL + "/user";
describe("register type tests", () => {
  it("throws error on type - schema mismatch", () => {
    register<{ user: { type: { name_1: string } } }>({
      user: {
        url: userUrl,
        // @ts-expect-error - type - schema mismatch
        schema: UserSchema,
      },
    });
  });
  it("throws error on statename mismatch", () => {
    register<{ user: { type: { name: string } } }>({
      // @ts-expect-error - state name mismatch
      user_1: {
        url: userUrl,
        schema: UserSchema,
      },
    });
  });
  it("throws error on statename mismatch", () => {
    const { useFetch } = register<{ user: { type: { name: string } } }>({
      user: {
        url: userUrl,
        schema: UserSchema,
      },
    });
    // @ts-expect-error - state name reference
    useFetch("user_1");
  });
  it("requires url to be a function when params are declared", () => {
    register<{ user: { type: { name: string }; params: { id: number } } }>({
      user: {
        // @ts-expect-error - url must be a function when params are declared, not a plain string
        url: userUrl,
        schema: UserSchema,
      },
    });
  });

  it("requires url to be a plain string when params are not declared", () => {
    register<{ user: { type: { name: string } } }>({
      user: {
        // @ts-expect-error - url must be a string when no params are declared, not a function
        url: (params: { id: number }) => userUrl + params.id,
        schema: UserSchema,
      },
    });
  });

  it("throws error when url function's params type does not match declared params", () => {
    register<{ user: { type: { name: string }; params: { id: number } } }>({
      user: {
        // @ts-expect-error - params shape mismatch: declared { id: number }, url expects { slug: string }
        url: (params: { slug: string }) => `${userUrl}/${params.slug}`,
        schema: UserSchema,
      },
    });
  });

  it("requires useFetch to be called with params when the state declares them", () => {
    const { useFetch } = register<{
      user: { type: { name: string }; params: { id: number } };
    }>({
      user: {
        url: (params: { id: number }) => `${userUrl}/${params.id}`,
        schema: UserSchema,
      },
    });
    // @ts-expect-error - missing required params argument
    useFetch("user");
  });

  it("does not allow useFetch to be called with params when the state has none", () => {
    const { useFetch } = register<{ user: { type: { name: string } } }>({
      user: {
        url: userUrl,
        schema: UserSchema,
      },
    });
    // @ts-expect-error - state declares no params, extra argument not allowed
    useFetch("user", { id: 1 });
  });

  it("throws error when useFetch is called with the wrong params shape", () => {
    const { useFetch } = register<{
      user: { type: { name: string }; params: { id: number } };
    }>({
      user: {
        url: (params: { id: number }) => `${userUrl}/${params.id}`,
        schema: UserSchema,
      },
    });
    // @ts-expect-error - params shape mismatch: expects { id: number }, got { id: string }
    useFetch("user", { id: "1" });
  });
});
