"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  CheckCircleIcon,
  CircleIcon,
  FireIcon,
  LightningIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StatusBar, TabBar } from "./parts";

const TASKS = [
  { label: "Aquecimento 8 min", xp: 20, done: true },
  { label: "Agachamento 4x10", xp: 40, done: true },
  { label: "Supino inclinado 4x8", xp: 40, done: true },
  { label: "Remada curvada 4x10", xp: 40, done: false },
  { label: "Mobilidade 5 min", xp: 15, done: false },
];

const FULL = 97.4;
const TARGET = 71;
const FINAL_OFFSET = FULL * (1 - TARGET / 100);

export function ScreenChecklist() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".ring-progress", {
        strokeDashoffset: FULL,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".task-row", {
        opacity: 0,
        x: 12,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.15,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col bg-gradient-to-b from-brand-50 to-cream"
    >
      <StatusBar />

      <div className="px-5 pt-4">
        <p className="text-[11px] font-medium text-muted">Bom treino,</p>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Mariana</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-sun/15 px-2.5 py-1 text-[11px] font-semibold text-[#B45309]">
            <FireIcon size={13} weight="fill" className="text-sun" />
            96 dias
          </span>
        </div>
      </div>

      {/* Anel de progresso da meta diária */}
      <div className="mx-5 mt-3 flex items-center gap-3 rounded-3xl bg-white p-3 shadow-soft">
        <div className="relative h-14 w-14">
          <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#EDE9FE"
              strokeWidth="4"
            />
            <circle
              className="ring-progress"
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={FULL}
              strokeDashoffset={FINAL_OFFSET}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-700">
            {TARGET}%
          </span>
        </div>
        <div>
          <p className="text-[11px] font-medium text-muted">Meta do dia</p>
          <p className="flex items-center gap-1 text-sm font-bold text-ink">
            <LightningIcon size={14} weight="fill" className="text-sun" />
            140 / 195 XP
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-3 flex-1 space-y-2 px-5">
        {TASKS.map((t) => (
          <div
            key={t.label}
            className={`task-row flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 ${
              t.done
                ? "border-brand-100 bg-white"
                : "border-dashed border-brand-200 bg-white/60"
            }`}
          >
            {t.done ? (
              <CheckCircleIcon
                size={20}
                weight="fill"
                className="text-brand-600"
              />
            ) : (
              <CircleIcon size={20} className="text-brand-300" />
            )}
            <span
              className={`flex-1 text-[12px] font-medium ${
                t.done ? "text-muted line-through" : "text-ink"
              }`}
            >
              {t.label}
            </span>
            <span className="text-[10px] font-bold text-brand-500">+{t.xp}</span>
          </div>
        ))}
      </div>

      <div className="h-16" />
      <TabBar active={0} />
    </div>
  );
}
