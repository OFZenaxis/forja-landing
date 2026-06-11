"use client";

import { useState } from "react";
import { CircleNotchIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);

  const fail = (msg: string) => {
    setStatus("error");
    setMessage(msg);
    setShake(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_RE.test(email.trim())) {
      fail("Hmm, esse e-mail não parece válido. Confere pra mim?");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company }),
      });
      if (!res.ok) throw new Error("bad_status");
      setStatus("success");
    } catch {
      fail("Algo deu errado por aqui. Tente de novo em instantes.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex animate-pop items-center gap-3 rounded-full bg-white/15 px-6 py-4 text-white backdrop-blur"
      >
        <span className="text-2xl">🎉</span>
        <p className="text-sm font-semibold sm:text-base">
          Você está na lista! Avisamos assim que sua vaga abrir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div
        onAnimationEnd={() => setShake(false)}
        className={`flex flex-col gap-2 rounded-3xl bg-white p-1.5 shadow-lift sm:flex-row sm:items-center sm:rounded-full ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Honeypot — escondido de humanos, visível a bots */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <label htmlFor="waitlist-email" className="sr-only">
          Seu melhor e-mail
        </label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-[#2A2540] active:scale-[0.98] disabled:opacity-80 motion-reduce:transform-none"
        >
          {status === "loading" ? (
            <>
              <CircleNotchIcon size={16} weight="bold" className="animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Entrar na lista de espera
              <ArrowRightIcon size={16} weight="bold" />
            </>
          )}
        </button>
      </div>

      {/* Mensagem de status (erros) — anunciada por leitores de tela */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-[20px] pl-2 text-sm ${
          status === "error" ? "text-sun" : "text-white/70"
        }`}
      >
        {status === "error"
          ? message
          : "Sem spam. Só o aviso quando o app abrir."}
      </p>
    </form>
  );
}
