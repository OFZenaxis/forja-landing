"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FireIcon,
  MedalIcon,
  BarbellIcon,
  LightningIcon,
  CrownIcon,
  HeartIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StatusBar, TabBar } from "./parts";

const BADGES = [
  { icon: FireIcon, label: "90 dias", on: true, c: "from-sun to-coral" },
  { icon: BarbellIcon, label: "Recorde", on: true, c: "from-brand-500 to-brand-700" },
  { icon: CrownIcon, label: "Liga Ouro", on: true, c: "from-sun to-[#F59E0B]" },
  { icon: LightningIcon, label: "1.000 XP", on: true, c: "from-brand-400 to-brand-600" },
  { icon: HeartIcon, label: "Cardio 50", on: false, c: "from-coral to-[#F43F5E]" },
  { icon: MedalIcon, label: "Top 3", on: false, c: "from-brand-300 to-brand-500" },
];

export function ScreenAchievements() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".medal-wobble",
        { rotation: -6 },
        {
          rotation: 6,
          duration: 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          transformOrigin: "center",
        }
      );
      gsap.from(".badge", {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.06,
        ease: "back.out(1.7)",
        transformOrigin: "center",
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

      <div className="flex items-center justify-between px-5 pt-4">
        <div>
          <h3 className="text-base font-bold text-ink">Conquistas</h3>
          <p className="text-[11px] text-muted">14 de 24 desbloqueadas</p>
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft">
          <ShareNetworkIcon size={15} weight="bold" />
        </button>
      </div>

      {/* Medalha em destaque */}
      <div className="mx-5 mt-3 flex items-center gap-3 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 p-4 text-white shadow-soft">
        <div className="medal-wobble flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
          <FireIcon size={30} weight="fill" className="text-sun" />
        </div>
        <div>
          <p className="text-sm font-bold">90 dias de streak</p>
          <p className="text-[11px] text-white/75">
            Desbloqueada hoje · compartilhe!
          </p>
        </div>
      </div>

      {/* Grade de medalhas */}
      <div className="mt-4 grid flex-1 grid-cols-3 gap-3 px-5">
        {BADGES.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="badge flex flex-col items-center gap-1.5">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  b.on
                    ? `bg-gradient-to-br ${b.c} shadow-soft`
                    : "border border-dashed border-brand-200 bg-white/50"
                }`}
              >
                <Icon
                  size={24}
                  weight="fill"
                  className={b.on ? "text-white" : "text-brand-200"}
                />
              </div>
              <span
                className={`text-[9px] font-semibold ${
                  b.on ? "text-ink" : "text-muted/50"
                }`}
              >
                {b.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="h-16" />
      <TabBar active={3} />
    </div>
  );
}
