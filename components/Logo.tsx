import { LightningIcon } from "@phosphor-icons/react/dist/ssr";

/** Wordmark do Forja com marca em raio (forjar energia). */
export function Logo({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-bold tracking-tight ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-coral text-white shadow-soft">
        <LightningIcon size={18} weight="fill" />
      </span>
      <span className={`text-xl ${dark ? "text-white" : "text-ink"}`}>
        Forja
      </span>
    </span>
  );
}
