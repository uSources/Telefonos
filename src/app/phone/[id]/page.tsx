import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { PhoneConfigurator } from "@/modules/phone/phone-configurator";
import { PhoneSpecs } from "@/modules/phone/phone-specs";
import { SimilarPhones } from "@/modules/phone/similar-phones";
import { getAllProducts, getProductById } from "@/services/product";

interface PhoneDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: PhoneDetailsProps) {
  const { id } = await params;
  const phone = await getProductById(id);

  const image = phone.colorOptions.at(0)?.imageUrl;

  return {
    title: `MBST | ${phone.name}`,
    description: phone.description,
    image,
  };
}

export async function generateStaticParams() {
  const phones = await getAllProducts({});

  return phones.map(({ id }) => ({
    id,
  }));
}

export default async function PhoneDetails({ params }: PhoneDetailsProps) {
  const { id } = await params;

  const phone = await getProductById(id);

  return (
    <article className="py-[100px] flex flex-col gap-[154px]">
      <Suspense fallback={<Skeleton className="w-full h-96" />}>
        <PhoneConfigurator phone={phone} />
      </Suspense>
      <PhoneSpecs specs={phone.specs} />
      <SimilarPhones similarProducts={phone.similarProducts} />
    </article>
  );
}
