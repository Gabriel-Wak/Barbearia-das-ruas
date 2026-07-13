import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    include: { category: true },
    take: 4,
  });

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/5 bg-black py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-yellow-400">Início</Link>
            <span>/</span>
            <Link href="/buscar" className="hover:text-yellow-400">Produtos</Link>
            <span>/</span>
            <Link
              href={`/buscar?category=${product.category.slug}`}
              className="hover:text-yellow-400"
            >
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-stone-300">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {product.featured && (
                <div className="font-display absolute -left-3 top-6 -rotate-3 bg-pink-500 px-4 py-2 text-xs font-black uppercase text-white shadow-lg">
                  Destaque da Rua
                </div>
              )}

              <div className="font-display absolute -bottom-4 -right-4 hidden text-[8rem] font-black leading-none text-white/[0.03] lg:block">
                BDR
              </div>
            </div>
          </div>

          <div>
            <Link
              href={`/buscar?category=${product.category.slug}`}
              className="font-tag text-sm text-cyan-400 hover:text-cyan-300"
            >
              {product.category.name}
            </Link>

            <h1 className="font-display mt-3 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              {product.name}
            </h1>

            <p className="font-display mt-6 text-4xl font-black text-yellow-400">
              {formatPrice(product.price)}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                  product.stock > 0
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} em estoque`
                  : "Esgotado"}
              </span>
            </div>

            <p className="mt-8 leading-relaxed text-stone-400">
              {product.description}
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: "🚚", label: "Entrega rápida" },
                { icon: "✂", label: "Qualidade pro" },
                { icon: "🔒", label: "Compra segura" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/5 p-3 text-center"
                >
                  <span className="text-xl">{item.icon}</span>
                  <p className="mt-1 text-[10px] uppercase text-stone-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-white/5 pt-16">
            <h2 className="font-display text-3xl font-black uppercase text-white">
              Relacionados
            </h2>
            <p className="mt-2 text-stone-500">Mais produtos dessa categoria</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
