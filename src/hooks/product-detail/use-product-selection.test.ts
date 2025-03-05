import { renderHook } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { act } from "react";

import type { ColorOption, StorageOption } from "@/types/api";

import { useProductSelection } from "./use-product-selection";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

const colorOptions: ColorOption[] = [
  { name: "red", hexCode: "#FF0000", imageUrl: "red-image-url" },
  { name: "blue", hexCode: "#0000FF", imageUrl: "blue-image-url" },
];

const storageOptions: StorageOption[] = [
  { capacity: "64GB", price: 100 },
  { capacity: "128GB", price: 200 },
];

describe("useProductSelection", () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (param: string) => (param === "storage" ? "128GB" : "red"),
    });
  });

  test("should initialize with correct values based on URL parameters", () => {
    const { result } = renderHook(() =>
      useProductSelection({
        basePrice: 50,
        colorOptions,
        storageOptions,
      })
    );

    expect(result.current.storage).toBe("128GB");
    expect(result.current.color).toBe("red");
    expect(result.current.price).toBe(200);
    expect(result.current.preview).toBe("red-image-url");
  });

  test("should update storage and price when changing storage", () => {
    const { result } = renderHook(() =>
      useProductSelection({
        basePrice: 50,
        colorOptions,
        storageOptions,
      })
    );

    act(() => {
      result.current.handleStorageChange("64GB");
    });

    expect(result.current.storage).toBe("64GB");
    expect(result.current.price).toBe(100);
  });

  test("should update color and preview when changing color", () => {
    const { result } = renderHook(() =>
      useProductSelection({
        basePrice: 50,
        colorOptions,
        storageOptions,
      })
    );

    act(() => {
      result.current.handleColorChange("blue");
    });

    expect(result.current.color).toBe("blue");
    expect(result.current.preview).toBe("blue-image-url");
  });

  test("should update the URL when storage or color is changed", () => {
    const { result } = renderHook(() =>
      useProductSelection({
        basePrice: 50,
        colorOptions,
        storageOptions,
      })
    );

    const replaceStateSpy = jest.spyOn(window.history, "replaceState");

    act(() => {
      result.current.handleStorageChange("64GB");
      result.current.handleColorChange("blue");
    });

    expect(replaceStateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining("storage=64GB&color=blue"),
      }),
      "",
      expect.stringContaining("storage=64GB&color=blue")
    );
  });
});
