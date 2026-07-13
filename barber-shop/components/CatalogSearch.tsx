"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CatalogSearch({
  defaultValue = "",
}: {
  defaultValue?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/buscar${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nome, categoria ou produto..."
        className="flex-1 rounded-md border border-stone-700 bg-stone-900 px-4 py-2.5 text-sm text-white placeholder:text-stone-600 focus:border-stone-500"
      />
      <button
        type="submit"
        className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-stone-200"
      >
        Buscar
      </button>
    </form>
  );
}
