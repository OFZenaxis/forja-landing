"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Capítulos de cor: alterna sutilmente o fundo da página conforme as seções
 * entram na viewport. Controla a CSS var `--page` (o body já tem transição de
 * 0.2s em background-color), então funciona em qualquer tema e respeita o
 * crossfade. Reaplica ao trocar de tema (evento `themechange`).
 */
const LIGHT = { base: "251 250 255", alt: "245 243 255" };
const DARK = { base: "18 9 35", alt: "27 16 58" };

// Ordem das seções na página (precos/faq são adicionadas em outros itens;
// getElementById ignora as que ainda não existem).
const SECTIONS = [
  "topo",
  "precos",
  "recursos",
  "depoimentos",
  "faq",
  "download",
  "blog",
];

export function BackgroundChapters() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current = 0;
    const apply = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const pal = isDark ? DARK : LIGHT;
      const tint = current % 2 === 0 ? pal.base : pal.alt;
      document.body.style.setProperty("--page", tint);
    };

    const onThemeChange = () => apply();
    window.addEventListener("themechange", onThemeChange);

    const ctx = gsap.context(() => {
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const set = () => {
          current = i;
          apply();
        };
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: set,
          onEnterBack: set,
        });
      });
    });

    return () => {
      window.removeEventListener("themechange", onThemeChange);
      ctx.revert();
      document.body.style.removeProperty("--page");
    };
  }, []);

  return null;
}
