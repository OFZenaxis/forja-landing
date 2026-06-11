import type { ReactNode } from "react";

/**
 * Moldura de iPhone em puro CSS (sem imagens externas).
 * O conteúdo (telas fake do app) é passado como children.
 */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19] w-[260px] shrink-0 rounded-[2.75rem] bg-ink p-[10px] shadow-phone sm:w-[288px] ${className}`}
    >
      {/* Brilho da borda metálica */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-white/15" />
      {/* Tela */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-cream">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}
