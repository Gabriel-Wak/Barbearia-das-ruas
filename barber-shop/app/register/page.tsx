"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao criar conta");
      }

      router.push("/");
      router.refresh();
    } catch (registerError) {
      setError(
        registerError instanceof Error
          ? registerError.message
          : "Falha ao criar conta"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-300">
          Nome Completo
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full rounded-lg border border-stone-700 bg-stone-900 px-4 py-3 text-white"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-300">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
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
          minLength={6}
          required
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
        {loading ? "Criando conta..." : "Criar Conta"}
      </button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Criar Conta</h1>
      <p className="mt-2 text-stone-400">Cadastre-se para fazer pedidos e acompanhar entregas.</p>

      <Suspense>
        <RegisterForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-stone-400">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-amber-400 hover:text-amber-300">
          Entrar
        </Link>
      </p>
    </div>
  );
}
