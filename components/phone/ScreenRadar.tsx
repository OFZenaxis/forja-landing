"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { StatusBar, TabBar } from "./parts";

const AXES = ["Força", "Resistência", "Mobilidade", "Definição", "Constância"];
const CURRENT = [0.92, 0.7, 0.58, 0.8, 0.96];
const PREVIOUS = [0.7, 0.55, 0.5, 0.62, 0.74];

const CX = 110;
const CY = 105;
const R = 72;

function point(value: number, i: number) {
  const angle = (-90 + i * 72) * (Math.PI / 180);
  return [CX + R * value * Math.cos(angle), CY + R * value * Math.sin(angle)];
}

function polygon(values: number[]) {
  return values.map((v, i) => point(v, i).join(",")).join(" ");
}

export function ScreenRadar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".radar-current", {
        scale: 0.2,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        svgOrigin: `${CX} ${CY}`,
      });
      gsap.from(".radar-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        delay: 0.5,
        ease: "back.out(2)",
        transformOrigin: "center",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col bg-gradient-to-b from-cream to-brand-50"
    >
      <StatusBar />

      <div className="px-5 pt-4">
        <h3 className="text-base font-bold text-ink">Radar do shape</h3>
        <p className="text-[11px] text-muted">Abril vs. Fevereiro</p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 220 215" className="h-[200px] w-[210px]">
          {/* grades */}
          {[0.25, 0.5, 0.75, 1].map((g) => (
            <polygon
              key={g}
              points={polygon([g, g, g, g, g])}
              fill="none"
              stroke="#DDD6FE"
              strokeWidth="1"
            />
          ))}
          {AXES.map((_, i) => {
            const [x, y] = point(1, i);
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                stroke="#DDD6FE"
                strokeWidth="1"
              />
            );
          })}

          {/* mês anterior */}
          <polygon
            points={polygon(PREVIOUS)}
            fill="rgba(255,107,107,0.12)"
            stroke="#FF6B6B"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* mês atual */}
          <polygon
            className="radar-current"
            points={polygon(CURRENT)}
            fill="rgba(124,58,237,0.22)"
            stroke="#7C3AED"
            strokeWidth="2"
          />
          {CURRENT.map((v, i) => {
            const [x, y] = point(v, i);
            return (
              <circle key={i} className="radar-dot" cx={x} cy={y} r="3" fill="#7C3AED" />
            );
          })}

          {/* rótulos */}
          {AXES.map((label, i) => {
            const [x, y] = point(1.22, i);
            return (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted"
                style={{ fontSize: 8, fontWeight: 600 }}
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mx-5 mb-2 flex items-center justify-center gap-4 rounded-2xl bg-white px-3 py-2 text-[10px] font-medium shadow-soft">
        <span className="flex items-center gap-1.5 text-ink">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-600" /> Abril
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <span className="h-2.5 w-2.5 rounded-sm border border-coral bg-coral/20" />
          Fevereiro
        </span>
      </div>

      <div className="h-16" />
      <TabBar active={2} />
    </div>
  );
}
