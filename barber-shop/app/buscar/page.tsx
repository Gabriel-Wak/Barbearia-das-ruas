import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CatalogProductCard from "@/components/CatalogProductCard";
import CatalogSearch from "@/components/CatalogSearch";

type SearchParams = Promise<{
  q?: string;
  category?: string;
  featured?: string;
}>;

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const isFeatured = params.featured === "true";

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        ...(params.category ? { category: { slug: params.category } } : {}),
        ...(isFeatured ? { featured: true } : {}),
        ...(query
          ? {
              OR: [
                { name: { contains: query } },
                { description: { contains: query } },
              ],
            }
          : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const activeCategory = categories.find((c) => c.slug === params.category);

  const pageTitle = activeCategory
    ? activeCategory.name
    : isFeatured
      ? "Produtos em destaque"
      : query
        ? `Resultados para "${query}"`
        : "Catálogo de produtos";

  return (
    <div className="min-h-screen bg-stone-950">
      <div className="border-b border-stone-800 bg-stone-900/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="mb-4 text-xs text-stone-500">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-300">Produtos</span>
          </nav>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
              <p className="mt-1 text-sm text-stone-500">
                {products.length}{" "}
                {products.length === 1 ? "produto" : "produtos"}
              </p>
            </div>
            <div className="w-full md:max-w-md">
              <CatalogSearch defaultValue={query} />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/buscar"
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                !params.category && !isFeatured
                  ? "border-white bg-white text-black"
                  : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-white"
              }`}
            >
              Todos
            </Link>
            <Link
              href="/buscar?featured=true"
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                isFeatured
                  ? "border-white bg-white text-black"
                  : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-white"
              }`}
            >
              Destaques
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/buscar?category=${category.slug}`}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  params.category === category.slug
                    ? "border-white bg-white text-black"
                    : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-white"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="rounded-lg border border-stone-800 bg-stone-900/30 py-20 text-center">
            <p className="text-lg font-medium text-white">
              Nenhum produto encontrado
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Tente outro termo ou remova os filtros.
            </p>
            <Link
              href="/buscar"
              className="mt-6 inline-block text-sm font-medium text-yellow-400 hover:text-yellow-300"
            >
              Ver catálogo completo
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <CatalogProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
