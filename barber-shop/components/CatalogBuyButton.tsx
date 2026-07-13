"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { ProductWithCategory } from "@/types";

export default function CatalogBuyButton({
  product,
}: {
  product: ProductWithCategory;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (product.stock <= 0) {
    return (
      <button
        disabled
        className="mt-3 w-full rounded border border-stone-700 py-2 text-xs font-medium text-stone-600"
      >
        Sem estoque
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          stock: product.stock,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`mt-3 w-full rounded py-2 text-xs font-semibold transition ${
        added
          ? "bg-green-600 text-white"
          : "bg-white text-black hover:bg-yellow-400"
      }`}
    >
      {added ? "Adicionado" : "Comprar"}
    </button>
  );
}
