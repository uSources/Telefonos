import type { RadioGroupProps } from "@radix-ui/react-radio-group";

import { RadioGroupItem, RadioGroup } from "./ui/radio-group";

type ColorRadioGroupProperties = RadioGroupProps & {
  options: ColorOption[];
};

interface ColorOption {
  value: string;
  label: string;
  hex: string;
}

export function ColorRadioGroup({
  options,
  value,
  ...rest
}: ColorRadioGroupProperties) {
  const option = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup className="flex gap-4" value={value} {...rest}>
        {options.map(({ value, hex }) => (
          <div
            key={value}
            style={{ backgroundColor: hex }}
            className="group relative w-5 h-5 outline outline-offset-1 outline-muted-foreground has-data-[state=checked]:outline-primary"
          >
            <RadioGroupItem
              id={`option-${value}`}
              className="sr-only"
              value={value}
            />
            <label
              className="cursor-pointer leading-none after:absolute after:inset-0"
              htmlFor={`option-${value}`}
            />
          </div>
        ))}
      </RadioGroup>
      {option && <p className="block text-xs font-light">{option.label}</p>}
    </div>
  );
}
