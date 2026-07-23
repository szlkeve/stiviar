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
});
