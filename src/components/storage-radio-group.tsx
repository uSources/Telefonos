import type { RadioGroupProps } from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

import Label from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type StorageRadioGroupProperties = RadioGroupProps & {
  options: StorageOption[];
};

interface StorageOption {
  value: string;
  label: string;
}

export function StorageRadioGroup({
  options,
  ...rest
}: StorageRadioGroupProperties) {
  return (
    <RadioGroup className="flex" {...rest}>
      {options.map(({ value, label }) => (
        <div
          className={cn(
            "relative min-w-24 text-center has-data-[state=checked]:border-primary has-data-[state=checked]:z-1 border border-muted-foreground p-6",
            "nth-of-type-[2n]:-mx-px"
          )}
          key={value}
        >
          <RadioGroupItem
            id={`option-${value}`}
            value={value}
            className="sr-only"
          />
          <Label
            className="cursor-pointer leading-none after:absolute after:inset-0"
            htmlFor={`option-${value}`}
          >
            {label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
