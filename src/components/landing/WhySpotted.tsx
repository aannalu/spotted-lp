// src/components/landing/WhySpotted.tsx

import { Star, Map, Zap, Users } from "lucide-react"; // ✅ Substitui SpottedIcons

export default function WhySpotted() {
  const items = [
    {
      icon: <Star className="w-7 h-7 text-[#FACC15]" />, // ✅ CrystalBall → Star (Amarelo)
      title: "Recomendações certeiras",
      desc: "IA + humanos, pra acertar no primeiro clique",
    },
    {
      icon: <Map className="w-7 h-7 text-[#3FE0F5]" />, // ✅ CityHidden → Map (Ciano)
      title: "Lugares escondidos de SP",
      desc: "Do hype ao underground, tudo no mesmo app",
    },
    {
      icon: <Zap className="w-7 h-7 text-[#00FFB2]" />, // ✅ LightningAllInOne → Zap (Verde)
      title: "Tudo em um só lugar",
      desc: "Agenda, filtros, mapa, listas e salva-rolê",
    },
    {
      icon: <Users className="w-7 h-7 text-[#A64DFF]" />, // ✅ HandshakeSP → Users (Roxo)
      title: "De SP para SP",
      desc: "Feito por quem vive a cidade, pra quem ama viver a cidade",
    },
  ];

  return (
    <section id="por-que" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl text-center">
        {/* Título e subtítulo */}
        <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
          Por que escolher o Spotted?
        </h2>
        <p className="mt-4 text-lg text-[#A1A1AA] max-w-3xl mx-auto">
          Descubra a cidade com nossa curadoria + IA
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <FeatureCard key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 border border-white/10 bg-[#1b1140] shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform hover:scale-[1.02]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(106,13,173,0.15) 0%, transparent 60%)",
      }}
    >
      {/* Ícone */}
      <div className="flex justify-start mb-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 border border-white/10">
          {icon}
        </div>
      </div>

      {/* Texto */}
      <h3 className="text-[#F5F5F5] text-lg font-semibold text-left mb-2">
        {title}
      </h3>
      <p className="text-[#A1A1AA] text-sm text-left leading-relaxed">
        {desc}
      </p>
    </div>
  );
}