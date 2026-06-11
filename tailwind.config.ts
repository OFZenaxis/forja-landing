import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      colors: {
        // Primária roxo + neutros frios harmonizados (fixos — usados pelos
        // mockups do iPhone, que NÃO mudam com o tema)
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED", // primária
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        // Acentos quentes (gamificação)
        coral: "#FF6B6B",
        sun: "#FFB020",
        ink: "#1E1B2E", // texto (warm near-black, nunca #000)
        muted: "#6B6580",
        cream: "#FBFAFF", // fundo claro lilás

        // Tokens semânticos (trocam de valor no dark via CSS vars)
        page: "rgb(var(--page) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--fg-muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 18px 50px -12px rgba(124, 58, 237, 0.22)",
        lift: "0 30px 60px -18px rgba(124, 58, 237, 0.32)",
        phone: "0 40px 80px -24px rgba(76, 29, 149, 0.45)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(-1.5deg)" },
          "50%": { transform: "translateY(-20px) rotate(1.5deg)" },
        },
        floatSoft: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift1: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-30px) scale(1.08)" },
          "66%": { transform: "translate(-30px,20px) scale(0.96)" },
        },
        drift2: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px,30px) scale(1.12)" },
        },
        drift3: {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(30px,40px) rotate(8deg)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        menuIn: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "20%,60%": { transform: "translateX(-6px)" },
          "40%,80%": { transform: "translateX(6px)" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "60%": { transform: "scale(1.03)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatSoft: "floatSoft 5s ease-in-out infinite",
        drift1: "drift1 22s ease-in-out infinite",
        drift2: "drift2 26s ease-in-out infinite",
        drift3: "drift3 30s ease-in-out infinite",
        spinSlow: "spinSlow 28s linear infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        menuIn: "menuIn 0.25s cubic-bezier(0.16,1,0.3,1)",
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        shake: "shake 0.4s ease-in-out",
        pop: "pop 0.45s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
