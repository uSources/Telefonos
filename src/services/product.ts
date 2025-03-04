import { fetchWith } from "@/lib/fetch";
import { Phone, PhoneDetail as PhoneDetailAPI } from "@/types/api";
import { PhoneDetail, Specs } from "@/types/app";

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

  return await fetchWith<Phone[]>(`/products?${searchParams.toString()}`, {
    next: {
      revalidate: 3600,
      tags: [`products-${searchParams.toString()}`],
    },
  });
}

function transformSpecs({
  brand,
  description,
  name,
  specs,
}: PhoneDetailAPI): Specs {
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

export async function getProductById(id: string): Promise<PhoneDetail> {
  const phone = await fetchWith<PhoneDetailAPI>(`/products/${id}`, {
    next: {
      revalidate: 3600,
      tags: [`products-${id}`],
    },
  });

  return {
    ...phone,
    specs: transformSpecs(phone),
  };
}
