import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatOrderStatus } from "@/lib/utils";

type SearchParams = Promise<{ success?: string }>;

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login?redirect=/orders");
  }

  const params = await searchParams;

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">Histórico de Pedidos</h1>

      {params.success && (
        <div className="mt-6 rounded-2xl border border-green-800 bg-green-950/30 px-5 py-4 text-green-300">
          Pedido realizado com sucesso. ID do pedido: {params.success}.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-700 p-12 text-center">
          <p className="text-lg font-medium text-white">Nenhum pedido ainda</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-stone-950"
          >
            Começar a Comprar
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-stone-800 bg-stone-900 p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-stone-400">Pedido #{order.id.slice(0, 8)}</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <div className="text-sm text-stone-400">
                  <p>
                    Status:{" "}
                    <span className="text-amber-400">
                      {formatOrderStatus(order.status)}
                    </span>
                  </p>
                  <p>
                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3 border-t border-stone-800 pt-5">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-sm text-stone-300"
                  >
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-stone-500">
                Entrega em {order.address}, {order.city} - {order.state}, CEP{" "}
                {order.zipCode}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
