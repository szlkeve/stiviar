import { renderHook, waitFor } from "@testing-library/react";
import { register } from "../../core/register";
import { mockFetchFn } from "../test-helpers/mockFetchFn";
import { z } from "zod";
import { vi } from "vitest";
import { ApiError } from "../../core/errors";

interface Transaction {
  id: number;
  amount: number;
}

type DateRangeParams = {
  from: string;
  to: string;
};

const TransactionSchema = z.object({
  id: z.number(),
  amount: z.number(),
});
const TransactionsSchema = z.array(TransactionSchema);

let mockData: { [url: string]: unknown } = {};

describe("dynamic state with custom params", () => {
  beforeEach(() => {
    mockData = {
      "/transactions?from=2024-01-01&to=2024-01-31": [
        { id: 1, amount: 100 },
        { id: 2, amount: 250 },
      ],
    };
  });

  it("builds the URL from params and returns the correct data", async () => {
    const { useData } = register<{
      transactions: { type: Transaction[]; params: DateRangeParams };
    }>(
      {
        transactions: {
          url: (params) => `/transactions?from=${params.from}&to=${params.to}`,
          schema: TransactionsSchema,
        },
      },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );

    const { result } = renderHook(() =>
      useData("transactions", { from: "2024-01-01", to: "2024-01-31" }),
    );

    expect(result.current.data).toBe(undefined);

    await waitFor(() => {
      expect(result.current.data).toEqual([
        { id: 1, amount: 100 },
        { id: 2, amount: 250 },
      ]);
    });
  });

  it("treats different params as different cache entries", async () => {
    mockData = {
      "/transactions?from=2024-01-01&to=2024-01-31": [{ id: 1, amount: 100 }],
      "/transactions?from=2024-02-01&to=2024-02-28": [{ id: 2, amount: 250 }],
    };

    const fetchSpy = vi.fn((url: string) => mockFetchFn(url, mockData));

    const { useData } = register<{
      transactions: { type: Transaction[]; params: DateRangeParams };
    }>(
      {
        transactions: {
          url: (params) => `/transactions?from=${params.from}&to=${params.to}`,
          schema: TransactionsSchema,
        },
      },
      { fetchFn: fetchSpy },
    );

    const { result: january } = renderHook(() =>
      useData("transactions", { from: "2024-01-01", to: "2024-01-31" }),
    );
    const { result: february } = renderHook(() =>
      useData("transactions", { from: "2024-02-01", to: "2024-02-28" }),
    );

    await waitFor(() => {
      expect(january.current.data).toEqual([{ id: 1, amount: 100 }]);
      expect(february.current.data).toEqual([{ id: 2, amount: 250 }]);
    });

    // two distinct param sets → two distinct requests, not deduped as one cache entry
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("reuses the cache when called again with identical params", async () => {
    const fetchSpy = vi.fn((url: string) => mockFetchFn(url, mockData));

    const { useData } = register<{
      transactions: { type: Transaction[]; params: DateRangeParams };
    }>(
      {
        transactions: {
          url: (params) => `/transactions?from=${params.from}&to=${params.to}`,
          schema: TransactionsSchema,
        },
      },
      { fetchFn: fetchSpy },
    );

    const params = { from: "2024-01-01", to: "2024-01-31" };
    const { result: first } = renderHook(() =>
      useData("transactions", params),
    );
    const { result: second } = renderHook(() =>
      useData("transactions", params),
    );

    await waitFor(() => {
      expect(first.current.data).toBeDefined();
      expect(second.current.data).toBeDefined();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
  it("sets a validation error when the response doesn't match the schema", async () => {
    mockData = {
      "/transactions?from=2024-01-01&to=2024-01-31": [
        { id: 1, amount: "not-a-number" }, // amount should be a number, not a string
      ],
    };

    const { useData } = register<{
      transactions: { type: Transaction[]; params: DateRangeParams };
    }>(
      {
        transactions: {
          url: (params) => `/transactions?from=${params.from}&to=${params.to}`,
          schema: TransactionsSchema,
        },
      },
      { fetchFn: (url) => mockFetchFn(url, mockData) },
    );

    const { result } = renderHook(() =>
      useData("transactions", { from: "2024-01-01", to: "2024-01-31" }),
    );

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
    // @ts-expect-error - code does not exist on general errors
    expect(result.current.error?.code).toBe("VALIDATION_ERROR");
    expect(result.current.data).toBe(undefined);
  });
});
