"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    items,
    subtotal,
    itemCount,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-yellow-500/20 bg-[#0d0d0d] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="font-display text-xl font-black uppercase text-white">
                  Carrinho
                </h2>
                <p className="text-xs text-stone-500">
                  {itemCount} {itemCount === 1 ? "item" : "itens"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-stone-400 transition hover:border-pink-500 hover:text-pink-400"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-street">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="font-display text-6xl font-black text-white/5">
                    BDR
                  </div>
                  <p className="mt-4 text-stone-400">Carrinho vazio, parceiro.</p>
                  <Link
                    href="/buscar"
                    onClick={closeCart}
                    className="btn-street mt-6 bg-yellow-400 px-6 py-3 font-display text-xs font-black uppercase text-black"
                  >
                    Buscar Produtos
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.productId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 rounded-xl border border-white/5 bg-white/5 p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-800">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-white hover:text-yellow-400"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm font-bold text-yellow-400">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="h-7 w-7 rounded border border-white/10 text-sm text-white hover:border-yellow-400"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="h-7 w-7 rounded border border-white/10 text-sm text-white hover:border-yellow-400"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Subtotal</span>
                  <span className="font-display text-2xl font-black text-yellow-400">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-street mt-4 block w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 py-4 text-center font-display text-sm font-black uppercase text-black"
                >
                  Finalizar Compra
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-3 block text-center text-xs text-stone-500 hover:text-white"
                >
                  Ver carrinho completo
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
