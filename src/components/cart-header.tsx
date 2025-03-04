"use client";

import dynamic from "next/dynamic";

import { useCart } from "@/context/cart";

import { labelVariants } from "./ui/label";

function Component() {
  const { count } = useCart();
  return (
    <header>
      <h1
        className={labelVariants({
          size: "extra",
          className: "mt-0 md:mt-12",
        })}
      >
        Cart ({count})
      </h1>
    </header>
  );
}

export const CartHeader = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
