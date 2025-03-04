import { cva } from "class-variance-authority";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const labelVariants = cva("uppercase font-light", {
  variants: {
    size: {
      default: "text-sm",
      large: "text-xl",
      extra: "text-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function Label({
  className,
  children,
  ...rest
}: ComponentProps<"label">) {
  return (
    <label className={cn(labelVariants(), className)} {...rest}>
      {children}
    </label>
  );
}
