"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { PhoneFrame } from "./phone/PhoneFrame";
import { ScreenChecklist } from "./phone/ScreenChecklist";
import { StoreBadges } from "./badges/StoreBadges";

gsap.registerPlugin(ScrollTrigger);

// Roda antes do paint no cliente (evita flash do título já posicionado).
const useIsoLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

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

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          ok: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px) and (pointer: fine)",
        },
        (context) => {
          const { reduce, desktop } = context.conditions as {
            reduce: boolean;
            ok: boolean;
            desktop: boolean;
          };

          if (reduce) {
            gsap.set(".char, .hero-fade, .hero-phone", {
              opacity: 1,
              y: 0,
              clearProps: "all",
            });
            return;
          }

          // Entrada coreografada
          const tl = gsap.timeline({
            defaults: { ease: "power4.out" },
          });
          tl.from(".line-1 .char", {
            yPercent: 120,
            duration: 0.9,
            stagger: 0.025,
          })
            .from(
              ".line-2 .char",
              { yPercent: 120, duration: 0.9, stagger: 0.025 },
              "-=0.65"
            )
            .from(
              ".hero-fade",
              { opacity: 0, y: 22, duration: 0.7, stagger: 0.12 },
              "-=0.5"
            )
            .from(
              ".hero-phone",
              { opacity: 0, y: 40, scale: 0.92, duration: 1 },
              "-=1"
            )
            .from(
              ".hero-chip-float",
              { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.12 },
              "-=0.4"
            );

          // Float contínuo do mockup
          gsap.to(floatRef.current, {
            y: -18,
            duration: 3.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.1,
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
          <span className="hero-fade inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-soft backdrop-blur">
            <span className="flex h-1.5 w-1.5 rounded-full bg-coral" />
            Novidade: temporadas e ligas entre alunos
          </span>

          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
            <span className="line-mask line-1">
              {LINE1.map((w) => (
                <Word key={w} text={w} />
              ))}
            </span>
            <span className="line-mask line-2">
              {LINE2.map((w) => (
                <Word key={w} text={w} gradient={w === "verdade."} />
              ))}
            </span>
          </h1>

          <p className="hero-fade mx-auto mt-5 max-w-md text-base text-muted sm:text-lg lg:mx-0">
            O app que transforma o treino do seu personal em missões diárias,
            streaks e conquistas. Constância vira hábito.
          </p>

          <div className="hero-fade mt-7 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <StoreBadges />
          </div>

          <div className="hero-fade mt-5 flex items-center justify-center gap-2 text-sm text-muted lg:justify-start">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={16} weight="fill" className="text-sun" />
              ))}
            </span>
            <span className="font-semibold text-ink">4,9</span>
            <span>· grátis para começar</span>
          </div>
        </div>

        {/* Coluna do mockup */}
        <div className="perspective relative flex justify-center lg:justify-end">
          {/* Blob com gradiente animado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="blob-shape h-[26rem] w-[26rem] animate-spinSlow bg-[conic-gradient(from_0deg,#7C3AED,#A78BFA,#FF6B6B,#FFB020,#7C3AED)] opacity-30 blur-2xl sm:h-[30rem] sm:w-[30rem]" />
          </div>

          <div ref={tiltRef} className="hero-phone preserve-3d relative z-10">
            <div ref={floatRef} className="gpu">
              <PhoneFrame>
                <ScreenChecklist />
              </PhoneFrame>
            </div>
          </div>

          {/* Cards flutuantes */}
          <div className="hero-chip-float absolute -left-2 top-[22%] z-20 rounded-2xl border border-white bg-white/95 px-3 py-2 shadow-lift backdrop-blur sm:-left-4">
            <p className="text-[10px] font-medium text-muted">Hoje</p>
            <p className="text-sm font-bold text-brand-600">+195 XP</p>
          </div>

          <div className="hero-chip-float absolute -right-1 bottom-[18%] z-20 flex items-center gap-2 rounded-2xl border border-white bg-white/95 px-3 py-2 shadow-lift backdrop-blur sm:-right-3">
            <span className="text-lg">🔥</span>
            <div>
              <p className="text-[10px] font-medium text-muted">Streak</p>
              <p className="text-sm font-bold text-ink">96 dias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
