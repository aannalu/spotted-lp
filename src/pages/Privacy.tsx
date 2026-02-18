// src/pages/Privacy.tsx

import React from "react";
import Layout from "../components/common/Layout";
import { ChevronLeft } from "lucide-react"; // ✅ Substitui BackButton
import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* ✅ Botão Voltar inline */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#00FFB2] transition mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h1 className="text-3xl font-bold tracking-tight">Política de Privacidade</h1>
        <p className="mt-4 text-[#A1A1AA]">
          No <strong>Spotted</strong>, sua privacidade é prioridade. Aqui explicamos, sem enrolação,
          como coletamos, usamos e protegemos suas informações no site e no app.
        </p>

        <section className="mt-10 space-y-10">
          <article>
            <h2 className="text-xl font-semibold">1. Dados que coletamos</h2>
            <p className="mt-3 text-[#CFCFE3]">Coletamos só o necessário para entregar recomendações melhores:</p>
            <ul className="mt-3 space-y-2 text-[#CFCFE3] list-disc pl-5">
              <li><strong>Uso:</strong> páginas visitadas, cliques, buscas.</li>
              <li><strong>Dispositivo:</strong> modelo, sistema, navegador.</li>
              <li><strong>Localização aproximada:</strong> (com seu consentimento) para sugerir rolês perto de você.</li>
            </ul>
            <p className="mt-3 text-[#CFCFE3] font-semibold">Não vendemos seus dados pessoais. Ponto.</p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">2. Como usamos seus dados</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Usamos suas informações para personalizar recomendações, melhorar a experiência, prevenir fraudes
              e criar novos recursos. Também trabalhamos com dados agregados e anonimizados para análises internas
              e insights para parceiros, sempre dentro da lei.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">3. Base legal e consentimento (LGPD)</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Tratamos dados com bases previstas na LGPD (como consentimento e legítimo interesse),
              sempre oferecendo formas simples de você gerenciar suas preferências.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">4. Compartilhamento</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Podemos compartilhar dados com provedores de infraestrutura, analytics e integrações (ex.: mapas, autenticação),
              sempre sob contratos de segurança e confidencialidade. <strong>Nunca compartilhamos dados para venda a terceiros.</strong>
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">5. Seus direitos</h2>
            <ul className="mt-3 space-y-2 text-[#CFCFE3] list-disc pl-5">
              <li>Acessar e corrigir seus dados;</li>
              <li>Excluir sua conta e informações;</li>
              <li>Revogar consentimentos ou limitar tratamentos;</li>
              <li>Solicitar portabilidade e saber com quem seus dados foram compartilhados.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl font-semibold">6. Segurança</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Protegemos suas informações com criptografia, controle de acesso e monitoramento constante
              contra usos não autorizados.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">7. Retenção</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Guardamos os dados só pelo tempo necessário para cumprir esta política e exigências legais.
              Depois disso, eliminamos ou anonimizamos de forma segura.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">8. Cookies & similares</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Usamos cookies e tecnologias parecidas para lembrar preferências e medir desempenho.
              Você pode ajustar isso nas configurações do navegador ou nas preferências do site/app.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">9. Fale com a gente</h2>
            <p className="mt-3 text-[#CFCFE3]">
              Para exercer seus direitos ou tirar dúvidas, escreva para{" "}
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