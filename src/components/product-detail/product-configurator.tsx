"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { ColorRadioGroup } from "@/components/common/color-radio-group";
import { StorageRadioGroup } from "@/components/common/storage-radio-group";
import { Button } from "@/components/ui/button";
import { labelVariants } from "@/components/ui/label";
import { useCart } from "@/hooks/cart/use-cart";
import { useProductSelection } from "@/hooks/product-detail/use-product-selection";
import { ProductDetail } from "@/types/api";

interface ProductConfiguratorProperties {
  product: Omit<ProductDetail, "specs">;
}

export function ProductConfigurator({
  product: { basePrice, colorOptions, storageOptions, name },
}: ProductConfiguratorProperties) {
  const {
    storage,
    color,
    price,
    preview,
    handleStorageChange,
    handleColorChange,
  } = useProductSelection({ basePrice, colorOptions, storageOptions });

  const router = useRouter();
  const { addItem } = useCart();

  const isDisabled = !storage || !color;

  const onAddToCart = () => {
    if (isDisabled) {
      toast.error("Please select storage and color");
      return;
    }

    addItem({
      id: uuidv4(),
      name,
      price,
      storage,
      color,
      imageUrl: preview,
    });

    toast.success("Item added to cart");

    router.push("/cart");
  };

  return (
    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
      {preview && (
        <div className="relative w-[336px] h-[414px] lg:w-[510px] lg:h-[630px]">
          <Image
            src={preview}
            alt={name}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
            priority
            fill
          />
        </div>
      )}
      <div className="flex flex-col gap-10 w-full md:w-auto">
        <div className="flex flex-col gap-2 font-light">
          <h1 className="uppercase text-2xl">{name}</h1>
          <p className="text-xl">
            {isDisabled && "From "}
            {price} EUR
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className={labelVariants()}>
            Storage ¿how much space you do need?
          </h3>
          <StorageRadioGroup
            value={storage}
            onValueChange={handleStorageChange}
            options={storageOptions.map(({ capacity }) => ({
              label: capacity,
              value: capacity,
            }))}
          />
        </div>
        <div className="flex flex-col gap-6">
          <h3 className={labelVariants()}>Color. pick your favorite.</h3>
          <ColorRadioGroup
            value={color}
            onValueChange={handleColorChange}
            options={colorOptions.map(({ name, hexCode }) => ({
              hex: hexCode,
              value: hexCode,
              label: name,
            }))}
          />
        </div>
        <Button
          disabled={isDisabled}
          className="w-full"
          size="large"
          color="primary"
          onClick={onAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
