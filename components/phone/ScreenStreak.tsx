"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FireIcon, TrophyIcon } from "@phosphor-icons/react/dist/ssr";
import { StatusBar, TabBar } from "./parts";

const WEEK = [
  { d: "S", on: true },
  { d: "T", on: true },
  { d: "Q", on: true },
  { d: "Q", on: true },
  { d: "S", on: true },
  { d: "S", on: false },
  { d: "D", on: false },
];

export function ScreenStreak() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(".flame", {
        scale: 1.06,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
      gsap.from(".level-bar", {
        scaleX: 0,
        duration: 1.1,
        ease: "power3.out",
        transformOrigin: "left",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col bg-gradient-to-b from-[#2A1659] to-brand-700 text-white"
    >
      <StatusBar dark />

      <div className="flex flex-1 flex-col items-center px-5 pt-6 text-center">
        <div className="flame flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sun to-coral shadow-[0_0_40px_rgba(255,176,32,0.45)]">
          <FireIcon size={48} weight="fill" className="text-white" />
        </div>

        <p className="mt-4 text-4xl font-extrabold leading-none">96</p>
        <p className="text-xs font-medium text-white/70">dias seguidos</p>

        {/* Semana */}
        <div className="mt-5 flex gap-2">
          {WEEK.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                  day.on
                    ? "bg-sun text-ink"
                    : "border border-white/25 text-white/40"
                }`}
              >
                {day.on ? "✓" : ""}
              </div>
              <span className="text-[9px] text-white/50">{day.d}</span>
            </div>
          ))}
        </div>

        {/* Nível / liga */}
        <div className="mt-6 w-full rounded-3xl bg-white/10 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
              <TrophyIcon size={15} weight="fill" className="text-sun" />
              Liga Ouro
            </span>
            <span className="text-[11px] font-medium text-white/70">
              Nível 12
            </span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/15">
            <div className="level-bar h-full w-[78%] origin-left rounded-full bg-gradient-to-r from-sun to-coral" />
          </div>
          <p className="mt-2 text-left text-[10px] text-white/60">
            420 XP para o nível 13
          </p>
        </div>
      </div>

      <div className="h-16" />
      <TabBar active={1} />
    </div>
  );
}
