import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminProductForm from "@/components/AdminProductForm";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Params) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/");

  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/admin/products" className="text-sm text-amber-400 hover:text-amber-300">
        ← Voltar aos produtos
      </Link>
      <h1 className="mt-2 text-4xl font-bold text-white">Editar Produto</h1>
      <div className="mt-8">
        <AdminProductForm
          categories={categories}
          productId={product.id}
          initialData={{
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            stock: product.stock,
            featured: product.featured,
            categoryId: product.categoryId,
          }}
        />
      </div>
    </div>
  );
}
