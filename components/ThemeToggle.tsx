"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Alterna a classe `dark` no <html>, persiste em localStorage e avisa o resto
 * da página (evento `themechange`). O tema inicial já foi aplicado pelo script
 * inline do layout, então aqui só sincronizamos o estado e tratamos o clique.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("forja-theme", next ? "dark" : "light");
    } catch {
      /* localStorage indisponível — segue só na sessão */
    }
    setDark(next);
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        dark === null
          ? "Alternar tema"
          : dark
            ? "Ativar modo claro"
            : "Ativar modo escuro"
      }
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-fg backdrop-blur transition-transform hover:-translate-y-0.5 active:scale-95 motion-reduce:transform-none ${className}`}
    >
      {dark === null ? (
        <span className="h-5 w-5" />
      ) : dark ? (
        <SunIcon size={18} weight="bold" />
      ) : (
        <MoonIcon size={18} weight="bold" />
      )}
    </button>
  );
}
