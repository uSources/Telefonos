import { Suspense } from "react";

import { Search } from "@/components/common/search";
import { ProductList } from "@/components/products/products-list";
import { ProductSkeleton } from "@/components/products/products-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeProperties {
  searchParams: Promise<{
    page: number;
    q: string;
  }>;
}

export default async function Home({ searchParams }: HomeProperties) {
  const { page = 1, q: search = "" } = await searchParams;

  return (
    <>
      <Suspense fallback={<Skeleton className="h-8 w-full" />}>
        <Search />
      </Suspense>
      <Suspense
        key={`product-${page}-${search}`}
        fallback={<ProductSkeleton />}
      >
        <ProductList page={page} search={search} />
      </Suspense>
    </>
  );
}
