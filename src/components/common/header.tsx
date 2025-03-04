/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { CartButton } from "../cart/cart-button";

export function Header() {
  return (
    <header className="px-4 md:px-10 lg:px-content max-h-20 py-7">
      <div className="flex justify-between">
        <Link href="/">
          <img src="/logo.svg" alt="logo" width={74} height={24} />
        </Link>
        <CartButton />
      </div>
    </header>
  );
}
