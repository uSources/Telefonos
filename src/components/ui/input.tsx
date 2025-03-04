/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  onChange,
  value,
  ...props
}: React.ComponentProps<"input">) {
  const onClear = () => {
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };
  return (
    <div className={cn("flex relative", className)}>
      <input
        type={type}
        data-slot="input"
        className="border-primary placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 border-b bg-transparent pb-2 text-base outline-none"
        value={value}
        onChange={onChange}
        {...props}
      />
      {value && (
        <button
          type="button"
          className="focus-visible:outline absolute top-0 right-0 cursor-pointer"
          aria-label="clear"
          onClick={onClear}
        >
          <span className="sr-only">Clear</span>
          <img src="./close.svg" alt="close" width={20} height={20} />
        </button>
      )}
    </div>
  );
}

export { Input };
