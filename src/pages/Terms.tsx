// src/pages/Terms.tsx

import React from "react";
import Layout from "../components/common/Layout";
import { ChevronLeft } from "lucide-react"; // ✅ Substitui BackButton
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* ✅ Botão Voltar inline */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#00FFB2] transition mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h1 className="text-3xl font-bold tracking-tight">Termos de Uso</h1>
        <p className="mt-4 text-[#A1A1AA]">
          Bem-vindo ao <strong>Spotted</strong> — seu jeito fácil e divertido de descobrir os melhores rolês em São Paulo.
          Ao usar nosso site ou app, você concorda com as regras abaixo (sem juridiquês complicado, prometemos 👇).
        </p>

        <section className="mt-10 space-y-10">
          <article>
            <h2 className="text-xl font-semibold">1. Uso da plataforma</h2>
            <p className="mt-3 text-[#CFCFE3]">
              O Spotted sugere eventos, bares, restaurantes e experiências culturais com base no seu estilo.
              Você se compromete a usar a plataforma de forma legal e responsável, respeitando a lei e estes Termos.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">2. Conteúdo e parcerias</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Trabalhamos com parceiros locais pra trazer experiências incríveis. Mas atenção: preços, horários e lotação
              podem mudar sem aviso. O Spotted não garante disponibilidade ou qualidade de serviços de terceiros — nossa
              missão é te ajudar a descobrir, mas a escolha final é sempre sua 😉.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">3. Responsabilidades</h2>
            <p className="mt-3 text-[#CFCFE3]">
              O Spotted não se responsabiliza por problemas causados por falhas externas (como informações de parceiros
              que mudaram, lugares lotados ou indisponíveis). Você é quem decide onde ir e deve avaliar as condições de segurança do rolê.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">4. Alterações</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Podemos atualizar estes Termos para acompanhar melhorias no produto, mudanças na lei ou ajustes operacionais.
              Sempre que isso acontecer, a versão atualizada estará disponível aqui.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">5. Contato</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Ficou com dúvida? Fala com a gente:{" "}
              <a className="underline hover:text-white" href="mailto:contato@appspotted.com.br">
                contato@appspotted.com.br
              </a>.
            </p>
          </article>
        </section>

        <div className="mt-12 text-sm text-[#8E8EA0]">
          <span>Última atualização: {new Date().toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </Layout>
  );
}