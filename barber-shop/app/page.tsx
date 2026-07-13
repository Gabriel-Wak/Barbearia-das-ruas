import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HeroCarousel from "@/components/HeroCarousel";
import MarqueeStrip from "@/components/MarqueeStrip";
import HomeBanners from "@/components/HomeBanners";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { categoryImages, images } from "@/lib/images";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      take: 3,
    }),
  ]);

  return (
    <div>
      <HeroCarousel />
      <MarqueeStrip />

      <section className="py-8">
        <AnimatedSection className="mx-auto max-w-3xl px-4 sm:px-6">
          <SearchBar large />
        </AnimatedSection>
      </section>

      <section className="py-8">
        <HomeBanners />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-end justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">
                Produtos em Destaque
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Os 8 mais pedidos pelos barbeiros
              </p>
            </div>
            <Link
              href="/buscar?featured=true"
              className="text-sm font-medium text-yellow-400 hover:text-yellow-300"
            >
              Ver todos
            </Link>
          </div>
        </AnimatedSection>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-black/50 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <AnimatedSection>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-stone-800">
              <Image
                src={images.barber}
                alt="Barbearia de comunidade"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Barbearia de comunidade, produto de respeito
            </h2>
            <p className="mt-5 leading-relaxed text-stone-400">
              Nascemos da cultura de rua — grafite, rap, boné na régua e fade
              perfeito. A Barber da Rua entende o barbeiro da esquina porque
              veio da mesma quebrada.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { num: "500+", label: "Barbeiros" },
                { num: "12+", label: "Produtos" },
                { num: "24h", label: "Envio" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-stone-800 p-3 text-center"
                >
                  <p className="font-display text-xl font-black text-yellow-400">
                    {stat.num}
                  </p>
                  <p className="text-[11px] text-stone-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">
            Navegue por Categoria
          </h2>
          <p className="mt-1 text-sm text-stone-500">Principais linhas da loja</p>
        </AnimatedSection>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <AnimatedSection key={category.id} delay={index * 0.1}>
              <Link
                href={`/buscar?category=${category.slug}`}
                className="group relative block h-48 overflow-hidden rounded-lg border border-stone-800"
              >
                <Image
                  src={categoryImages[category.slug] || images.barberShop}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
                    0{index + 1}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-black uppercase text-white group-hover:text-yellow-400">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-stone-400">Ver produtos</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-800 py-16">
        <AnimatedSection className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl font-black uppercase text-white">
            Equipa tua barbearia
          </h2>
          <p className="mt-3 text-stone-400">
            Catálogo completo com entrega rápida e preço justo.
          </p>
          <Link
            href="/buscar"
            className="mt-6 inline-block rounded-md bg-yellow-400 px-10 py-3 text-sm font-bold uppercase text-black transition hover:bg-yellow-300"
          >
            Ver catálogo
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
