import { register } from "./register";
import { UserSchema } from "./lib/schemas";

const BASE_URL = "http://localhost:3001/api";
const userUrl = BASE_URL + "/user";
describe("register type tests", () => {
  it("throws error on type - schema mismatch", () => {
    register<{ user: { type: { name_1: string } } }>({
      // @ts-ignore
      user: { url: userUrl, schema: UserSchema },
    });
  });
});
