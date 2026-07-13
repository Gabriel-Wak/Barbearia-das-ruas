"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { ProductWithCategory } from "@/types";

export default function AdminProductTable({
  products,
}: {
  products: ProductWithCategory[];
}) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Excluir este produto?")) return;

    const response = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900">
      <table className="min-w-full divide-y divide-stone-800">
        <thead className="bg-stone-950/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
              Produto
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
              Categoria
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
              Preço
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
              Estoque
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-stone-400">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-800">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-stone-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    {product.featured && (
                      <span className="text-xs text-amber-400">Destaque</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-stone-300">
                {product.category.name}
              </td>
              <td className="px-6 py-4 text-sm text-stone-300">
                {formatPrice(product.price)}
              </td>
              <td className="px-6 py-4 text-sm text-stone-300">{product.stock}</td>
              <td className="px-6 py-4 text-right text-sm">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="font-medium text-amber-400 hover:text-amber-300"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="ml-4 font-medium text-red-400 hover:text-red-300"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
