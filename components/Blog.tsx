"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { POSTS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function Blog() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="blog" className="container-px py-20 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
            Do nosso blog
          </h2>
          <p className="mt-3 text-fg-muted">
            Conteúdo sobre hábitos, treino e como manter alunos motivados de
            verdade.
          </p>
        </div>
        <a
          href="#blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent"
        >
          Ver todos os artigos
          <ArrowRightIcon size={16} weight="bold" />
        </a>
      </div>

      <div className="blog-grid mt-12 grid gap-6 md:grid-cols-3">
        {POSTS.map((post) => (
          <article
            key={post.title}
            className="blog-card group flex flex-col overflow-hidden rounded-4xl border border-line bg-surface shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-lift"
          >
            {/* Imagem placeholder com gradiente */}
            <div
              className="relative aspect-[16/10] w-full"
              style={{
                backgroundImage: `linear-gradient(135deg, ${post.from}, ${post.to})`,
              }}
            >
              <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
                {post.tag}
              </span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-bold leading-snug text-fg transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-fg-muted">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-medium text-fg-muted">
                  {post.readtime}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface2 text-accent transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <ArrowRightIcon size={15} weight="bold" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
