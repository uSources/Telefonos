import Link from "next/link";

import PhoneCard from "@/components/phone-card";
import { getAllProducts } from "@/services/product";

type ProductsProperties = {
  page: number;
  search: string;
};

export async function HomePhoneList({ page, search }: ProductsProperties) {
  const phones = await getAllProducts({ page, search });

  if (phones && phones.length <= 0) {
    return (
      <p className="text-center text-base my-12 uppercase">No results found</p>
    );
  }

  return (
    <>
      <p className="uppercase text-xs mt-3">{phones.length} RESULTS</p>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 my-12">
        {phones.map(({ basePrice, brand, imageUrl, id, name }, index) => (
          <Link href={`/phone/${id}`} key={index}>
            <PhoneCard
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
