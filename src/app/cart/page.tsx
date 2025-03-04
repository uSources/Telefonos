import { Metadata } from "next";

import { CartFooter } from "@/components/cart/cart-footer";
import { CartHeader } from "@/components/cart/cart-header";
import { CartList } from "@/components/cart/cart-list";

export const metadata: Metadata = {
  title: "MBST | Tu carrito",
};

export default function Cart() {
  return (
    <section className="flex flex-col h-[calc(100vh-5rem)]">
      <CartHeader />
      <CartList />
      <CartFooter />
    </section>
  );
}
