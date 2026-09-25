import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { register } from "../../../register";
import z from "zod";
import { mockFetchFn } from "../../test-helpers/mockFetchFn";

describe("test base url", () => {
  it("can be registered without a baseUrl option", async () => {
    const mockData = { "http://api/user": "hello" };
    const fetchSpy = vi.fn((url: string) => mockFetchFn(url, mockData));

    const { useFetch } = register<{ user: { type: string } }>(
      { user: { url: "http://api/user", schema: z.string() } },
      { fetchFn: fetchSpy },
    );

    const { result } = renderHook(() => useFetch("user"));
    await waitFor(() => {
      expect(result.current.data).toEqual("hello");
    });

    expect(fetchSpy).toHaveBeenCalledWith("http://api/user");
  });

  it("can register a model alongside a baseUrl option", async () => {
    const mockData = { "http://api/user": "hello" };
    const fetchSpy = vi.fn((url: string) => mockFetchFn(url, mockData));

    const { useFetch } = register<{ user: { type: string } }>(
      { user: { url: "http://api/user", schema: z.string() } },
      // baseUrl is accepted as an option even when the model's own url is absolute
      { baseUrl: "base_url", fetchFn: fetchSpy },
    );

    const { result } = renderHook(() => useFetch("user"));
    await waitFor(() => {
      expect(result.current.data).toEqual("hello");
    });

    expect(fetchSpy).toHaveBeenCalledWith("http://api/user");
  });
});
