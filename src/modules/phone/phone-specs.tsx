import { labelVariants } from "@/components/ui/label";
import { Specs } from "@/types/app";

interface PhoneSpecsProps {
  specs: Specs;
}

export function PhoneSpecs({ specs }: PhoneSpecsProps) {
  return (
    <section className="flex flex-col gap-10">
      <h2 className={labelVariants({ size: "large" })}>SPECIFICATIONS</h2>
      <ul className="border-t border-b border-primary divide-y divide-primary">
        {specs.map(({ label, value }) => (
          <li key={label} className="py-4 flex flex-row text-xs font-light">
            <h3 className="flex-1/3 uppercase">{label}</h3>
            <p className="flex-2/3">{value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
