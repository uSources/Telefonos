"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "./ui/input";

export function Search() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(() => {
    return params.get("q") || "";
  });

  const debounced = useDebouncedCallback((value) => {
    const params = new URLSearchParams({
      q: value,
    });
    router.push(`/?${params.toString()}`);
  }, 500);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
    debounced(e.target.value);
  };

  return (
    <Input
      placeholder="Search for a smartphone..."
      value={search}
      onChange={handleChange}
      className="mt-12"
    />
  );
}
