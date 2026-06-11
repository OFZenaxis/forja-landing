"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { PhoneFrame } from "./phone/PhoneFrame";
import { ScreenChecklist } from "./phone/ScreenChecklist";
import { StoreBadges } from "./badges/StoreBadges";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = ["Treine", "como", "um", "jogo."];
const LINE2 = ["Evolua", "de", "verdade."];

/** Quebra uma palavra em <span.char> para o reveal (letras subindo). */
function Word({ text, gradient }: { text: string; gradient?: boolean }) {
  return (
    <span
      className={`mr-[0.25em] inline-block whitespace-nowrap ${
        gradient ? "text-gradient" : ""
      }`}
    >
      {text.split("").map((ch, i) => (
        <span key={i} className="char">
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  // A entrada (título, parágrafo, badges, mockup) é 100% CSS (animate-fadeUp),
  // então nada acima da dobra depende de JS para ficar visível (bom p/ LCP).
  // O GSAP só cuida do float contínuo, do tilt 3D e do fade no scroll —
  // efeitos que não escondem o conteúdo inicial.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          ok: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px) and (pointer: fine)",
        },
        (context) => {
          const { ok, desktop } = context.conditions as {
            ok: boolean;
            desktop: boolean;
          };
          if (!ok) return;

          // Float contínuo do mockup
          gsap.to(floatRef.current, {
            y: -18,
            duration: 3.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          // Zoom-out + fade sutil ao rolar
          gsap.to(innerRef.current, {
            scale: 0.92,
            opacity: 0,
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // Tilt 3D reagindo ao mouse (desktop)
          if (desktop && tiltRef.current) {
            gsap.set(tiltRef.current, { transformPerspective: 1100 });
            const rotY = gsap.quickTo(tiltRef.current, "rotationY", {
              duration: 0.6,
              ease: "power3",
            });
            const rotX = gsap.quickTo(tiltRef.current, "rotationX", {
              duration: 0.6,
              ease: "power3",
            });
            const onMove = (e: PointerEvent) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              const ny = e.clientY / window.innerHeight - 0.5;
              rotY(nx * 14);
              rotX(-ny * 12);
            };
            window.addEventListener("pointermove", onMove);
            return () => window.removeEventListener("pointermove", onMove);
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      <div
        ref={innerRef}
        className="container-px grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6"
      >
        {/* Coluna de texto */}
        <div className="text-center lg:text-left">
          <span className="inline-flex animate-fadeUp items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-semibold text-accent shadow-soft backdrop-blur [animation-delay:60ms]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-coral" />
            Novidade: temporadas e ligas entre alunos
          </span>

          <h1
            aria-label="Treine como um jogo. Evolua de verdade."
            className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-[4.2rem]"
          >
            <span
              aria-hidden="true"
              className="line-mask line-1 animate-fadeUp [animation-delay:120ms]"
            >
              {LINE1.map((w) => (
                <Word key={w} text={w} />
              ))}
            </span>
            <span
              aria-hidden="true"
              className="line-mask line-2 animate-fadeUp [animation-delay:200ms]"
            >
              {LINE2.map((w) => (
                <Word key={w} text={w} gradient={w === "verdade."} />
              ))}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-md animate-fadeUp text-base text-fg-muted [animation-delay:300ms] sm:text-lg lg:mx-0">
            O app que transforma o treino do seu personal em missões diárias,
            streaks e conquistas. Constância vira hábito.
          </p>

          <div className="mt-7 flex animate-fadeUp flex-col items-center gap-4 [animation-delay:380ms] sm:flex-row lg:items-start">
            <StoreBadges />
          </div>

          <div className="mt-5 flex animate-fadeUp items-center justify-center gap-2 text-sm text-fg-muted [animation-delay:460ms] lg:justify-start">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={16} weight="fill" className="text-sun" />
              ))}
            </span>
            <span className="font-semibold text-fg">4,9</span>
            <span>· grátis para começar</span>
          </div>
        </div>

        {/* Coluna do mockup */}
        <div className="perspective relative flex justify-center lg:justify-end">
          {/* Blob com gradiente animado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="blob-shape h-[26rem] w-[26rem] animate-spinSlow bg-[conic-gradient(from_0deg,#7C3AED,#A78BFA,#FF6B6B,#FFB020,#7C3AED)] opacity-30 blur-2xl sm:h-[30rem] sm:w-[30rem]" />
          </div>

          {/* Entrada do mockup em CSS (não depende de JS p/ ficar visível) */}
          <div className="relative z-10 animate-fadeUp [animation-delay:200ms]">
            <div ref={tiltRef} className="preserve-3d">
              <div ref={floatRef} className="gpu">
                <PhoneFrame>
                  <ScreenChecklist />
                </PhoneFrame>
              </div>
            </div>
          </div>

          {/* Cards flutuantes */}
          <div className="absolute -left-2 top-[22%] z-20 animate-fadeUp rounded-2xl border border-line bg-surface/95 px-3 py-2 shadow-lift backdrop-blur [animation-delay:560ms] sm:-left-4">
            <p className="text-[10px] font-medium text-fg-muted">Hoje</p>
            <p className="text-sm font-bold text-accent">+195 XP</p>
          </div>

          <div className="absolute -right-1 bottom-[18%] z-20 flex animate-fadeUp items-center gap-2 rounded-2xl border border-line bg-surface/95 px-3 py-2 shadow-lift backdrop-blur [animation-delay:620ms] sm:-right-3">
            <span className="text-lg">🔥</span>
            <div>
              <p className="text-[10px] font-medium text-fg-muted">Streak</p>
              <p className="text-sm font-bold text-fg">96 dias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
