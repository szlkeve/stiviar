import z from "zod";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { register } from "../../core/register";
import { mockFetchFn } from "../test-helpers/mockFetchFn";
import { renderHook, waitFor } from "@testing-library/react";
import { User } from "../test-helpers/types";
import { UserSchema } from "../test-helpers/schemas";

let mockData: { [url: string]: unknown } = {};

describe("invalidate state", () => {
  beforeEach(() => {
    mockData = {
      "/user": { name: "hello", id: 1 },
    };
  });
  it("refetches state when invalidate is called", async () => {
    const fetchSpy = vi.fn((url: string) => mockFetchFn(url, mockData));
    const { useData, invalidate } = register<{ user: { type: User } }>(
      { user: { url: "/user", schema: UserSchema } },
      { fetchFn: fetchSpy },
    );
    const { result: result1 } = renderHook(() => useData("user"));
    await waitFor(() =>
      expect(result1.current.data).toEqual({ name: "hello", id: 1 }),
    );
    const { result: result2 } = renderHook(() => useData("user"));
    await waitFor(() =>
      expect(result2.current.data).toEqual({ name: "hello", id: 1 }),
    );
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    await invalidate("user");
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(2));
  });
});
