"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Recursos", href: "#recursos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Blog", href: "#blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Blur ao rolar: classe alternada por ScrollTrigger (sem listener de scroll)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        start: 16,
        end: "max",
        onToggle: (self) => {
          barRef.current?.classList.toggle("is-scrolled", self.isActive);
        },
      });
      // estado inicial caso a página carregue já rolada
      barRef.current?.classList.toggle("is-scrolled", st.isActive);
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <div
        ref={barRef}
        className="transition-[background-color,box-shadow,backdrop-filter] duration-300 [&.is-scrolled]:border-b [&.is-scrolled]:border-line/60 [&.is-scrolled]:bg-page/70 [&.is-scrolled]:shadow-[0_8px_30px_-12px_rgba(124,58,237,0.18)] [&.is-scrolled]:backdrop-blur-xl"
      >
        <nav
          aria-label="Principal"
          className="container-px flex h-16 items-center justify-between gap-4"
        >
          <a href="#topo" aria-label="Forja — início">
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-fg-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href="#download"
              className="btn-pill transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 motion-reduce:transform-none"
            >
              Baixar grátis
            </a>
          </div>

          {/* Ações mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/70 text-fg shadow-soft backdrop-blur transition-transform active:scale-95"
            >
              {open ? (
                <XIcon size={20} weight="bold" />
              ) : (
                <ListIcon size={20} weight="bold" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="container-px animate-menuIn md:hidden">
          <div className="mt-2 rounded-3xl border border-line bg-page/95 p-4 shadow-lift backdrop-blur-xl">
            <ul className="flex flex-col">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-fg transition-colors hover:bg-surface2"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="btn-pill mt-2 w-full"
            >
              Baixar grátis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
