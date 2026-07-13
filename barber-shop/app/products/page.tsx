import { redirect } from "next/navigation";

type SearchParams = Promise<Record<string, string | undefined>>;

export default async function ProductsRedirect({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.category) query.set("category", params.category);
  if (params.featured) query.set("featured", params.featured);
  if (params.search) query.set("q", params.search);

  const qs = query.toString();
  redirect(`/buscar${qs ? `?${qs}` : ""}`);
}
