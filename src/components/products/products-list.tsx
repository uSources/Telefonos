import Link from "next/link";

import { ProductCard } from "@/components/common/product-card";
import { getAllProducts } from "@/services/products/all-products";

type ProductsProperties = {
  page: number;
  search: string;
};

export async function ProductList({ page, search }: ProductsProperties) {
  const products = await getAllProducts({ page, search });

  if (products && products.length <= 0) {
    return (
      <p className="text-center text-base my-12 uppercase">No results found</p>
    );
  }

  return (
    <>
      <p className="uppercase text-xs mt-3">{products.length} RESULTS</p>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 my-12">
        {products.map(({ basePrice, brand, imageUrl, id, name }, index) => (
          <Link href={`/product/${id}`} key={index}>
            <ProductCard
              key={index}
              basePrice={basePrice}
              brand={brand}
              imageUrl={imageUrl}
              name={name}
            />
          </Link>
        ))}
      </section>
    </>
  );
}
