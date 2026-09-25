import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./api";

describe("integration tests", () => {
  it("sets the correct value", async () => {
    const { result } = renderHook(() => useFetch("category", { id: "1" }));
    expect(result.current.data).toBe(undefined);
    await waitFor(() => {
      expect(result.current.data).toEqual({
        name: "Clark Skiles Jr.",
        slug: "Investor Functionality Planner",
        id: "1",
      });
    });
  });
});
