// src/components/landing/SocialProof.tsx

const validationSignals = [
  {
    emoji: "👥",
    stat: "1.200+",
    label: "Paulistanos na lista VIP",
    desc: "A galera já tá preparada pro lançamento",
  },
  {
    emoji: "📍",
    stat: "30+",
    label: "Bairros de SP cobertos",
    desc: "Do Centro à Zona Leste, curadoria em toda a cidade",
  },
  {
    emoji: "⭐",
    stat: "100%",
    label: "Personalizado",
    desc: "Algoritmo aprende com você e rankeia por match",
  },
];

const userQuestions = [
  {
    question: "Quando lança?",
    answer: "Em breve! Entre na lista pra ser avisado primeiro.",
  },
  {
    question: "É pago?",
    answer: "Grátis pra sempre. Recursos premium opcional depois.",
  },
  {
    question: "Funciona fora de SP?",
    answer: "Por enquanto só SP. RJ e BH vêm logo se der certo 🚀",
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl text-center">
        {/* Título e subtítulo */}
        <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
          A galera tá animada
        </h2>
        <p className="mt-4 text-lg text-[#A1A1AA] max-w-3xl mx-auto">
          E você ainda vai ficar de fora?
        </p>

        {/* Stats de validação */}
        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-3 mb-16">
          {validationSignals.map((signal, i) => (
            <StatCard key={i} {...signal} />
          ))}
        </div>

        {/* Perguntas frequentes (social proof disfarçada) */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-[#F5F5F5] text-2xl font-bold text-center mb-8">
            O que a galera tá perguntando
          </h3>
          <div className="space-y-4">
            {userQuestions.map((q, i) => (
              <QuestionCard key={i} {...q} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  emoji,
  stat,
  label,
  desc,
}: {
  emoji: string;
  stat: string;
  label: string;
  desc: string;
}) {
  return (
    <div
      className="
        relative rounded-2xl p-7 md:p-8 text-center
        bg-[#1b1140]
        border border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,.35)]
      "
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(0,255,178,0.1) 0%, transparent 60%)",
      }}
    >
      <div className="text-5xl mb-3">{emoji}</div>
      <div className="text-[#00FFB2] text-4xl font-bold mb-2">{stat}</div>
      <div className="text-[#F5F5F5] text-lg font-semibold mb-2">{label}</div>
      <p className="text-[#A1A1AA] text-sm">{desc}</p>
    </div>
  );
}

function QuestionCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div
      className="
        rounded-2xl p-5 md:p-6
        bg-[#1b1140]/60
        border border-white/10
      "
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">💬</span>
        <div className="text-left">
          <p className="text-[#F5F5F5] font-medium italic mb-1">
            "{question}"
          </p>
          <p className="text-[#A1A1AA] text-sm">→ {answer}</p>
        </div>
      </div>
    </div>
  );
}