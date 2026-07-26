import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import { register } from "../register";
import { User } from "./lib/types";
import { UserSchema } from "./lib/schemas";
import { mockFetchFn } from "./lib/mockFetchFn";
import { ApiError } from "../errors";

let mockData: { [url: string]: unknown } = {};

describe("API model tests", () => {
  beforeEach(() => {
    mockData = {
      "/user": { name: "hello", id: 1 },
    };
  });

  it("sets the correct value", async () => {
    const { useFetch } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );
    const { result } = renderHook(() => useFetch("user"));
    expect(result.current.data).toBe(undefined);
    await waitFor(() =>
      expect(result.current.data).toEqual({ name: "hello", id: 1 }),
    );
  });

  it("sets the correct loading state", async () => {
    const { useFetch } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );
    const { result } = renderHook(() => useFetch("user"));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("sets an error when the response fails schema validation", async () => {
    mockData = { "/user": { name: "hello" } }; // missing id — fails UserSchema
    const { useFetch } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );
    const { result } = renderHook(() => useFetch("user"));
    await waitFor(() => {
      console.log("current: ", result.current);
      expect(result.current.error).not.toBeNull();
    });
    expect(result.current.error).toBeInstanceOf(ApiError);
    // @ts-expect-error - error might be undefined, but we expect it not to be. If it is, the test is wrong
    expect(result.current.error.code).toBe("VALIDATION_ERROR");
  });

  it("caches the request — only fetches once across multiple hook instances", async () => {
    const fetchSpy = vi.fn((url: string) => mockFetchFn(url, mockData));
    const { useFetch } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: fetchSpy },
    );
    const { result: result1 } = renderHook(() => useFetch("user"));
    const { result: result2 } = renderHook(() => useFetch("user"));
    await waitFor(() => {
      expect(result1.current.data).toEqual({ name: "hello", id: 1 });
      expect(result2.current.data).toEqual({ name: "hello", id: 1 });
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
