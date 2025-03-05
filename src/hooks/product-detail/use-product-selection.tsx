import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { ColorOption, StorageOption } from "@/types/api";

interface UseProductSelectionProperties {
  basePrice: number;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
}

export function useProductSelection({
  basePrice,
  colorOptions,
  storageOptions,
}: UseProductSelectionProperties) {
  const searchParams = useSearchParams();

  const [storage, setStorage] = useState(
    searchParams.get("storage") || undefined
  );
  const [color, setColor] = useState(searchParams.get("color") || undefined);
  const [preview, setPreview] = useState(() =>
    getPreviewImage(colorOptions, searchParams.get("color"))
  );
  const [price, setPrice] = useState(() =>
    getPrice(basePrice, storageOptions, searchParams.get("storage"))
  );

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();

    if (storage) params.set("storage", storage);

    if (color) params.set("color", color);

    const newUrl = `?${params.toString()}`;

    /** Prevent re-rendering https://github.com/vercel/next.js/discussions/18072  */
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl
    );
  }, [storage, color]);

  useEffect(() => updateURL(), [storage, color, updateURL]);

  useEffect(() => {
    if (!storage) return;

    const currentPrice = getPrice(basePrice, storageOptions, storage);

    setPrice(currentPrice);
  }, [storage, storageOptions, basePrice]);

  useEffect(() => {
    if (!color) return;

    const previewImage = getPreviewImage(colorOptions, color);

    setPreview(previewImage);
  }, [color, colorOptions]);

  const handleStorageChange = (value: string) => {
    setStorage(value);
  };

  const handleColorChange = (value: string) => {
    setColor(value);
  };

  return {
    storage,
    color,
    price,
    preview,
    handleStorageChange,
    handleColorChange,
  };
}

function getPrice(
  basePrice: number,
  storageOptions: StorageOption[],
  storage: string | null
): number {
  if (!storage) return basePrice;

  const storageOption = storageOptions.find(
    (option) => option.capacity === storage
  );
  return storageOption?.price || basePrice;
}

function getPreviewImage(
  colorOptions: ColorOption[],
  color: string | null
): string {
  const baseImageUrl = colorOptions[0].imageUrl;

  if (!color) return baseImageUrl;

  const colorOption = colorOptions.find((option) => option.name === color);
  return colorOption?.imageUrl || baseImageUrl;
}
