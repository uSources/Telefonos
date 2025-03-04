import { fetchWith } from "@/lib/fetch";
import { Product } from "@/types/api";

export async function getAllProducts({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
}) {
  const searchParams = new URLSearchParams({
    limit: "20",
    offset: (Math.max(0, page - 1) * 20).toString(),
    search,
  });

  return await fetchWith<Product[]>(`/products?${searchParams.toString()}`, {
    next: {
      revalidate: 3600,
      tags: [`products-${searchParams.toString()}`],
    },
  });
}
