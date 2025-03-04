import { Suspense } from "react";

import { ProductConfigurator } from "@/components/product-detail/product-configurator";
import { ProductSpecs } from "@/components/product-detail/product-specs";
import { SimilarProducts } from "@/components/product-detail/similar-products";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/services/products/all-products";
import { getProductById } from "@/services/products/product-detail";

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: ProductDetailsProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const image = product.colorOptions.at(0)?.imageUrl;

  return {
    title: `MBST | ${product.name}`,
    description: product.description,
    image,
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts({});

  return products.map(({ id }) => ({
    id,
  }));
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <article className="py-[100px] flex flex-col gap-[154px]">
      <Suspense fallback={<Skeleton className="w-full h-96" />}>
        <ProductConfigurator product={product} />
      </Suspense>
      <ProductSpecs specs={product.specs} />
      <SimilarProducts similarProducts={product.similarProducts} />
    </article>
  );
}
