import {
  InstagramLogoIcon,
  TiktokLogoIcon,
  YoutubeLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { StoreBadges } from "./badges/StoreBadges";

const COLUMNS = [
  {
    title: "Produto",
    links: ["Recursos", "Para personais", "Para alunos", "Preços", "Novidades"],
  },
  {
    title: "Empresa",
    links: ["Sobre", "Blog", "Carreiras", "Imprensa", "Contato"],
  },
  {
    title: "Suporte",
    links: ["Central de ajuda", "Status", "Privacidade", "Termos"],
  },
];

const SOCIALS = [
  { Icon: InstagramLogoIcon, label: "Instagram" },
  { Icon: TiktokLogoIcon, label: "TikTok" },
  { Icon: YoutubeLogoIcon, label: "YouTube" },
  { Icon: XLogoIcon, label: "X" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white/60 backdrop-blur">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Marca */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              O app de treinos gamificado que aproxima personais e alunos e
              transforma constância em conquista.
            </p>
            <div className="mt-6">
              <StoreBadges />
            </div>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <Icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold text-ink">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-brand-700"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-100 pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © 2026 Forja Tecnologia Ltda. Feito no Brasil.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="transition-colors hover:text-brand-700">
              Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-brand-700">
              Termos
            </a>
            <a href="#" className="transition-colors hover:text-brand-700">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
