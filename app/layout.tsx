import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const TITLE = "Forja: treine, evolua e conquiste";
const DESCRIPTION =
  "O app de treinos gamificado que conecta personal trainers e alunos. Tarefas diárias, streaks, níveis, radar de evolução e conquistas para treinar com constância.";

export const metadata: Metadata = {
  metadataBase: new URL("https://treinolandpage.zenaxis.com.br"),
  title: {
    default: TITLE,
    template: "%s · Forja",
  },
  description: DESCRIPTION,
  applicationName: "Forja",
  keywords: [
    "app de treino",
    "personal trainer",
    "treino gamificado",
    "academia",
    "constância",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description:
      "Treinos gamificados para personal trainers e alunos: tarefas diárias, streaks, níveis e evolução de verdade.",
    url: "/",
    siteName: "Forja",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Treinos gamificados para personal trainers e alunos: tarefas diárias, streaks, níveis e evolução de verdade.",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    title: "Forja",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
};

// Aplica o tema antes do primeiro paint (evita flash). Lê localStorage e,
// na ausência, respeita prefers-color-scheme.
const themeScript = `(function(){try{var t=localStorage.getItem('forja-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
