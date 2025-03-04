import Image from "next/image";
import { memo } from "react";

import { cn } from "@/lib/utils";

type PhoneCardProperties = {
  imageUrl: string;
  name: string;
  basePrice: number;
  brand: string;
  className?: string;
};

export default memo(function PhoneCard({
  imageUrl,
  name,
  basePrice,
  brand,
  className,
}: PhoneCardProperties) {
  return (
    <article
      className={cn(
        "p-4 flex flex-col gap-6 justify-between border-primary border -mr-px -mb-px",
        className
      )}
    >
      <div className="h-[257px] flex justify-center relative">
        <Image
          className="object-contain"
          src={imageUrl}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
          priority
          fill
        />
      </div>
      <div className="flex text-xs uppercase justify-between gap-2">
        <div className="space-y-1 truncate">
          <p className="text-tiny text-muted">{brand}</p>
          <p className="truncate">{name}</p>
        </div>
        <p className="place-self-end truncate">{basePrice} EUR</p>
      </div>
    </article>
  );
});
