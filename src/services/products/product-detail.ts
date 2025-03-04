import { fetchWith } from "@/lib/fetch";
import { ProductDetail as ProductDetailAPI } from "@/types/api";
import { ProductDetail, Specs } from "@/types/app";

function transformSpecs({
  brand,
  description,
  name,
  specs,
}: ProductDetailAPI): Specs {
  {
    return [
      {
        label: "Brand",
        value: brand,
      },
      {
        label: "Name",
        value: name,
      },
      {
        label: "Description",
        value: description,
      },
      {
        label: "Screen",
        value: specs.screen,
      },
      {
        label: "Resolution",
        value: specs.resolution,
      },
      {
        label: "Processor",
        value: specs.processor,
      },
      {
        label: "Main Camera",
        value: specs.mainCamera,
      },
      {
        label: "Selfie Camera",
        value: specs.selfieCamera,
      },
      {
        label: "Battery",
        value: specs.battery,
      },
      {
        label: "OS",
        value: specs.os,
      },
      {
        label: "Screen Refresh Rate",
        value: specs.screenRefreshRate,
      },
    ];
  }
}

export async function getProductById(id: string): Promise<ProductDetail> {
  const product = await fetchWith<ProductDetailAPI>(`/products/${id}`, {
    next: {
      revalidate: 3600,
      tags: [`products-${id}`],
    },
  });

  return {
    ...product,
    specs: transformSpecs(product),
  };
}
