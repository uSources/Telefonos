import { labelVariants } from "@/components/ui/label";
import { Specs } from "@/types/app";

import { Body } from "../common/typography/body";

interface ProductSpecsProps {
  specs: Specs;
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <section className="flex flex-col gap-10">
      <h2 className={labelVariants({ size: "large" })}>SPECIFICATIONS</h2>
      <ul className="border-t border-b border-primary divide-y divide-primary">
        {specs.map(({ label, value }) => (
          <Body as="li" key={label} className="py-4 flex flex-row">
            <h3 className="flex-1/3 uppercase">{label}</h3>
            <p className="flex-2/3">{value}</p>
          </Body>
        ))}
      </ul>
    </section>
  );
}
