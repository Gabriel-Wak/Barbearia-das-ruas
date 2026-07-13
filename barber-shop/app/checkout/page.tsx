"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-bold text-white">Nenhum item para finalizar</h1>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-stone-950"
        >
          Ver Produtos
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: formData.get("address"),
          city: formData.get("city"),
          state: formData.get("state"),
          zipCode: formData.get("zipCode"),
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login?redirect=/checkout");
          return;
        }
        throw new Error(data.error || "Falha ao finalizar pedido");
      }

      clearCart();
      router.push(`/orders?success=${data.id}`);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Falha ao finalizar pedido"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">Finalizar Compra</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-stone-800 bg-stone-900 p-6"
        >
          <h2 className="text-xl font-semibold text-white">Dados de Entrega</h2>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-stone-300">
              Endereço
            </label>
            <input
              id="address"
              name="address"
              required
              placeholder="Rua, número, complemento"
              className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-stone-300">
                Cidade
              </label>
              <input
                id="city"
                name="city"
                required
                className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-stone-300">
                Estado
              </label>
              <input
                id="state"
                name="state"
                required
                placeholder="SP"
                className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-stone-300">
              CEP
            </label>
            <input
              id="zipCode"
              name="zipCode"
              required
              placeholder="00000-000"
              className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-950/50 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 disabled:opacity-50"
          >
            {loading ? "Finalizando Pedido..." : "Confirmar Pedido"}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-lg font-semibold text-white">Resumo do Pedido</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between text-sm text-stone-300"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-stone-800 pt-4 text-lg font-semibold text-white">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
