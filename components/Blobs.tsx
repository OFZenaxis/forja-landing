/**
 * Camada de blobs orgânicos ao fundo. Formas estáticas (border-radius)
 * com drift contínuo via transform apenas (60fps). pointer-events-none,
 * atrás de todo o conteúdo. O loop é desligado por prefers-reduced-motion
 * (regra global em globals.css).
 */
export function Blobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-32 -top-24 h-[34rem] w-[34rem] animate-drift1 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="absolute -right-40 top-[18%] h-[30rem] w-[30rem] animate-drift2 rounded-full bg-coral/20 blur-3xl" />
      <div className="absolute bottom-[6%] left-[12%] h-[26rem] w-[26rem] animate-drift3 rounded-full bg-sun/20 blur-3xl" />
      <div className="absolute -bottom-32 right-[8%] h-[28rem] w-[28rem] animate-drift1 rounded-full bg-brand-300/40 blur-3xl" />
    </div>
  );
}
