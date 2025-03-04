"use client";

import dynamic from "next/dynamic";

import { useCart } from "@/context/cart";

import { CartItem } from "./cart-item";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

function Component() {
  const { items } = useCart();
  return (
    <div className="flex-1 h-full overflow-hidden my-6 md:my-12">
      <ScrollArea className="flex-1 h-full">
        {items.map(({ id, color, imageUrl, name, price, storage }) => (
          <CartItem
            key={id}
            id={id}
            color={color}
            imageUrl={imageUrl}
            name={name}
            price={price}
            storage={storage}
          />
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}

export const CartList = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
