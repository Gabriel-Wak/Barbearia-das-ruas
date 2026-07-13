"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import CartButton from "@/components/CartButton";
import SearchBar from "@/components/SearchBar";
import type { SessionUser } from "@/lib/auth";

export default function HeaderClient({
  session,
}: {
  session: SessionUser | null;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo size="sm" />

          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/buscar"
              className="font-display text-xs font-bold uppercase tracking-wider text-stone-400 transition hover:text-yellow-400"
            >
              Produtos
            </Link>
            <Link
              href="/buscar?featured=true"
              className="font-display text-xs font-bold uppercase tracking-wider text-stone-400 transition hover:text-yellow-400"
            >
              Destaques
            </Link>
            {session?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="font-display text-xs font-bold uppercase tracking-wider text-pink-400 transition hover:text-pink-300"
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden max-w-xs flex-1 md:block lg:max-w-sm">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <CartButton />
            {session ? (
              <>
                <Link
                  href="/orders"
                  className="hidden text-xs font-medium text-stone-400 hover:text-white sm:block"
                >
                  Pedidos
                </Link>
                <form action="/api/auth/logout" method="post">
                  <button
                    type="submit"
                    className="hidden rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-stone-300 transition hover:border-white/30 sm:block"
                  >
                    Sair
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden text-xs font-medium text-stone-400 hover:text-white sm:block"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-yellow-400 px-4 py-2 font-display text-xs font-black uppercase text-black transition hover:bg-yellow-300"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
