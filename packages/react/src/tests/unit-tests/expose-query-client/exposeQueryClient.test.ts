import { register } from "../../../core/register";
import z from "zod";
import { expect } from "vitest";
import { QueryClient } from "@tanstack/react-query";

describe("exposed query client", () => {
  it("can access query client through the register function", () => {
    const { client } = register<{ user: { type: string } }>({
      user: { url: "http://api/user", schema: z.string() },
    });
    expect(client).toBeInstanceOf(QueryClient);
  });
});
