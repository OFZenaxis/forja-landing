"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon, QuotesIcon } from "@phosphor-icons/react/dist/ssr";
import { TESTIMONIALS, type Testimonial } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function Card({ t, dim = false }: { t: Testimonial; dim?: boolean }) {
  const initial = t.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <figure
      className={`flex w-[300px] shrink-0 flex-col rounded-4xl border border-line bg-surface p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:w-[340px] ${
        dim ? "opacity-90" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={16} weight="fill" className="text-sun" />
          ))}
        </div>
        <QuotesIcon size={24} weight="fill" className="text-accent-soft" />
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg">
        “{t.quote}”
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-coral text-sm font-bold text-white">
          {initial}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-fg">{t.name}</p>
          <p className="text-xs text-fg-muted">
            {t.role} · {t.location}
          </p>
          <p className="text-[11px] text-fg-muted/70">{t.date}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  direction,
  rowRef,
  dim,
}: {
  items: Testimonial[];
  direction: 1 | -1;
  rowRef: React.RefObject<HTMLDivElement>;
  dim?: boolean;
}) {
  // duplica para o loop ser contínuo
  const loop = [...items, ...items];
  return (
    <div className="flex w-max gap-5 px-2" ref={rowRef}>
      {loop.map((t, i) => (
        <Card key={`${t.name}-${i}`} t={t} dim={dim} />
      ))}
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);

  const top = TESTIMONIALS.slice(0, 4);
  const bottom = TESTIMONIALS.slice(4);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const ctx = gsap.context(() => {
      // Loop base de cada fileira (direções opostas)
      const tl1 = gsap.to(row1.current, {
        xPercent: -50,
        duration: 42,
        ease: "none",
        repeat: -1,
      });
      gsap.set(row2.current, { xPercent: -50 });
      const tl2 = gsap.to(row2.current, {
        xPercent: 0,
        duration: 42,
        ease: "none",
        repeat: -1,
      });

      // Velocidade reativa ao scroll: acelera no movimento e desacelera de volta
      const speed = { v: 1 };
      const apply = () => {
        tl1.timeScale(speed.v);
        tl2.timeScale(speed.v);
      };
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 180, 6);
          speed.v = 1 + boost;
          apply();
          gsap.to(speed, {
            v: 1,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true,
            onUpdate: apply,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="overflow-hidden py-20 sm:py-28"
    >
      <div className="container-px mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          Quem treina com o Forja não volta atrás
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-fg-muted">
          Histórias reais de alunos e personais que fizeram da constância um
          hábito.
        </p>
      </div>

      <div className="marquee-mask mt-14 flex flex-col gap-5">
        <Row items={top} direction={-1} rowRef={row1} />
        <Row items={bottom} direction={1} rowRef={row2} dim />
      </div>
    </section>
  );
}
