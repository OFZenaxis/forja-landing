"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

const useIso =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

const FAQS = [
  {
    q: "Como o aluno entra no Forja?",
    a: "O personal envia um convite pelo painel. O aluno baixa o app, aceita o convite e já encontra o primeiro treino do dia montado esperando por ele.",
  },
  {
    q: "Funciona offline?",
    a: "Sim. Você registra treinos, cargas e tarefas sem internet; assim que o celular reconecta, tudo sincroniza automaticamente com o seu personal.",
  },
  {
    q: "Preciso trocar de personal para usar?",
    a: "Não. Se o seu personal ainda não usa o Forja, você pode treinar no modo solo com tarefas e streak, e convidá-lo quando quiser.",
  },
  {
    q: "Como funciona o streak?",
    a: "Cada dia em que você conclui a meta de treino mantém a chama acesa. Faltou um dia? O streak zera, mas você sobe de liga conforme acumula dias seguidos ao longo da temporada.",
  },
  {
    q: "Como faço para cancelar?",
    a: "Pelo próprio app, em dois toques, sem precisar ligar para ninguém. Não há fidelidade nem multa: o acesso continua até o fim do período já pago.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Seus dados de treino são criptografados e nunca vendidos. Você pode exportar ou apagar tudo quando quiser, de acordo com a LGPD.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const panels = useRef<Array<HTMLDivElement | null>>([]);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);

  const reduce = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Estado inicial: fecha todos menos o aberto, antes do paint
  useIso(() => {
    panels.current.forEach((p, i) => {
      if (!p) return;
      gsap.set(p, { height: i === open ? "auto" : 0, overflow: "hidden" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = (el: HTMLDivElement | null, toOpen: boolean) => {
    if (!el) return;
    if (reduce()) {
      gsap.set(el, { height: toOpen ? "auto" : 0 });
      return;
    }
    gsap.to(el, {
      height: toOpen ? "auto" : 0,
      duration: 0.4,
      ease: toOpen ? "power2.out" : "power2.in",
    });
  };

  const toggle = (i: number) => {
    const isOpen = open === i;
    if (open !== null && open !== i) animate(panels.current[open], false);
    animate(panels.current[i], !isOpen);
    setOpen(isOpen ? null : i);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = FAQS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      triggers.current[next]?.focus();
    }
  };

  return (
    <section id="faq" className="container-px py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          Perguntas frequentes
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-fg-muted">
          O que alunos e personais mais perguntam antes de começar.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl divide-y divide-line overflow-hidden rounded-4xl border border-line bg-surface shadow-soft">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <h3>
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface2"
                >
                  <span className="text-base font-semibold text-fg">{f.q}</span>
                  <CaretDownIcon
                    size={18}
                    weight="bold"
                    aria-hidden
                    className={`shrink-0 text-accent transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                ref={(el) => {
                  panels.current[i] = el;
                }}
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-fg-muted">
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
