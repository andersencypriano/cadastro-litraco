"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/src/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      address: (formData.get("address") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
      title: (formData.get("title") as string) || undefined,
      lyrics: (formData.get("lyrics") as string) || undefined,
      password: formData.get("password") as string,
    });

    if (res.error) {
      console.error("Sign up error:", res.error);
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Cadastrar marchinha</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nome Completo"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="address"
          type="text"
          placeholder="Endereço"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="phone"
          type="text"
          placeholder="Telefone"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          required
          minLength={8}
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />

        <div>
          <h2 className="text-lg font-bold mb-2">Marchinha</h2>
          <input
            name="title"
            type="text"
            placeholder="Nome da marchinha"
            required
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 mb-4"
          />
          <textarea
            name="lyrics"
            placeholder="Letra"
            required
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}