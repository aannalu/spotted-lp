// src/components/landing/EmailCapture.tsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const FN_URL =
  "https://kmxnfnffaaztywuijjvo.supabase.co/functions/v1/send-signup-link";

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

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; email: string }
  | { kind: "redirect"; email: string }
  | { kind: "error"; message: string };

export default function EmailCapture({
  variant = "full",
  withId = true,
  ctaLabel = "Acessar agora (grátis)",
  className = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>({ kind: "idle" });
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

  const resetForm = () => {
    setState({ kind: "idle" });
    setEmail("");
    setConsent(false);
  };

  const handleResend = async () => {
    if (state.kind !== "success") return;
    // Reenvia pro mesmo email sem voltar pro idle
    setState({ kind: "loading" });
    await submitEmail(state.email);
  };

  const submitEmail = async (normalizedEmail: string) => {
    if (fbqExists()) {
      (window as any).fbq("trackCustom", "SignupStart", {
        form_id: "email_capture",
        location: "landing",
        ...getUTMs(),
      });
    }

    try {
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtteG5mbmZmYWF6dHl3dWlqanZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTgzNDAsImV4cCI6MjA3MTQ3NDM0MH0.209vsDacXrQSWVrkXsMyqGFwCyiKYD_0qVJG4eXcKVw",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          utm: Object.fromEntries(new URLSearchParams(window.location.search)),
          referer: document.referrer || undefined,
        }),
      });

      const json = (await res.json().catch(() => ({}))) as any;

      if (json.action === "redirect_to_login") {
        setState({ kind: "redirect", email: normalizedEmail });
        setTimeout(() => {
          window.location.href = "https://appspotted.com.br/#/login";
        }, 2000);
        return;
      }

      if (!res.ok) {
        console.error("send-signup-link error:", json);
        if (res.status === 400 && json?.error?.includes("Domínio")) {
          setState({
            kind: "error",
            message:
              "Esse email não parece válido. Confere se digitou certinho?",
          });
        } else {
          setState({
            kind: "error",
            message: "Erro ao enviar o e-mail. Tenta de novo?",
          });
        }
        return;
      }

      if (fbqExists()) {
        (window as any).fbq("track", "Lead", {
          form_id: "email_capture",
          location: "landing",
          ...getUTMs(),
        });
      }

      (window as any).gtag?.("event", "lead_submit", { method: "lp" });
      (window as any).posthog?.capture?.("lead_submitted", { source: "lp" });

      setState({ kind: "success", email: normalizedEmail });

      setCooldown(true);
      setTimeout(() => setCooldown(false), 2000);
    } catch (err) {
      console.error(err);
      setState({
        kind: "error",
        message: "Erro de conexão. Tenta de novo?",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;

    if (!isValidEmail(email)) {
      setState({ kind: "error", message: "Digite um e-mail válido." });
      return;
    }
    if (!consent) {
      setState({
        kind: "error",
        message: "Você precisa aceitar os termos para continuar.",
      });
      consentRef.current?.focus();
      return;
    }

    const normalized = email.trim().toLowerCase();
    setState({ kind: "loading" });
    await submitEmail(normalized);
  };

  const wrapperClasses = [
    isSimple
      ? ""
      : "relative overflow-hidden px-6 py-20 sm:py-28 scroll-mt-24",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isSuccess = state.kind === "success" || state.kind === "redirect";
  const isLoading = state.kind === "loading";
  const isError = state.kind === "error";

  return (
    <section
      ref={sectionRef}
      id={withId ? "emailcapture" : undefined}
      className={wrapperClasses}
    >
      <div className={isSimple ? "" : "mx-auto max-w-2xl text-center"}>
        {!isSimple && !isSuccess && (
          <>
            <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
              Pronto pra descobrir os melhores lugares de SP?
            </h2>
            <p className="mt-4 text-lg text-[#A1A1AA]">
              <span className="text-[#00FFB2] font-semibold">
                +100 lugares curados
              </span>{" "}
              esperando por você. Acesso em até 60 minutos por email.
            </p>
          </>
        )}

        {/* ESTADO DE SUCESSO — substitui o form */}
        {isSuccess && (
          <div
            role="status"
            aria-live="polite"
            className={
              (isSimple ? "" : "mt-8") +
              " mx-auto max-w-xl rounded-3xl border border-[#00FFB2]/30 bg-[#00FFB2]/[0.06] p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500"
            }
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#00FFB2]/15">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00FFB2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {state.kind === "redirect"
                  ? "Você já tem conta! ✨"
                  : "Link enviado pro seu email! ✨"}
              </h3>

              <p className="text-base text-white/80 max-w-sm">
                {state.kind === "redirect"
                  ? "Redirecionando pro login em instantes..."
                  : "Abre sua caixa de entrada pra acessar o Spotted."}
              </p>

              {state.kind === "success" && (
                <>
                  <p className="text-sm text-white/60 flex items-center gap-2">
                    <span>👀</span>
                    <span>não achou? dá uma olhada no spam também</span>
                  </p>

                  <div className="mt-2 px-4 py-2 rounded-full text-sm bg-white/[0.08] text-white/90">
                    enviado pra{" "}
                    <span className="font-semibold">{state.email}</span>
                  </div>

                  <div className="flex gap-4 mt-4 text-sm">
                    <button
                      onClick={handleResend}
                      className="text-[#00FFB2] underline hover:opacity-80 transition-opacity"
                    >
                      não recebi, reenviar
                    </button>
                    <span className="text-white/30">•</span>
                    <button
                      onClick={resetForm}
                      className="text-white/60 underline hover:text-white/90 transition-colors"
                    >
                      usar outro email
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* FORMULÁRIO — esconde quando success */}
        {!isSuccess && (
          <>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isError) setState({ kind: "idle" });
                }}
                placeholder="Digite seu melhor e-mail"
                disabled={isLoading}
                className="w-full flex-1 rounded-full border border-white/20 bg-[#0D0D0D]/60 px-5 py-3 text-[#F5F5F5] placeholder-[#A1A1AA] focus:border-[#00FFB2] focus:ring-2 focus:ring-[#00FFB2] outline-none max-w-[680px] disabled:opacity-60"
                required
                aria-label="E-mail"
                inputMode="email"
                autoComplete="email"
              />

              <button
                type="submit"
                disabled={isLoading || cooldown}
                aria-disabled={!consent}
                className="rounded-full bg-[#00FFB2] px-6 py-3 font-semibold text-[#0D0D0D]
                       transition hover:scale-[1.03] hover:shadow-[0_0_32px_6px_rgba(0,255,178,0.25)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 min-w-[180px]"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeOpacity="0.25"
                        strokeWidth="3"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  ctaLabel
                )}
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
                100% grátis pra sempre. Não enviamos spam ✨
              </p>
            )}

            {/* ERRO — card discreto mas visível */}
            {isError && (
              <div
                role="alert"
                aria-live="assertive"
                className="mt-4 mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-500/10 p-4 animate-in fade-in duration-300"
              >
                <p className="text-sm text-white/90 text-center">
                  ⚠️ {state.message}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}