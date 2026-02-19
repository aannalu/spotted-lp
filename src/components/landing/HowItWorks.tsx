// src/components/landing/HowItWorks.tsx

const steps = [
  {
    step: "1",
    title: "Você conta o que curte",
    desc: "3 minutos pra contar sua vibe. Seleciona músicas, tipos de lugar e culinária favoritos.",
    screenshot: "/images/onboarding-music.webp",
  },
  {
    step: "2",
    title: "A IA aprende com você",
    desc: "O algoritmo analisa suas escolhas e rankeia lugares por compatibilidade com você.",
    screenshot: "/images/feed-grid.webp",
  },
  {
    step: "3",
    title: "Saiba o que importa.",
    desc: "Tudo o que você precisa saber para escolher o seu próximo destino. Simples assim.",
    screenshot: "/images/role-detail.webp",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
          Como funciona?
        </h2>
        <p className="mt-4 text-lg text-[#A1A1AA] max-w-3xl mx-auto">
          Em 3 passos você começa a montar rolês sob medida
        </p>

        {/* Linha conectora (desktop) */}
        <div className="relative hidden md:block mx-auto max-w-5xl mt-12">
          <div className="pointer-events-none absolute top-12 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#6A0DAD66] via-[#3FE0F5AA] to-[#00FFB266]" />
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8 mx-auto max-w-5xl">
          {steps.map((s, i) => (
            <StepCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  title,
  desc,
  screenshot,
}: {
  step: string;
  title: string;
  desc: string;
  screenshot: string;
}) {
  return (
    <div className="relative">
      {/* Screenshot do app */}
      {screenshot && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,.4)] group h-[430px]">
  <img
    src={screenshot}
    alt={title}
    className="w-full h-full object-cover object-bottom"
    loading="lazy"
  />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* ✅ SÓ A BADGE "Passo X" - SEM CÍRCULO */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold border border-[#00FFB2]/30 bg-[#00FFB2]/10 mb-3">
          <span className="text-[#00FFB2]">Passo {step}</span>
        </div>
        
        <h3 className="text-[#F5F5F5] text-lg md:text-xl font-semibold">
          {title}
        </h3>
        <p className="mt-2 text-[#A1A1AA] text-sm md:text-base leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}