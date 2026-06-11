import {
  AppleLogoIcon,
  GooglePlayLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

function Badge({
  icon,
  top,
  bottom,
  href,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-2xl bg-ink px-4 py-2.5 text-white shadow-soft transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#2A2540] active:scale-95 motion-reduce:transform-none"
    >
      <span className="text-white">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium text-white/70">{top}</span>
        <span className="text-sm font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Badge
        href="#download"
        icon={<AppleLogoIcon size={26} weight="fill" />}
        top="Baixe na"
        bottom="App Store"
      />
      <Badge
        href="#download"
        icon={<GooglePlayLogoIcon size={24} weight="fill" />}
        top="Disponível no"
        bottom="Google Play"
      />
    </div>
  );
}
