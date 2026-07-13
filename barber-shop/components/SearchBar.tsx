"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({
  defaultValue = "",
  large = false,
}: {
  defaultValue?: string;
  large?: boolean;
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
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex items-center ${large ? "gap-3" : ""}`}>
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar máquinas, pomadas, navalhas..."
            className={`w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-white placeholder:text-stone-600 transition focus:border-yellow-400 focus:bg-white/10 ${
              large ? "py-4 text-base" : "py-2.5 text-sm"
            }`}
          />
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className={`shrink-0 rounded-full bg-yellow-400 font-display font-black uppercase text-black transition hover:bg-yellow-300 ${
            large ? "px-8 py-4 text-sm" : "px-5 py-2.5 text-xs"
          }`}
        >
          Buscar
        </motion.button>
      </div>
    </form>
  );
}
