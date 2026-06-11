import { gsap } from "gsap";

/**
 * Explosão curta de partículas a partir do centro de um elemento.
 * DOM puro + GSAP (sem lib de confete, sem canvas). As partículas usam
 * position:fixed (escapam do recorte do mockup), sobem com física fake e são
 * removidas do DOM ao terminar. Throttle evita acúmulo em cliques repetidos.
 * Respeita prefers-reduced-motion (não dispara).
 */
const COLORS = ["#FFB020", "#FF6B6B", "#7C3AED", "#FFD166", "#A78BFA"];
let lastBurst = 0;

export function particleBurst(origin: HTMLElement) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const now = performance.now();
  if (now - lastBurst < 500) return; // throttle
  lastBurst = now;

  const rect = origin.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const count = 18;
  const nodes: HTMLSpanElement[] = [];
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const size = 6 + Math.random() * 7;
    const p = document.createElement("span");
    p.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;margin:${-size / 2}px;border-radius:9999px;background:${
      COLORS[i % COLORS.length]
    };pointer-events:none;z-index:90;will-change:transform,opacity;`;
    frag.appendChild(p);
    nodes.push(p);
  }
  document.body.appendChild(frag);

  nodes.forEach((p) => {
    const dx = (Math.random() - 0.5) * 170;
    const dy = -(40 + Math.random() * 120); // sobe
    gsap.fromTo(
      p,
      { x: 0, y: 0, scale: 0.6, opacity: 1 },
      {
        x: dx,
        y: dy,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.5,
        opacity: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => p.remove(),
      }
    );
  });
}
