import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminProductTable from "@/components/AdminProductTable";

export default async function AdminProductsPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/admin/products");
  if (session.role !== "ADMIN") redirect("/");

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-amber-400 hover:text-amber-300">
            ← Voltar ao painel
          </Link>
          <h1 className="mt-2 text-4xl font-bold text-white">Gerenciar Produtos</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-stone-950"
        >
          Adicionar Produto
        </Link>
      </div>

      <div className="mt-10">
        <AdminProductTable products={products} />
      </div>
    </div>
  );
}
