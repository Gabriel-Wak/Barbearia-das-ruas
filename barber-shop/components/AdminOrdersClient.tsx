"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice, formatOrderStatus } from "@/lib/utils";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
};

type Order = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  user: {
    name: string;
    email: string;
  };
  items: OrderItem[];
};

const statuses = [
  { value: "PENDING", label: "Pendente" },
  { value: "PROCESSING", label: "Processando" },
  { value: "SHIPPED", label: "Enviado" },
  { value: "DELIVERED", label: "Entregue" },
  { value: "CANCELLED", label: "Cancelado" },
];

export default function AdminOrdersClient({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function updateStatus(orderId: string, status: string) {
    setLoadingId(orderId);
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    router.refresh();
    setLoadingId(null);
  }

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <p className="text-stone-400">Nenhum pedido ainda.</p>
      ) : (
        orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-stone-800 bg-stone-900 p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm text-stone-400">Pedido #{order.id.slice(0, 8)}</p>
                <p className="mt-1 text-lg font-semibold text-white">{order.user.name}</p>
                <p className="text-sm text-stone-400">{order.user.email}</p>
                <p className="mt-3 text-amber-400">{formatPrice(order.total)}</p>
                <p className="mt-2 text-sm text-stone-500">
                  {order.address}, {order.city} - {order.state}, CEP {order.zipCode}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={order.status}
                  disabled={loadingId === order.id}
                  onChange={(event) => updateStatus(order.id, event.target.value)}
                  className="rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-white"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ul className="mt-5 space-y-2 border-t border-stone-800 pt-5">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm text-stone-300"
                >
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-stone-500">
              Status atual: {formatOrderStatus(order.status)}
            </p>
          </article>
        ))
      )}
    </div>
  );
}

export function AdminOrdersHeader() {
  return (
    <Link href="/admin" className="text-sm text-amber-400 hover:text-amber-300">
      ← Voltar ao painel
    </Link>
  );
}
