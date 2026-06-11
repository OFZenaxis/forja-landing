# Forja — landing page

Landing page one-page do **Forja**, um app de treinos gamificado para personal trainers e seus alunos. Construída com **Next.js 14 (App Router)**, **Tailwind CSS**, **GSAP + ScrollTrigger** (toda a coreografia de scroll e entradas) e **Lenis** (smooth scroll). Micro-interações de hover/tap são CSS puro. Mobile-first e em pt-BR.

## Camada de movimento

- **Lenis + GSAP ticker** ([SmoothScroll.tsx](components/SmoothScroll.tsx)) — smooth scroll ligado ao `ScrollTrigger.update`; plugin registrado em client component. Desligado sob `prefers-reduced-motion`.
- **Hero cinematográfico** ([Hero.tsx](components/Hero.tsx)) — reveal por linha com máscara, letras subindo em stagger, tilt 3D reagindo ao mouse (desktop), zoom-out + fade no scroll.
- **Showcase pinado** ([PinnedShowcase.tsx](components/PinnedShowcase.tsx)) — iPhone fixo enquanto 4 capítulos passam; a tela interna faz crossfade + slide, texto com scrub, dots de progresso. Mobile/reduced degrada para reveals simples.
- **Capítulos de cor + curvas** ([BackgroundChapters.tsx](components/BackgroundChapters.tsx), [SectionCurve.tsx](components/SectionCurve.tsx)).
- **Depoimentos** ([Testimonials.tsx](components/Testimonials.tsx)) — duas fileiras opostas com velocidade reativa ao scroll.
- **Stats** ([Stats.tsx](components/Stats.tsx)) — contadores grandes com count-up por ScrollTrigger e blur→focus.
- **Polimento** — cursor customizado ([CustomCursor.tsx](components/CustomCursor.tsx)), preloader ([Preloader.tsx](components/Preloader.tsx)).

Todas as instâncias de GSAP/ScrollTrigger são criadas dentro de `gsap.context()` e revertidas no unmount; `gsap.matchMedia()` garante que o pin/scrub não quebrem no resize e respeitem `prefers-reduced-motion`.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

> A fonte **Poppins** é carregada via `next/font` (Google Fonts) no primeiro build. É necessário acesso à internet na primeira execução.

## Build de produção

```bash
npm run build
npm start
```

## Estrutura

| Seção | Componente |
| --- | --- |
| Header fixo com blur ao rolar | `components/Header.tsx` |
| Hero full-height (título em stagger + mockup flutuante) | `components/Hero.tsx` |
| Números animados (count-up) | `components/Stats.tsx` |
| Features em zigue-zague com parallax | `components/Features.tsx` |
| Depoimentos (marquee infinito) | `components/Testimonials.tsx` |
| Banner CTA | `components/CtaBanner.tsx` |
| Grid de blog | `components/Blog.tsx` |
| Footer | `components/Footer.tsx` |

Os mockups de celular são UI fake em CSS/SVG (sem imagens externas), em `components/phone/`.

## Decisões de design

- Paleta: roxo `#7C3AED` como primária + acentos quentes (`coral #FF6B6B`, `sun #FFB020`).
- Tipografia: Poppins (geométrica).
- Movimento prioriza `transform`/`opacity` (60fps) e respeita `prefers-reduced-motion`.
- Blobs orgânicos animados por `transform` apenas, em camada de fundo (`-z-10`).
