"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { FEATURES } from "@/lib/content";
import { PhoneFrame } from "./phone/PhoneFrame";
import { ScreenChecklist } from "./phone/ScreenChecklist";
import { ScreenStreak } from "./phone/ScreenStreak";
import { ScreenRadar } from "./phone/ScreenRadar";
import { ScreenAchievements } from "./phone/ScreenAchievements";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

// Quatro capítulos, na ordem do brief: checklist -> streak -> radar -> conquista
const CHAPTERS = ["tarefas", "streak", "radar", "conquistas"]
  .map((id) => FEATURES.find((f) => f.id === id)!)
  .filter(Boolean);

const SCREENS = [
  ScreenChecklist,
  ScreenStreak,
  ScreenRadar,
  ScreenAchievements,
];

function ChapterText({
  chapter,
  index,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
}) {
  return (
    <>
      <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
        0{index + 1}
      </span>
      <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {chapter.title} <span className="text-gradient">{chapter.highlight}</span>
      </h3>
      <p className="mt-4 max-w-md text-base text-muted">{chapter.body}</p>
      <ul className="mt-6 flex max-w-md flex-col gap-3">
        {chapter.bullets.map((b) => (
          <li
            key={b}
            className="flex items-center gap-3 text-left text-sm font-medium text-ink"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <CheckIcon size={14} weight="bold" />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </>
  );
}

export function PinnedShowcase() {
  const [enhanced, setEnhanced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const screenRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Decide a versão (pinada só em desktop sem reduced-motion)
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnhanced(desktop.matches && !reduce.matches);
    update();
    desktop.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  // Timeline pinada (desktop)
  useIsoLayoutEffect(() => {
    if (!enhanced) return;

    const ctx = gsap.context(() => {
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
      const screens = screenRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLButtonElement[];
      const n = CHAPTERS.length;

      // Estado inicial: capítulo 0 visível, demais escondidos
      gsap.set(texts, { opacity: 0, y: 40 });
      gsap.set(texts[0], { opacity: 1, y: 0 });
      gsap.set(screens, { opacity: 0, yPercent: 8 });
      gsap.set(screens[0], { opacity: 1, yPercent: 0 });
      dots.forEach((d, i) =>
        gsap.set(d, { scale: i === 0 ? 1 : 0.55, opacity: i === 0 ? 1 : 0.4 })
      );

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * n,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < n - 1; i++) {
        tl.to(texts[i], { opacity: 0, y: -40, duration: 0.4 }, i + 0.2)
          .to(screens[i], { opacity: 0, yPercent: -8, duration: 0.5 }, "<")
          .to(dots[i], { scale: 0.55, opacity: 0.4, duration: 0.3 }, "<")
          .to(texts[i + 1], { opacity: 1, y: 0, duration: 0.4 }, i + 0.55)
          .to(screens[i + 1], { opacity: 1, yPercent: 0, duration: 0.5 }, "<")
          .to(dots[i + 1], { scale: 1, opacity: 1, duration: 0.3 }, "<");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [enhanced]);

  // Reveals simples na versão empilhada (mobile / reduced)
  useEffect(() => {
    if (enhanced) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cap-card").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [enhanced]);

  const goTo = (i: number) => {
    const el = document.getElementById(`cap-${i}`);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      ref={sectionRef}
      id="recursos"
      className="relative"
      aria-label="Recursos do app"
    >
      {/* Cabeçalho da seção */}
      <div className="container-px pt-20 text-center sm:pt-28">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          Recursos
        </span>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Tudo que prende o aluno no treino
        </h2>
      </div>

      {enhanced ? (
        /* ---------- Versão pinada (desktop) ---------- */
        <div
          ref={pinRef}
          className="relative mt-10 flex h-[100dvh] items-center"
        >
          <div className="container-px grid w-full grid-cols-2 items-center gap-12">
            {/* Texto (capítulos empilhados) */}
            <div className="relative min-h-[380px]">
              {CHAPTERS.map((chapter, i) => (
                <div
                  key={chapter.id}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <ChapterText chapter={chapter} index={i} />
                </div>
              ))}
            </div>

            {/* Mockup pinado com telas empilhadas */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="blob-shape h-80 w-80 bg-brand-200/50 blur-2xl" />
                </div>
                <PhoneFrame>
                  <div className="relative h-full w-full">
                    {SCREENS.map((Screen, i) => (
                      <div
                        key={i}
                        ref={(el) => {
                          screenRefs.current[i] = el;
                        }}
                        className="absolute inset-0 gpu"
                      >
                        <Screen />
                      </div>
                    ))}
                  </div>
                </PhoneFrame>
              </div>
            </div>
          </div>

          {/* Indicador de progresso (4 dots) */}
          <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-3">
            {CHAPTERS.map((_, i) => (
              <button
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                onClick={() => goTo(i)}
                aria-label={`Ir para o recurso ${i + 1}`}
                className="h-3 w-3 rounded-full bg-brand-600"
              />
            ))}
          </div>
        </div>
      ) : (
        /* ---------- Versão empilhada (mobile / reduced-motion) ---------- */
        <div className="container-px mt-12 flex flex-col gap-20 pb-8">
          {CHAPTERS.map((chapter, i) => {
            const Screen = SCREENS[i];
            return (
              <div
                id={`cap-${i}`}
                key={chapter.id}
                className="cap-card grid items-center gap-8 md:grid-cols-2"
              >
                <div className="flex justify-center">
                  <PhoneFrame>
                    <Screen />
                  </PhoneFrame>
                </div>
                <div className="text-center md:text-left">
                  <ChapterText chapter={chapter} index={i} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Âncoras para os dots na versão desktop */}
      {enhanced && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          {CHAPTERS.map((_, i) => (
            <span
              key={i}
              id={`cap-${i}`}
              className="absolute"
              style={{ top: `${(i / CHAPTERS.length) * 100}%` }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
