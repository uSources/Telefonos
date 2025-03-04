import { Suspense } from "react";

import { Search } from "@/components/search";
import { Skeleton } from "@/components/ui/skeleton";
import { HomePhoneList } from "@/modules/home/home-phone-list";
import { HomeSkeleton } from "@/modules/home/home-skeleton";

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
      <Suspense key={`product-${page}-${search}`} fallback={<HomeSkeleton />}>
        <HomePhoneList page={page} search={search} />
      </Suspense>
    </>
  );
}
