// src/components/landing/Security.tsx

import { Shield, FileText } from "lucide-react"; // ✅ Substitui SpottedIcons

export default function Security() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl text-center">
        {/* Título e subtítulo */}
        <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
          Privacidade? A gente leva a sério 🔒
        </h2>
        <p className="mt-4 text-lg text-[#A1A1AA] max-w-3xl mx-auto">
          Seus dados não viram meme corporativo
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:gap-8 md:grid-cols-2">
          {/* Bloco 1 */}
          <div
            className="rounded-2xl p-7 md:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
            style={{
              backgroundImage:
                "radial-gradient(500px 240px at 100% 0%, rgba(63,224,245,0.16), transparent 60%)," +
                "linear-gradient(180deg, rgba(27,17,64,1) 0%, rgba(22,14,52,1) 100%)",
            }}
          >
            <div className="flex items-start gap-5">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/5 border border-white/10">
                {/* ✅ Ícone do lucide-react */}
                <Shield className="w-7 h-7 text-[#3FE0F5]" />
              </div>
              <div className="text-left">
                <h3 className="text-[#F5F5F5] text-xl font-semibold">
                  A gente NÃO vende seus dados
                </h3>
                <p className="mt-2 text-[#A1A1AA]">
                  Ponto final. Eles servem só pra te recomendar rolês melhores.
                  Criptografia de ponta a ponta, zero vazamento.
                </p>
              </div>
            </div>
          </div>

          {/* Bloco 2 */}
          <div
            className="rounded-2xl p-7 md:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
            style={{
              backgroundImage:
                "radial-gradient(500px 240px at 0% 0%, rgba(106,13,173,0.18), transparent 60%)," +
                "linear-gradient(180deg, rgba(27,17,64,1) 0%, rgba(22,14,52,1) 100%)",
            }}
          >
            <div className="flex items-start gap-5">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/5 border border-white/10">
                {/* ✅ Ícone do lucide-react */}
                <FileText className="w-7 h-7 text-[#A64DFF]" />
              </div>
              <div className="text-left">
                <h3 className="text-[#F5F5F5] text-xl font-semibold">
                  Você escolhe o que compartilhar
                </h3>
                <p className="mt-2 text-[#A1A1AA]">
                  Não quer conectar Instagram? Sem problema, o app funciona do
                  mesmo jeito. LGPD compliant, transparência total.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}