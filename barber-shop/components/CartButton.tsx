"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { itemCount, toggleCart } = useCart();

  return (
    <motion.button
      type="button"
      onClick={toggleCart}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-yellow-400 hover:bg-yellow-400/10"
      aria-label="Abrir carrinho"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.25 10.5V6a2.25 2.25 0 114.5 0v4.5m-4.5 0h4.5"
        />
      </svg>
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 font-display text-[10px] font-black text-white"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </motion.span>
      )}
    </motion.button>
  );
}
