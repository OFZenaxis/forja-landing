"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registra o ScrollTrigger (num client component) e liga o Lenis ao loop
 * do GSAP. Sob prefers-reduced-motion não inicializa o smooth scroll —
 * mantém o scroll nativo. Não renderiza nada visível.
 */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      // Garante que medições do ScrollTrigger fiquem corretas mesmo sem Lenis.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Links âncora rolam suave via Lenis (evita "pulo" nativo)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    // Um único ScrollTrigger.refresh() após todo o setup (depois que todas as
    // seções montaram e o layout assentou) — evita refresh por seção e
    // leituras de layout intercaladas. Dois rAF garantem o frame pós-layout.
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
