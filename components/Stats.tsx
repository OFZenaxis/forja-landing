"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const fmt = (n: number, decimals: number) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

export function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".stat-item");

      items.forEach((el) => {
        const numEl = el.querySelector<HTMLElement>(".stat-num")!;
        const target = Number(numEl.dataset.value);
        const decimals = Number(numEl.dataset.decimals || 0);
        const suffix = numEl.dataset.suffix || "";
        const prefix = numEl.dataset.prefix || "";

        if (reduce) {
          numEl.textContent = prefix + fmt(target, decimals) + suffix;
          return;
        }

        const counter = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { filter: "blur(14px)", opacity: 0, y: 22 },
              {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
              }
            );
            gsap.to(counter, {
              v: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                numEl.textContent = prefix + fmt(counter.v, decimals) + suffix;
              },
            });
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="Números do Forja" className="container-px py-16">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 rounded-5xl border border-white bg-white/70 p-8 shadow-soft backdrop-blur sm:p-12 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="stat-item text-center lg:border-r lg:border-brand-100 lg:last:border-r-0"
          >
            <p className="text-5xl font-extrabold leading-none tracking-tight text-gradient sm:text-6xl">
              <span
                className="stat-num tabular-nums"
                data-value={s.value}
                data-decimals={s.decimals ?? 0}
                data-suffix={s.suffix ?? ""}
                data-prefix={s.prefix ?? ""}
              >
                {s.prefix ?? ""}
                {fmt(s.value, s.decimals ?? 0)}
                {s.suffix ?? ""}
              </span>
            </p>
            <p className="mx-auto mt-3 max-w-[15ch] text-sm font-medium text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
