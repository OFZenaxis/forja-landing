/** Barra de status fake do topo da tela do app. Ícones inline (sem dependência). */
export function StatusBar({ dark = false }: { dark?: boolean }) {
  const tone = dark ? "text-white/90" : "text-ink/80";
  return (
    <div className={`flex items-center justify-between px-6 pt-3 ${tone}`}>
      <span className="text-[11px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        {/* sinal */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7" width="2.5" height="4" rx="0.6" />
          <rect x="4" y="5" width="2.5" height="6" rx="0.6" />
          <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.6" />
          <rect x="12" y="0" width="2.5" height="11" rx="0.6" />
        </svg>
        {/* wifi */}
        <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor" aria-hidden>
          <path d="M7 2.2c2.3 0 4.4.9 5.9 2.4l-1.3 1.3A6.5 6.5 0 0 0 7 4.1 6.5 6.5 0 0 0 2.4 5.9L1.1 4.6A8.3 8.3 0 0 1 7 2.2Zm0 3.2c1.4 0 2.7.6 3.7 1.5L9.3 8.3A3.7 3.7 0 0 0 7 7.5c-.9 0-1.7.3-2.3.8L3.3 6.9A5.2 5.2 0 0 1 7 5.4Zm0 3.1c.7 0 1.3.3 1.8.7L7 10.8 5.2 9.2c.5-.4 1.1-.7 1.8-.7Z" />
        </svg>
        {/* bateria */}
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.5" />
          <rect x="2" y="2" width="13" height="7" rx="1.4" fill="currentColor" />
          <rect x="20" y="3.5" width="1.5" height="4" rx="0.7" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

/** Barra inferior estilo navegação do app. */
export function TabBar({ active = 0 }: { active?: number }) {
  const items = ["Hoje", "Treino", "Evolução", "Perfil"];
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-brand-100 bg-white/90 px-3 pb-5 pt-2.5 backdrop-blur">
      {items.map((label, i) => (
        <div
          key={label}
          className={`flex flex-col items-center gap-1 text-[9px] font-medium ${
            i === active ? "text-brand-600" : "text-muted/60"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              i === active ? "bg-brand-600" : "bg-muted/30"
            }`}
          />
          {label}
        </div>
      ))}
    </div>
  );
}
