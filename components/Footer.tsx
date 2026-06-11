import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { StoreBadges } from "./badges/StoreBadges";

const INSTAGRAM = "https://instagram.com/agenciazenaxis";

// Apenas âncoras de seções que existem de fato na página.
const COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Recursos", href: "#recursos" },
      { label: "Preços", href: "#precos" },
      { label: "Depoimentos", href: "#depoimentos" },
    ],
  },
  {
    title: "Saiba mais",
    links: [
      { label: "Perguntas frequentes", href: "#faq" },
      { label: "Blog", href: "#blog" },
      { label: "Entrar na lista", href: "#download" },
    ],
  },
];

const SOCIALS = [
  { Icon: InstagramLogoIcon, label: "Instagram", href: INSTAGRAM },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60 backdrop-blur">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Marca */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-fg-muted">
              O app de treinos gamificado que aproxima personais e alunos e
              transforma constância em conquista.
            </p>
            <div className="mt-6">
              <StoreBadges />
            </div>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-accent transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <Icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links (âncoras reais) */}
          <div className="grid grid-cols-2 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold text-fg">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-fg-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-fg-muted">
            © 2026 Forja Tecnologia Ltda. Feito no Brasil.
          </p>
          <div className="flex gap-6 text-sm text-fg-muted">
            <a href="#" className="transition-colors hover:text-accent">
              Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              Termos
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              Cookies
            </a>
          </div>
        </div>

        {/* Case study / crédito da agência */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-xs text-fg-muted sm:flex-row sm:gap-3">
          <p className="text-center">
            Projeto demonstrativo da{" "}
            <a
              href="https://instagram.com/agenciazenaxis"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent transition-colors hover:underline"
            >
              Zenaxis
            </a>{" "}
            · Next.js, GSAP, Lenis · 169 kB First Load JS · feito em Luziânia-GO
          </p>
          <span aria-hidden className="hidden text-line sm:inline">
            ·
          </span>
          <a
            href="https://instagram.com/agenciazenaxis"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent transition-colors hover:underline"
          >
            Quer uma landing assim?
          </a>
        </div>
      </div>
    </footer>
  );
}
