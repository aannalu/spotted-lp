// src/components/landing/FAQ.tsx

import { useState } from "react";

const faqs = [
  {
    q: "É pago?",
    a: "Grátis pra sempre! A gente ganha com parcerias com os lugares, não com você.",
  },
  {
    q: "Funciona fora de São Paulo?",
    a: "Por enquanto só SP. Mas se der certo (e vai dar 🚀), Rio de Janeiro e Belo Horizonte são as próximas. Quer o Spotted na sua cidade? Entra na lista e fala pra gente!",
  },
  {
    q: "Como vocês escolhem os lugares?",
    a: "Combinação de curadoria manual (a gente vive SP a vida toda e testa TUDO) + algoritmo que aprende com o seu comportamento. Nada de lugar aleatório só porque pagou anúncio.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim! A gente NÃO vende seus dados. Eles servem só pra melhorar as recomendações. Criptografia de ponta, LGPD compliant, transparência total. Você escolhe o que compartilhar.",
  },
  {
    q: "Quando lança?",
    a: "Já lançou! Cadastra agora e em até 60 minutos você recebe o link de acesso por email. 84 lugares esperando por você.",
  },
  {
    q: "Preciso conectar minhas redes sociais?",
    a: "Não é obrigatório! Conectar Spotify/Instagram ajuda o algoritmo a entender melhor sua vibe, mas o app funciona mesmo sem isso. Você decide.",
  },
  {
    q: "Como é diferente do Google Maps ou Instagram?",
    a: "Google Maps te mostra TUDO (e você se perde). Instagram é bagunçado e demora horas. O Spotted rankeia lugares por compatibilidade com você + mostra só o essencial. 1 clique vs 40 minutos de pesquisa.",
  },
  {
    q: "Posso sugerir lugares?",
    a: "SIM! A gente quer a ajuda de quem respira SP. Depois que entrar, vai ter um botão pra sugerir lugares escondidos que você ama. Curadoria colaborativa é o futuro.",
  },
];

export default function FAQ() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
          Perguntas frequentes
        </h2>
        <p className="mt-4 text-lg text-[#A1A1AA] max-w-3xl mx-auto">
          Se a sua dúvida não tá aqui, manda DM no @spotted.sp
        </p>

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
        rounded-2xl border border-white/10 bg-[#1b1140]/60 
        shadow-[0_4px_12px_rgba(0,0,0,.25)]
        transition-all
      "
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="text-[#F5F5F5] font-semibold text-base md:text-lg group-hover:text-[#00FFB2] transition-colors">
          {question}
        </span>
        <span
          className={`
            text-[#00FFB2] text-2xl transition-transform shrink-0
            ${isOpen ? "rotate-45" : "rotate-0"}
          `}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-5 text-left text-[#A1A1AA] text-sm md:text-base leading-relaxed border-t border-white/10 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}