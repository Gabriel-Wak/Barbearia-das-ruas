import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminProductForm from "@/components/AdminProductForm";

export default async function NewProductPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/admin/products/new");
  if (session.role !== "ADMIN") redirect("/");

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/admin/products" className="text-sm text-amber-400 hover:text-amber-300">
        ← Voltar aos produtos
      </Link>
      <h1 className="mt-2 text-4xl font-bold text-white">Adicionar Produto</h1>
      <div className="mt-8">
        <AdminProductForm categories={categories} />
      </div>
    </div>
  );
}
