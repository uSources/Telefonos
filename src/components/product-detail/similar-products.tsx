import Link from "next/link";

import { ProductCard } from "@/components/common/product-card";
import { labelVariants } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Product } from "@/types/api";

interface SimilarProductsProps {
  similarProducts: Product[];
}

export function SimilarProducts({ similarProducts }: SimilarProductsProps) {
  return (
    <section className="flex flex-col gap-10">
      <h2 className={labelVariants({ size: "large" })}>SIMILAR ITEMS</h2>
      <ScrollArea className="whitespace-nowrap">
        <div className="grid grid-flow-col grid-rows-1 pb-10">
          {similarProducts.map(
            ({ basePrice, brand, id, imageUrl, name }, index) => (
              <Link href={`/product/${id}`} key={index}>
                <ProductCard
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
