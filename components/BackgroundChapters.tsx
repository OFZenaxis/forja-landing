"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Capítulos de cor: muda suavemente o background do body conforme as seções
 * entram na viewport. Tons sutis dentro da paleta (cream / lilás claro).
 * Não renderiza nada. Conduzido por ScrollTrigger.
 */
const CREAM = "#FBFAFF";
const LILAC = "#F5F3FF"; // brand-50

const MAP: Array<{ id: string; color: string }> = [
  { id: "topo", color: CREAM },
  { id: "recursos", color: LILAC },
  { id: "depoimentos", color: CREAM },
  { id: "download", color: LILAC },
  { id: "blog", color: CREAM },
];

export function BackgroundChapters() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const ctx = gsap.context(() => {
      MAP.forEach(({ id, color }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const set = () =>
          gsap.to(document.body, {
            backgroundColor: color,
            duration: 0.6,
            overwrite: "auto",
          });
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: set,
          onEnterBack: set,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
