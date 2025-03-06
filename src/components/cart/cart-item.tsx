"use client";

import Image from "next/image";

import { useCart } from "@/hooks/cart/use-cart";
import type { CartItem } from "@/types/app";

import { Body } from "../common/typography/body";
import { Button } from "../ui/button";

export function CartItem({
  id,
  imageUrl,
  storage,
  name,
  color,
  price,
}: CartItem) {
  const { removeItem } = useCart();
  return (
    <article className="flex gap-10" key={id}>
      <div className="relative w-[160px] h-[198px] md:w-[262px] md:h-[324px]">
        <Image
          src={imageUrl}
          alt="Galaxy S24 Ultra"
          className="object-contain"
          sizes="(max-width: 768px) 50vw, 20vw"
          priority
          fill
        />
      </div>
      <Body as="div" className="flex flex-col items-start py-10">
        <h2 className="uppercase">{name}</h2>
        <p className="uppercase">
          {storage} | {color}
        </p>
        <p className="uppercase mt-5">{price} EUR</p>
        <footer className="flex flex-1">
          <Button
            variant="link"
            className="p-0 text-destructive self-end"
            onClick={() => removeItem(id)}
          >
            Remove
          </Button>
        </footer>
      </Body>
    </article>
  );
}
