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

  const [price, setPrice] = useState(basePrice);
  const [storage, setStorage] = useState(
    searchParams.get("storage") || undefined
  );
  const [color, setColor] = useState(searchParams.get("color") || undefined);
  const [preview, setPreview] = useState(() => {
    const selectedColor = colorOptions.find(
      (option) => option.hexCode === color
    );

    if (!selectedColor) return colorOptions.at(0)?.imageUrl || "";

    return selectedColor.imageUrl;
  });

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

  const handleStorageChange = (value: string) => {
    setStorage(value);

    const storageOption = storageOptions.find(
      (option) => option.capacity === value
    );

    if (!storageOption) return;

    setPrice(storageOption.price);
  };

  const handleColorChange = (value: string) => {
    setColor(value);

    const colorOption = colorOptions.find((option) => option.hexCode === value);

    if (!colorOption) return;

    setPreview(colorOption.imageUrl);
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
