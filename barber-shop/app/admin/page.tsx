import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatOrderStatus } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login?redirect=/admin");
  }
  if (session.role !== "ADMIN") {
    redirect("/");
  }

  const [productCount, orderCount, revenue, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Painel Administrativo</h1>
          <p className="mt-2 text-stone-400">
            Gerencie produtos, pedidos e estoque.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-stone-950"
          >
            Gerenciar Produtos
          </Link>
          <Link
            href="/admin/orders"
            className="rounded-full border border-stone-600 px-5 py-2 text-sm font-semibold text-white"
          >
            Ver Pedidos
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <p className="text-sm text-stone-400">Total de Produtos</p>
          <p className="mt-2 text-3xl font-bold text-white">{productCount}</p>
        </div>
        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <p className="text-sm text-stone-400">Total de Pedidos</p>
          <p className="mt-2 text-3xl font-bold text-white">{orderCount}</p>
        </div>
        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <p className="text-sm text-stone-400">Receita Total</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            {formatPrice(revenue._sum.total || 0)}
          </p>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-stone-800 bg-stone-900 p-6">
        <h2 className="text-xl font-semibold text-white">Pedidos Recentes</h2>
        <div className="mt-6 space-y-4">
          {recentOrders.length === 0 ? (
            <p className="text-stone-400">Nenhum pedido ainda.</p>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-2 border-b border-stone-800 pb-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-white">{order.user.name}</p>
                  <p className="text-sm text-stone-400">{order.user.email}</p>
                </div>
                <div className="text-sm text-stone-300">
                  <p>{formatPrice(order.total)}</p>
                  <p className="text-amber-400">{formatOrderStatus(order.status)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
