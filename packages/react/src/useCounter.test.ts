import { act, renderHook } from "@testing-library/react";
import { useCounter } from "./counter";

describe("useCounter", () => {
  it("initializes with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("initializes with a custom value", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it("increments the count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("decrements the count", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it("resets to the initial value", () => {
    const { result } = renderHook(() => useCounter(3));

    act(() => {
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(3);
  });
});
