import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <>
      <Skeleton className="h-4 mt-3 w-24" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 my-12 gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="w-full h-[315px]" key={index} />
        ))}
      </div>
    </>
  );
}
