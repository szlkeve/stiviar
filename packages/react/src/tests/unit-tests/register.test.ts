import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import { register } from "../../core/register";
import { User } from "../test-helpers/types";
import { UserSchema } from "../test-helpers/schemas";
import { mockFetchFn } from "../test-helpers/mockFetchFn";
import { ApiError } from "../../core/errors";

let mockData: { [url: string]: unknown } = {};

describe("API model tests", () => {
  beforeEach(() => {
    mockData = {
      "/user": { name: "hello", id: 1 },
    };
  });

  it("sets the correct value", async () => {
    const { useData } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );
    const { result } = renderHook(() => useData("user"));
    expect(result.current.data).toBe(undefined);
    await waitFor(() =>
      expect(result.current.data).toEqual({ name: "hello", id: 1 }),
    );
  });

  it("sets the correct loading state", async () => {
    const { useData } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );
    const { result } = renderHook(() => useData("user"));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("sets an error when the response fails schema validation", async () => {
    mockData = { "/user": { name: "hello" } }; // missing id — fails UserSchema
    const { useData } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );
    const { result } = renderHook(() => useData("user"));
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
    expect(result.current.error).toBeInstanceOf(ApiError);
    // @ts-expect-error - error might be undefined, but we expect it not to be. If it is, the test is wrong
    expect(result.current.error.code).toBe("VALIDATION_ERROR");
  });

  it("caches the request — only fetches once across multiple hook instances", async () => {
    const fetchSpy = vi.fn((url: string) => mockFetchFn(url, mockData));
    const { useData } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: fetchSpy },
    );
    const { result: result1 } = renderHook(() => useData("user"));
    const { result: result2 } = renderHook(() => useData("user"));
    await waitFor(() => {
      expect(result1.current.data).toEqual({ name: "hello", id: 1 });
      expect(result2.current.data).toEqual({ name: "hello", id: 1 });
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
