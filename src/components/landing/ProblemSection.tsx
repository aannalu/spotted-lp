// src/components/landing/ProblemSection.tsx
import React from "react";

const painPoints = [
  {
    emoji: "🕐",
    title: "Perde tempo pesquisando",
    desc: "40 minutos no Google/Instagram só pra achar UM lugar que parece legal",
  },
  {
    emoji: "😰",
    title: "Chega e não bate",
    desc: "Fotos lindas no Insta, mas ao vivo é totalmente diferente da sua vibe",
  },
  {
    emoji: "📍",
    title: "Não sabe o que rola perto",
    desc: "Aquele bar incrível a 5 min de casa? Você nunca vai descobrir sozinho",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
          Conhece a cena?
        </h2>
        <p className="mt-4 text-lg text-[#A1A1AA] max-w-3xl mx-auto">
          É sempre a mesma história quando você quer sair em SP...
        </p>

        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-3">
          {painPoints.map((pain, i) => (
            <PainCard key={i} {...pain} />
          ))}
        </div>

        {/* Transição pra solução */}
        <div className="mt-12 text-center">
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            A gente resolveu isso.{" "}
            <span className="text-[#00FFB2] font-semibold">
              O Spotted aprende com você
            </span>{" "}
            e mostra só lugares que batem com a sua vibe. Sem perder tempo, sem
            erro.
          </p>
        </div>
      </div>
    </section>
  );
}

function PainCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="
        relative rounded-2xl p-7 md:p-8 
        bg-[#1b1140] 
        border border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,.35)]
        transition-transform hover:scale-[1.02]
      "
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, rgba(255,92,92,0.1) 0%, transparent 50%)",
      }}
    >
      {/* Emoji grande */}
      <div className="text-5xl mb-4">{emoji}</div>

      {/* Título */}
      <h3 className="text-[#F5F5F5] text-xl font-semibold mb-2">{title}</h3>

      {/* Descrição */}
      <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
    </div>
  );
}