import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";

/** Tracking seguro: só dispara se gtag/fbq existirem */
function trackSocialClick(network) {
  try {
    // GA4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click_social", {
        social_network: network,
        location: "footer",
      });
    }
    // Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "ClickSocial", {
        social_network: network,
        location: "footer",
      });
    }
  } catch (_) {}
}

/** (Opcional) UTM – útil quando o destino é seu próprio site.
 * Em links para perfis de redes sociais, normalmente o UTM é ignorado pelo destino,
 * então o evento de clique acima costuma ser mais efetivo.
 */
const UTM = "utm_source=site&utm_medium=footer&utm_campaign=social";
const IG_URL = `https://www.instagram.com/app_spotted/?${UTM}`;
const TT_URL = `https://www.tiktok.com/@appspotted?${UTM}`;
const IN_URL = `https://www.linkedin.com/company/app-spotted?${UTM}`;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#A1A1AA]">
        <span>© {new Date().getFullYear()} Spotted</span>

        {/* Links + Redes sociais */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Links internos */}
          <nav className="flex gap-6" aria-label="Links institucionais">
            <Link
              to="/termos"
              className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE0F5] rounded"
              title="Termos de Uso"
            >
              Termos de Uso
            </Link>
            <Link
              to="/privacidade"
              className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE0F5] rounded"
              title="Política de Privacidade"
            >
              Privacidade
            </Link>
            <a
              href="mailto:contato@appspotted.com.br"
              className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE0F5] rounded"
              title="Contato por e-mail"
            >
              Contato
            </a>
          </nav>

          {/* Redes sociais */}
          <div className="flex gap-4 text-2xl" aria-label="Redes sociais do Spotted">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Spotted"
              title="@app_spotted no Instagram"
              onClick={() => trackSocialClick("instagram")}
              className="text-[#00FFB2] hover:text-[#3FE0F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE0F5] rounded"
            >
              <FaInstagram aria-hidden="true" />
            </a>
            <a
              href={TT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok do Spotted"
              title="@appspotted no TikTok"
              onClick={() => trackSocialClick("tiktok")}
              className="text-[#00FFB2] hover:text-[#3FE0F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE0F5] rounded"
            >
              <FaTiktok aria-hidden="true" />
            </a>
            <a
              href={IN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn do Spotted"
              title="Spotted no LinkedIn"
              onClick={() => trackSocialClick("linkedin")}
              className="text-[#00FFB2] hover:text-[#3FE0F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FE0F5] rounded"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
