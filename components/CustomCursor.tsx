"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Cursor sutil: dot que acompanha o ponteiro de imediato + ring com lag,
 * que cresce sobre elementos clicáveis. Só ativa em ponteiro fino com hover
 * e fora do prefers-reduced-motion. Usa quickTo (fora do ciclo do React).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    gsap.set([dot, ring], { autoAlpha: 0, xPercent: 0, yPercent: 0 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [data-cursor]");

    const over = (e: PointerEvent) => {
      if (isInteractive(e.target))
        gsap.to(ring, {
          scale: 1.9,
          borderColor: "rgba(255,107,107,0.7)",
          duration: 0.3,
        });
    };
    const out = (e: PointerEvent) => {
      if (isInteractive(e.target))
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(124,58,237,0.55)",
          duration: 0.3,
        });
    };
    const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      document.removeEventListener("pointerleave", leave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
