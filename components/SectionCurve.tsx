"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Divisor de seção com onda SVG que se deforma levemente no scroll (scaleY,
 * transform-only). Decorativo, fill em tom da paleta. flip espelha verticalmente.
 */
export function SectionCurve({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        { scaleY: 0.55 },
        {
          scaleY: 1.1,
          ease: "none",
          transformOrigin: "50% 100%",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none -my-px w-full overflow-hidden leading-[0] ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[100px]"
      >
        <path
          ref={pathRef}
          d="M0,40 C360,120 1080,0 1440,70 L1440,120 L0,120 Z"
          className="fill-accent-soft/60"
          style={{ transformBox: "fill-box" }}
        />
      </svg>
    </div>
  );
}
