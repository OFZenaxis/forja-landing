import type { ReactNode } from "react";

/**
 * Moldura de iPhone em puro CSS (sem imagens externas).
 * O conteúdo (telas fake do app) é passado como children.
 *
 * Raio externo da moldura: 2.75rem (44px). Borda (padding): 10px.
 * Raio interno da tela = 44px - 10px = 34px = 2.125rem (cantos coerentes).
 *
 * O container da tela é `relative overflow-hidden` E promove sua própria
 * camada com `translateZ(0)`: isso força o recorte arredondado a também
 * conter filhos compostos na GPU (TabBar com backdrop-blur e os screens que
 * entram com slide no showcase pinado), que de outra forma "vazariam" pelos
 * cantos.
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
      aria-hidden="true"
      className={`relative aspect-[9/19] w-[288px] shrink-0 rounded-[2.75rem] bg-ink p-[10px] shadow-phone ${className}`}
    >
      {/* Brilho da borda metálica */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-white/15" />
      {/* Tela */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.125rem] bg-cream isolate [transform:translateZ(0)]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}
