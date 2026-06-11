"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(ScrollTrigger);

type Plan = {
  name: string;
  monthly: number | null; // null = grátis
  annual: number | null; // valor por mês no plano anual
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Aluno",
    monthly: null,
    annual: null,
    tagline: "Para quem treina com um personal parceiro do Forja.",
    features: [
      "Acesso por convite do seu personal",
      "Tarefas diárias e streak",
      "Radar de evolução do shape",
      "Conquistas e ranking entre alunos",
    ],
    cta: "Receber convite",
  },
  {
    name: "Personal",
    monthly: 97,
    annual: 78,
    tagline: "Para personais que querem reter e engajar a clientela.",
    features: [
      "Até 20 alunos ativos",
      "Montagem de treinos e tarefas",
      "Painel de acompanhamento por aluno",
      "Ligas e temporadas",
      "Suporte prioritário",
    ],
    cta: "Começar agora",
    highlight: true,
  },
  {
    name: "Studio",
    monthly: 197,
    annual: 158,
    tagline: "Para estúdios e equipes com vários professores.",
    features: [
      "Alunos ilimitados",
      "White label com a sua marca",
      "Vários personais na mesma equipe",
      "Relatórios do estúdio",
      "Gerente de conta dedicado",
    ],
    cta: "Falar com vendas",
  },
];

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function Price({ plan, annual }: { plan: Plan; annual: boolean }) {
  if (plan.monthly === null) {
    return <span className="text-5xl font-extrabold text-fg">Grátis</span>;
  }
  const value = annual ? plan.annual! : plan.monthly;
  return (
    <span
      key={annual ? "a" : "m"}
      className="inline-flex animate-pop items-baseline gap-1"
    >
      <span className="text-2xl font-bold text-fg-muted">R$</span>
      <span className="text-5xl font-extrabold text-fg">{formatBRL(value)}</span>
      <span className="text-sm font-medium text-fg-muted">/mês</span>
    </span>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".price-card", {
        opacity: 0,
        y: 36,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".price-grid", start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="precos" className="container-px py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          Planos para cada fase
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-fg-muted">
          Comece de graça como aluno ou leve o Forja para a sua consultoria.
          Sem fidelidade, cancele quando quiser.
        </p>

        {/* Toggle Mensal/Anual */}
        <div className="mt-8 inline-flex">
          <div className="relative flex rounded-full border border-line bg-surface p-1 shadow-soft">
            <span
              aria-hidden
              className={`absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-brand-600 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                annual ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                annual ? "text-fg-muted" : "text-white"
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`relative z-10 inline-flex items-center gap-1.5 rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                annual ? "text-white" : "text-fg-muted"
              }`}
            >
              Anual
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  annual ? "bg-white/20 text-white" : "bg-accent-soft text-accent"
                }`}
              >
                -20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="price-grid mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
        {PLANS.map((plan) =>
          plan.highlight ? (
            <div
              key={plan.name}
              className="price-card rounded-[2.1rem] bg-gradient-to-b from-brand-500 to-coral p-[2px] shadow-lift transition-transform duration-300 hover:-translate-y-2 motion-reduce:transform-none lg:-mt-4"
            >
              <PlanInner plan={plan} annual={annual} highlight />
            </div>
          ) : (
            <div
              key={plan.name}
              className="price-card rounded-[2.1rem] border border-line bg-surface shadow-soft transition-transform duration-300 hover:-translate-y-2 motion-reduce:transform-none"
            >
              <PlanInner plan={plan} annual={annual} />
            </div>
          )
        )}
      </div>
    </section>
  );
}

function PlanInner({
  plan,
  annual,
  highlight = false,
}: {
  plan: Plan;
  annual: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[2rem] p-7 ${
        highlight ? "bg-surface" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-fg">{plan.name}</h3>
        {highlight && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-600 to-coral px-3 py-1 text-[11px] font-bold text-white">
            <StarIcon size={12} weight="fill" />
            Mais popular
          </span>
        )}
      </div>

      <p className="mt-2 min-h-[40px] text-sm text-fg-muted">{plan.tagline}</p>

      <div className="mt-5 min-h-[52px]">
        <Price plan={plan} annual={annual} />
      </div>
      <p className="mt-1 h-4 text-xs text-fg-muted">
        {plan.monthly !== null && annual ? "cobrado anualmente" : ""}
      </p>

      <a
        href="#download"
        className={`mt-6 w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transform-none ${
          highlight
            ? "bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-lift"
            : "border border-line bg-surface2 text-accent hover:border-accent"
        }`}
      >
        {plan.cta}
      </a>

      <ul className="mt-7 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-fg">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <CheckIcon size={12} weight="bold" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
