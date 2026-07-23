import { renderHook, waitFor } from "@testing-library/react";
import { register } from "../register";
import { User } from "./lib/types";
import { UserSchema } from "./lib/schemas";
import { mockFetchFn } from "./lib/mockFetchFn";
import { beforeAll } from "vitest";

let mockData: { [url: string]: unknown } = {};
const { useFetch } = register<{ user: { type: User } }>(
  { user: { url: "/user", schema: UserSchema } },
  (url) => mockFetchFn(url, mockData),
);

describe("API model tests", () => {
  beforeAll(() => {
    mockData = {
      "/user": { name: "hello", id: 1 },
    };
  });
  it("initializes with default value", async () => {
    const { result } = renderHook(() => useFetch("user"));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(undefined);
    await waitFor(() => {
      expect(result.current.data).toEqual({ name: "hello", id: 1 });
    });
  });
});
