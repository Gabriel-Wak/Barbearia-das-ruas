import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminOrdersClient, { AdminOrdersHeader } from "@/components/AdminOrdersClient";

export default async function AdminOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/admin/orders");
  if (session.role !== "ADMIN") redirect("/");

  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const serializedOrders = orders.map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <AdminOrdersHeader />
      <h1 className="mt-2 text-4xl font-bold text-white">Gerenciar Pedidos</h1>
      <div className="mt-10">
        <AdminOrdersClient orders={serializedOrders} />
      </div>
    </div>
  );
}
