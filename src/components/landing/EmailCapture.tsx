// src/components/landing/EmailCapture.tsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const FN_URL =
  "https://kmxnfnffaaztywuijjvo.supabase.co/functions/v1/send-waitlist-welcome";

function fbqExists() {
  return typeof window !== "undefined" && (window as any).fbq;
}
function getUTMs() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  return out;
}

type Props = {
  variant?: "full" | "simple";
  withId?: boolean;
  ctaLabel?: string;
  className?: string;
};

export default function EmailCapture({
  variant = "full",
  withId = true,
  ctaLabel = "Garantir meu acesso VIP",
  className = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [hp, setHp] = useState("");

  const isSimple = variant === "simple";
  const sectionRef = useRef<HTMLElement | null>(null);
  const formVisibleFired = useRef(false);
  const consentRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !formVisibleFired.current) {
            formVisibleFired.current = true;
            if (fbqExists()) {
              (window as any).fbq("trackCustom", "FormVisible", {
                form_id: "email_capture",
                location: "landing",
                ...getUTMs(),
              });
            }
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (hp) return;

    if (!isValidEmail(email)) {
      setStatus("⚠️ Digite um e-mail válido.");
      return;
    }
    if (!consent) {
      setStatus("⚠️ Você precisa aceitar os termos para continuar.");
      consentRef.current?.focus();
      return;
    }

    if (fbqExists()) {
      (window as any).fbq("trackCustom", "SignupStart", {
        form_id: "email_capture",
        location: "landing",
        ...getUTMs(),
      });
    }

    setLoading(true);
    try {
      const normalized = email.trim().toLowerCase();
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtteG5mbmZmYWF6dHl3dWlqanZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTgzNDAsImV4cCI6MjA3MTQ3NDM0MH0.209vsDacXrQSWVrkXsMyqGFwCyiKYD_0qVJG4eXcKVw"
},
        body: JSON.stringify({
          email: normalized,
          utm: Object.fromEntries(new URLSearchParams(window.location.search)),
          referer: document.referrer || undefined,
        }),
      });

      const json = (await res.json().catch(() => ({}))) as any;
      if (!res.ok) {
        console.error("send-waitlist-welcome error:", json);
        setStatus("❌ Erro ao enviar o e-mail. Tente novamente.");
        if (fbqExists()) {
          (window as any).fbq("trackCustom", "SignupError", {
            form_id: "email_capture",
            reason: String(json?.error || res.status),
            location: "landing",
            ...getUTMs(),
          });
        }
        return;
      }

      // ✅ Dispara evento padrão do Meta Pixel
      if (fbqExists()) {
        (window as any).fbq("track", "Lead", {
          form_id: "email_capture",
          location: "landing",
          ...getUTMs(),
        });
      }

      setStatus("✅ Você tá na lista! Confira seu e-mail 🎉");
      setEmail("");
      setConsent(false);

      (window as any).gtag?.("event", "lead_submit", { method: "lp" });
      (window as any).posthog?.capture?.("lead_submitted", { source: "lp" });

      setCooldown(true);
      setTimeout(() => setCooldown(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const wrapperClasses = [
    isSimple
      ? ""
      : "relative overflow-hidden px-6 py-20 sm:py-28 scroll-mt-24",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={sectionRef}
      id={withId ? "emailcapture" : undefined}
      className={wrapperClasses}
    >
      <div className={isSimple ? "" : "mx-auto max-w-2xl text-center"}>
        {!isSimple && (
          <>
            <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
              Vagas limitadas: garanta seu acesso antecipado
            </h2>
            <p className="mt-4 text-lg text-[#A1A1AA]">
              <span className="text-[#00FFB2] font-semibold">
                Bônus pra quem entrar agora:
              </span>{" "}
              badge de Early Adopter no app + voz ativa na construção do produto
            </p>
          </>
        )}

        <form
          onSubmit={handleSubmit}
          className={
            (isSimple ? "mt-0" : "mt-8") +
            " flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          }
        >
          <input
            id="honeypot"
            name="honeypot"
            type="text"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <input
            id="email-input"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu melhor e-mail"
            className="w-full flex-1 rounded-full border border-white/20 bg-[#0D0D0D]/60 px-5 py-3 text-[#F5F5F5] placeholder-[#A1A1AA] focus:border-[#00FFB2] focus:ring-2 focus:ring-[#00FFB2] outline-none max-w-[680px]"
            required
            aria-label="E-mail"
            inputMode="email"
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={loading || cooldown}
            aria-disabled={!consent}
            className="rounded-full bg-[#00FFB2] px-6 py-3 font-semibold text-[#0D0D0D]
                       transition hover:scale-[1.03] hover:shadow-[0_0_32px_6px_rgba(0,255,178,0.25)]
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando…" : ctaLabel}
          </button>
        </form>

        <div className="mt-3 flex justify-center">
          <label className="flex items-start gap-2 text-sm text-[#A1A1AA] max-w-3xl px-4 text-left">
            <input
              id="consent-checkbox"
              name="consent"
              ref={consentRef}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-[2px] h-4 w-4 shrink-0 rounded border-white/20 bg-transparent text-[#00FFB2] focus:ring-[#00FFB2]"
            />
            <span className="leading-snug">
              Aceito receber novidades do Spotted conforme{" "}
              <Link
                to="/privacidade"
                className="underline text-[#3FE0F5] hover:text-[#00FFB2]"
              >
                Política de Privacidade
              </Link>{" "}
              e{" "}
              <Link
                to="/termos"
                className="underline text-[#3FE0F5] hover:text-[#00FFB2]"
              >
                Termos de Uso
              </Link>
              .
            </span>
          </label>
        </div>

        {!isSimple && (
          <p className="mt-3 text-sm text-[#A1A1AA]">
            Não enviamos spam, só o melhor de SP ✨
          </p>
        )}

        {status && (
          <p
            className="mt-3 text-sm text-[#A1A1AA]"
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        )}
      </div>
    </section>
  );
}