import { register } from "../../../core/register";
import z from "zod";

describe("test base url — type tests", () => {
  it("can be registered without a baseUrl option", () => {
    register<{ user: { type: string } }>({
      user: { url: "http://api/user", schema: z.string() },
    });
  });

  it("can register a model alongside a baseUrl option", () => {
    register<{ user: { type: string } }>(
      { user: { url: "http://api/user", schema: z.string() } },
      { baseUrl: "base_url" },
    );
  });

  it("baseUrl must be a string", () => {
    register<{ user: { type: string } }>(
      { user: { url: "http://api/user", schema: z.string() } },
      // @ts-expect-error - baseUrl must be a string
      { baseUrl: 123 },
    );
  });
});
