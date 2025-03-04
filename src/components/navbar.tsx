/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

export function Navbar() {
  return (
    <nav className="py-3">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "link", size: "default" }),
          "uppercase -mx-4"
        )}
      >
        <img src="/back.svg" alt="back" width={5} height={9} />
        Back
      </Link>
    </nav>
  );
}
