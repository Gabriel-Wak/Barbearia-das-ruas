"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import type { ProductWithCategory } from "@/types";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: ProductWithCategory;
  index?: number;
}) {
  const { addItem } = useCart();
  const ref = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(event: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  function handleQuickBuy(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (product.stock <= 0) return;
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
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="card-3d group"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition hover:border-yellow-400/30 hover:shadow-[0_20px_60px_rgba(250,204,21,0.1)]">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-stone-900">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

            {product.featured && (
              <span className="font-display absolute left-3 top-3 bg-pink-500 px-3 py-1 text-[10px] font-black uppercase text-white">
                Destaque
              </span>
            )}

            {product.stock <= 0 && (
              <span className="font-display absolute right-3 top-3 bg-red-600 px-3 py-1 text-[10px] font-black uppercase text-white">
                Esgotado
              </span>
            )}
          </div>

          <div className="p-5" style={{ transform: "translateZ(20px)" }}>
            <p className="font-tag text-[10px] font-bold uppercase tracking-widest text-cyan-400">
              {product.category.name}
            </p>
            <h3 className="mt-2 font-display text-lg font-black uppercase leading-tight text-white">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs text-stone-500">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-xl font-black text-yellow-400">
                {formatPrice(product.price)}
              </span>
              {product.stock > 0 && (
                <span className="text-[10px] text-stone-600">
                  {product.stock} un.
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="border-t border-white/5 p-4">
          <button
            type="button"
            onClick={handleQuickBuy}
            disabled={product.stock <= 0}
            className={`btn-street w-full py-3 font-display text-xs font-black uppercase tracking-wider transition ${
              product.stock <= 0
                ? "cursor-not-allowed bg-stone-800 text-stone-600"
                : added
                  ? "bg-green-500 text-black"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400"
            }`}
          >
            {product.stock <= 0
              ? "Sem Estoque"
              : added
                ? "✓ Adicionado!"
                : "Comprar Agora"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
