"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/");
        }
    }, [isPending, session, router]);

    if (isPending)
        return <p className="text-center mt-8 text-white">Carregando...</p>;
    if (!session?.user)
        return <p className="text-center mt-8 text-white">Redirecionando...</p>;

    const { user } = session;
    const count = 200;
    const defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts?: confetti.Options) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
    return (
        <main className="max-w-[80rem] h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
            <h1 className="text-2xl">Parabéns <b>{user.name}</b>, sua marchinha foi cadastrada com sucesso!</h1>
            {/* <p className="">Endereço: {user.address}</p>
            <p>Telefone: {user.phone}</p>
            <p>Email: {user.email}</p> */}
            {/* <div>
                <h2 className="text-xl font-bold mb-2">Marchinha: {user.title}</h2>
                <p>Letra: {user.lyrics}</p>
            </div> */}
            <button
                onClick={() => router.push("/")}
                className="w-1/3 bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
            >
                Sair
            </button>
        </main>
    );
}