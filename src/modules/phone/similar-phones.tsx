import Link from "next/link";

import PhoneCard from "@/components/phone-card";
import { labelVariants } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Phone } from "@/types/api";

interface SimilarPhonesProps {
  similarProducts: Phone[];
}

export function SimilarPhones({ similarProducts }: SimilarPhonesProps) {
  return (
    <section className="flex flex-col gap-10">
      <h2 className={labelVariants({ size: "large" })}>SIMILAR ITEMS</h2>
      <ScrollArea className="whitespace-nowrap">
        <div className="grid grid-flow-col grid-rows-1 pb-10">
          {similarProducts.map(
            ({ basePrice, brand, id, imageUrl, name }, index) => (
              <Link href={`/phone/${id}`} key={index}>
                <PhoneCard
                  basePrice={basePrice}
                  brand={brand}
                  imageUrl={imageUrl}
                  name={name}
                  className="h-[354px] w-[354px] mb-0"
                />
              </Link>
            )
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
