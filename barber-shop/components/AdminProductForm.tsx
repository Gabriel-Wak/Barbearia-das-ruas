"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  featured: boolean;
  categoryId: string;
};

export default function AdminProductForm({
  categories,
  initialData,
  productId,
}: {
  categories: Category[];
  initialData?: ProductFormData;
  productId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      image: formData.get("image") as string,
      stock: Number(formData.get("stock")),
      featured: formData.get("featured") === "on",
      categoryId: formData.get("categoryId") as string,
    };

    try {
      const response = await fetch(
        productId ? `/api/admin/products/${productId}` : "/api/admin/products",
        {
          method: productId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Falha ao salvar");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Falha ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-stone-800 bg-stone-900 p-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-300">
          Nome do Produto
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={initialData?.name}
          className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-stone-300">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={initialData?.description}
          className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-stone-300">
            Preço (R$)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={initialData?.price}
            className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-stone-300">
            Estoque
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={initialData?.stock}
            className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-stone-300">
          URL da Imagem
        </label>
        <input
          id="image"
          name="image"
          type="url"
          required
          defaultValue={initialData?.image}
          className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
        />
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-stone-300">
          Categoria
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          defaultValue={initialData?.categoryId}
          className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-3 text-sm text-stone-300">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={initialData?.featured}
          className="h-4 w-4 rounded border-stone-700 bg-stone-950"
        />
        Produto em destaque
      </label>

      {error && (
        <p className="rounded-lg bg-red-950/50 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 disabled:opacity-50"
      >
        {loading ? "Salvando..." : productId ? "Atualizar Produto" : "Criar Produto"}
      </button>
    </form>
  );
}
