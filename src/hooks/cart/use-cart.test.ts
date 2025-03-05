import { renderHook } from "@testing-library/react";
import { act } from "react";

import type { CartItem } from "@/types/app";

import { CartProvider, useCart } from "./use-cart";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const item: CartItem = {
  id: "1",
  name: "Product 1",
  price: 100,
  storage: "64GB",
  color: "Red",
  imageUrl: "http://example.com/image.jpg",
};

describe("useCart hook", () => {
  it("should initialize with an empty cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("should add an item to the cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(item);
    expect(result.current.count).toBe(1);
    expect(result.current.totalPrice).toBe(100);
  });

  it("should remove an item from the cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(item);
    });

    act(() => {
      result.current.removeItem(item.id);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.count).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("should clear the cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(item);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.count).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("should persist cart state in localStorage", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const localStorageSpy = jest.spyOn(window.localStorage, "setItem");

    act(() => {
      result.current.addItem(item);
    });

    expect(localStorageSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSpy).toHaveBeenCalledWith(
      "cart",
      JSON.stringify({ items: [item] })
    );
  });

  it("should initialize cart from localStorage", () => {
    window.localStorage.setItem("cart", JSON.stringify({ items: [item] }));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(item);
    expect(result.current.count).toBe(1);
    expect(result.current.totalPrice).toBe(100);
  });
});
