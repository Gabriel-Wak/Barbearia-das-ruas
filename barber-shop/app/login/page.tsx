"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao entrar");
      }

      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Falha ao entrar"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-300">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue="cliente@exemplo.com"
          className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-900 px-4 py-3 text-white"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-stone-300">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          defaultValue="admin123"
          className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-900 px-4 py-3 text-white"
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
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Entrar</h1>
      <p className="mt-2 text-stone-400">Acesse sua conta e histórico de pedidos.</p>

      <Suspense>
        <LoginForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-stone-400">
        Não tem conta?{" "}
        <Link href="/register" className="font-medium text-amber-400 hover:text-amber-300">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
