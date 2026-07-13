"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { ProductWithCategory } from "@/types";

export default function AddToCartButton({
  product,
}: {
  product: ProductWithCategory;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (product.stock <= 0) {
    return (
      <button
        disabled
        className="w-full rounded-none bg-stone-800 py-4 font-display text-sm font-black uppercase text-stone-600"
      >
        Sem Estoque
      </button>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="font-display text-sm font-bold uppercase text-stone-400">
          Qtd
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-10 w-10 border border-white/10 text-lg text-white hover:border-yellow-400"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={(event) =>
              setQuantity(
                Math.min(
                  Math.max(Number(event.target.value) || 1, 1),
                  product.stock
                )
              )
            }
            className="w-16 border border-white/10 bg-black py-2 text-center text-white"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="h-10 w-10 border border-white/10 text-lg text-white hover:border-yellow-400"
          >
            +
          </button>
        </div>
        <span className="text-xs text-stone-600">{product.stock} disponíveis</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            addItem(
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                stock: product.stock,
              },
              quantity
            );
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className={`btn-street flex-1 py-4 font-display text-sm font-black uppercase tracking-wider transition ${
            added
              ? "bg-green-500 text-black"
              : "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black"
          }`}
        >
          {added ? "✓ No Carrinho!" : "Adicionar ao Carrinho"}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            addItem(
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                stock: product.stock,
              },
              quantity
            );
            router.push("/checkout");
          }}
          className="btn-street flex-1 border-2 border-yellow-400 py-4 font-display text-sm font-black uppercase tracking-wider text-yellow-400 hover:bg-yellow-400 hover:text-black"
        >
          Comprar Agora
        </motion.button>
      </div>
    </div>
  );
}
