"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  BarbellIcon,
  TrendUpIcon,
  SealCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StatusBar, TabBar } from "./parts";

const SETS = [
  { set: "1", reps: 12, kg: 60 },
  { set: "2", reps: 10, kg: 65 },
  { set: "3", reps: 8, kg: 70 },
  { set: "4", reps: 8, kg: 72 },
];

// histórico simples (altura relativa das barras)
const HISTORY = [40, 48, 46, 55, 62, 70, 78];

export function ScreenLoads() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".set-row", {
        opacity: 0,
        x: 10,
        duration: 0.4,
        stagger: 0.07,
        delay: 0.1,
        ease: "power2.out",
      });
      gsap.from(".hist-bar", {
        scaleY: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power1.out",
        transformOrigin: "bottom",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col bg-gradient-to-b from-cream to-brand-50"
    >
      <StatusBar />

      <div className="flex items-center gap-2 px-5 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100">
          <BarbellIcon size={18} weight="fill" className="text-brand-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold leading-tight text-ink">
            Agachamento livre
          </h3>
          <p className="text-[10px] text-muted">Quadríceps · Hoje</p>
        </div>
      </div>

      {/* Recorde */}
      <div className="mx-5 mt-3 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-2.5 text-white">
        <SealCheckIcon size={20} weight="fill" className="text-sun" />
        <p className="text-[11px] font-semibold">
          Novo recorde: 72 kg
          <span className="ml-1 font-normal text-white/75">(+2 kg)</span>
        </p>
      </div>

      {/* Séries */}
      <div className="mx-5 mt-3 overflow-hidden rounded-2xl bg-white shadow-soft">
        <div className="grid grid-cols-3 bg-brand-50 px-4 py-2 text-[9px] font-semibold uppercase tracking-wide text-muted">
          <span>Série</span>
          <span className="text-center">Reps</span>
          <span className="text-right">Carga</span>
        </div>
        {SETS.map((s) => (
          <div
            key={s.set}
            className="set-row grid grid-cols-3 items-center border-t border-brand-50 px-4 py-2 text-[11px] font-medium text-ink"
          >
            <span className="text-muted">{s.set}ª</span>
            <span className="text-center">{s.reps}</span>
            <span className="text-right font-bold">{s.kg} kg</span>
          </div>
        ))}
      </div>

      {/* Progressão */}
      <div className="mx-5 mt-3 rounded-2xl bg-white p-3 shadow-soft">
        <p className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-ink">
          <TrendUpIcon size={13} weight="bold" className="text-brand-600" />
          Progressão de carga
        </p>
        <div className="flex h-12 items-end justify-between gap-1.5">
          {HISTORY.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              className="hist-bar w-full rounded-t bg-gradient-to-t from-brand-300 to-brand-600"
            />
          ))}
        </div>
      </div>

      <div className="h-16" />
      <TabBar active={1} />
    </div>
  );
}
