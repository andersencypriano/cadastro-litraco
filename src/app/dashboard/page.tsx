"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import { useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/");
        }
    }, [isPending, session, router]);

    if (isPending)
        return <p className="text-center mt-8 text-white">Loading...</p>;
    if (!session?.user)
        return <p className="text-center mt-8 text-white">Redirecting...</p>;

    const { user } = session;

    return (
        <main className="max-w-[80rem] h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
            <h1 className="text-2xl font-bold">Parabéns, {user.name} sua marchinha foi cadastrada com sucesso!</h1>
            <p className="">Endereço: {user.address}</p>
            <p>Telefone: {user.phone}</p>
            <p>Email: {user.email}</p>
            <div>
                <h2 className="text-xl font-bold mb-2">Marchinha: {user.title}</h2>
                <p>Letra: {user.lyrics}</p>
            </div>
            <button
                onClick={() => router.push("/")}
                className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
            >
                Sair
            </button>
        </main>
    );
}