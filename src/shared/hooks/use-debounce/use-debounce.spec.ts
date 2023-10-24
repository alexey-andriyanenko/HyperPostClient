import { renderHook } from "@testing-library/react";
import { useDebounce } from "./use-debounce";

jest.useFakeTimers({
  advanceTimers: 50,
});

describe("useDebounce", () => {
  it("calls callback only once on multiple calls", () => {
    const { result } = renderHook(() => useDebounce(50));
    const callback = jest.fn();

    result.current(callback);
    result.current(callback);
    result.current(callback);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("clears debounce on component unmount", () => {
    const { result, unmount } = renderHook(() => useDebounce(50));
    const callback = jest.fn();

    result.current(callback);
    unmount();

    jest.runAllTimers();

    expect(callback).not.toHaveBeenCalled();
  });
});
