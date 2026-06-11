"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneFrame } from "./phone/PhoneFrame";
import { ScreenAchievements } from "./phone/ScreenAchievements";
import { StoreBadges } from "./badges/StoreBadges";

gsap.registerPlugin(ScrollTrigger);

export function CtaBanner() {
  const cardRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
      gsap.to(phoneRef.current, {
        y: -14,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="download" className="container-px py-16 sm:py-20">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-5xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-6 py-12 shadow-lift sm:px-12 sm:py-16"
      >
        {/* Blobs internos */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-coral/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-sun/25 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center text-white lg:text-left">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Experimente grátis
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/85 lg:mx-0">
              Baixe o Forja, conclua sua primeira missão hoje e sinta a diferença
              de treinar com um objetivo claro todos os dias.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <StoreBadges />
            </div>
            <p className="mt-4 text-sm text-white/70">
              Sem cartão de crédito · cancele quando quiser
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div ref={phoneRef} className="gpu">
              <PhoneFrame className="rotate-3">
                <ScreenAchievements />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
