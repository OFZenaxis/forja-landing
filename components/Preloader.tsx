"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Logo } from "./Logo";

/** Preloader minimalista (máx ~1s) exibido só na primeira visita da sessão. */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("forja-visited")) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("forja-visited", "1");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = window.setTimeout(() => setVisible(false), 300);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setVisible(false) });
      tl.from(logoRef.current, { opacity: 0, y: 8, duration: 0.35 })
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power1.inOut" },
          0.1
        )
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.3 }, ">-0.05");
    });
    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
    >
      <div ref={logoRef}>
        <Logo />
      </div>
      <div className="mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-brand-100">
        <div
          ref={barRef}
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-600 to-coral"
        />
      </div>
    </div>
  );
}
