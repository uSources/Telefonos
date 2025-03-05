import { cva } from "class-variance-authority";
import { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

interface BodyProps extends ComponentProps<"p"> {
  as?: ElementType;
  className?: string;
}

export const bodyVariants = cva("font-light", {
  variants: {
    size: {
      tiny: "text-xs",
      small: "text-sm",
      large: "text-xl",
      extra: "text-2xl",
    },
  },
  defaultVariants: {
    size: "tiny",
  },
});

export function Body({
  as: Component = "p",
  className,
  children,
  ...rest
}: BodyProps) {
  return (
    <Component className={cn("text-sm font-light", className)} {...rest}>
      {children}
    </Component>
  );
}
