import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Blobs de fundo (CSS) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-8 h-[28rem] w-[28rem] animate-drift1 rounded-full bg-brand-200/50 blur-3xl dark:bg-brand-600/25" />
        <div className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] animate-drift2 rounded-full bg-coral/20 blur-3xl dark:bg-coral/15" />
      </div>

      <div className="animate-fadeUp">
        <Logo />
      </div>

      <h1 className="mt-10 animate-fadeUp bg-gradient-to-r from-brand-600 via-brand-500 to-coral bg-clip-text text-[7rem] font-extrabold leading-none tracking-tighter text-transparent [animation-delay:100ms] sm:text-[12rem]">
        404
      </h1>

      <p className="mt-4 animate-fadeUp text-xl font-bold text-fg [animation-delay:200ms] sm:text-2xl">
        Você perdeu o streak dessa página…
      </p>
      <p className="mt-3 max-w-md animate-fadeUp text-fg-muted [animation-delay:280ms]">
        Ela não existe ou foi movida de lugar. Mas seu progresso continua firme:
        bora voltar pro treino.
      </p>

      <Link
        href="/"
        className="btn-pill mt-8 animate-fadeUp [animation-delay:360ms]"
      >
        Voltar ao treino
      </Link>
    </main>
  );
}
