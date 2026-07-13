import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProductWithCategory } from "@/types";
import CatalogBuyButton from "@/components/CatalogBuyButton";

export default function CatalogProductCard({
  product,
}: {
  product: ProductWithCategory;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-stone-800 bg-stone-900/50 transition hover:border-stone-600">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.featured && (
            <span className="absolute left-2 top-2 rounded bg-yellow-400 px-2 py-0.5 text-[10px] font-bold uppercase text-black">
              Destaque
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-stone-500">
          {product.category.name}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 text-sm font-semibold leading-snug text-white hover:text-yellow-400">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-lg font-bold text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-[11px] text-stone-500">
              {product.stock > 0 ? `${product.stock} un.` : "Esgotado"}
            </span>
          </div>
          <CatalogBuyButton product={product} />
        </div>
      </div>
    </article>
  );
}
