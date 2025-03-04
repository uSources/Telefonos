/* eslint-disable @next/next/no-img-element */
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { useCart } from "@/hooks/cart/use-cart";

import { buttonVariants } from "../ui/button";

function Component() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className={buttonVariants({
        variant: "ghost",
      })}
    >
      <img src="/bag.svg" alt="bag" width={16} height={16} />
      <span>{count}</span>
    </Link>
  );
}

export const CartButton = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
