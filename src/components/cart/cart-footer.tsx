"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { useCart } from "@/hooks/cart/use-cart";

import { Button, buttonVariants } from "../ui/button";

function Component() {
  const { totalPrice, count } = useCart();
  return (
    <footer>
      {/* Tablet-desktop */}
      <div className="hidden md:flex justify-between items-center mb-10">
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "large",
            className: "w-64",
          })}
          href="/"
        >
          continue shopping
        </Link>
        <div className="flex items-center gap-20 w-full">
          <div className="flex flex-row flex-nowrap gap-6 place-content-end justify-items-end text-sm w-full">
            <p>TOTAL</p>
            <p>{totalPrice} EUR</p>
          </div>
          <Button size="large" className="w-64" disabled={count <= 0}>
            Pay
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden flex-col items-center mb-6">
        <div className="mb-6 flex flex-row flex-nowrap gap-6 text-sm w-full">
          <p>TOTAL</p>
          <p data-testid="cart-price">{totalPrice} EUR</p>
        </div>
        <div className="flex items-center gap-3 w-full">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "large",
              className: "w-full",
            })}
            href="/"
          >
            continue shopping
          </Link>
          <Button size="large" className="w-full" disabled={count <= 0}>
            Pay
          </Button>
        </div>
      </div>
    </footer>
  );
}

export const CartFooter = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
