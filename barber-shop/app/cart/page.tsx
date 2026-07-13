"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="font-display text-[10rem] font-black leading-none text-white/5">
            BDR
          </p>
          <h1 className="font-display -mt-8 text-4xl font-black uppercase text-white">
            Carrinho Vazio
          </h1>
          <p className="mt-4 text-stone-500">
            Bora equipar a barbearia? Busca os produtos e monta teu kit.
          </p>
          <Link
            href="/buscar"
            className="btn-street font-display mt-8 inline-block bg-yellow-400 px-10 py-4 text-sm font-black uppercase text-black"
          >
            Buscar Produtos
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl font-black uppercase text-white">
        Carrinho
      </h1>
      <p className="mt-2 text-stone-500">
        {items.length} {items.length === 1 ? "item" : "itens"} no carrinho
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#141414] p-5 sm:flex-row sm:items-center"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-stone-900">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-display text-lg font-black uppercase text-white hover:text-yellow-400"
                >
                  {item.name}
                </Link>
                <p className="mt-1 font-display text-xl font-black text-yellow-400">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="h-9 w-9 border border-white/10 text-white hover:border-yellow-400"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="h-9 w-9 border border-white/10 text-white hover:border-yellow-400"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remover
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-yellow-400/20 bg-[#141414] p-6">
          <h2 className="font-display text-xl font-black uppercase text-white">
            Resumo
          </h2>
          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm text-stone-400"
              >
                <span className="truncate pr-4">
                  {item.name} x{item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
            <span className="font-display text-lg uppercase text-stone-400">
              Total
            </span>
            <span className="font-display text-3xl font-black text-yellow-400">
              {formatPrice(subtotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="btn-street font-display mt-6 block w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 py-4 text-center text-sm font-black uppercase text-black"
          >
            Finalizar Compra
          </Link>
          <Link
            href="/buscar"
            className="mt-4 block text-center text-xs text-stone-500 hover:text-white"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
