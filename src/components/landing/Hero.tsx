// src/components/landing/Hero.tsx

import React from "react";
import EmailCapture from "./EmailCapture";

export default function Hero() {
  const heroSrc = `${import.meta.env.BASE_URL}images/hero-neon-trails.webp`;
  
  return (
    <section
      className="relative -mt-[64px] sm:-mt-[80px] pt-[88px] sm:pt-[80px] h-screen min-h-[820px] md:min-h-[920px] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroSrc})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/85 via-[#0D0D0D]/70 to-[#0D0D0D]/85"
        aria-hidden
      />
      
      <div className="relative z-10 mx-auto w-full px-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-bold text-[#F5F5F5] [font-family:'Space_Grotesk',sans-serif] text-[32px] leading-[1.15] sm:text-[48px] sm:leading-tight md:text-[60px] md:leading-tight">
            Cansou de perder <span className="text-[#FF5C5C]">1 hora</span> no
            Google pra achar um rolê que{" "}
            <span className="text-[#00FFB2]">combina com você?</span>
          </h1>
          
          <p className="mt-4 text-[16px] sm:text-[18px] md:text-[20px] text-[#F5F5F5] px-2">
            <span className="text-[#00FFB2] font-semibold">84 lugares curados a dedo</span>{" "}
            + algoritmo de match = do café da manhã ao drink da madrugada.{" "}
            <span className="text-[#3FE0F5] font-semibold">
              Acesso imediato e grátis pra sempre.
            </span>
          </p>
          
          {/* ❌ REMOVIDO: Social proof dos 17 usuários */}
          
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-sm text-[#F5F5F5] backdrop-blur-md">
              <span className="text-[#FACC15]">⚡</span>
              <span>3 minutos pra configurar</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-sm text-[#F5F5F5] backdrop-blur-md">
              <span className="text-[#00FFB2]">🎯</span>
              <span>Ranking personalizado por match</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-sm text-[#F5F5F5] backdrop-blur-md">
              <span className="text-[#3FE0F5]">🏙️</span>
              <span>84 lugares curados</span>
            </div>
          </div>
          
          <div className="mt-8 max-w-2xl mx-auto px-2" id="emailcapture">
            <EmailCapture
              variant="simple"
              ctaLabel="Acessar agora (grátis)"
            />
          </div>
          
          <p className="mt-3 text-sm text-[#E5E5E5] px-4">
            <span className="text-[#00FFB2] font-semibold">100% grátis pra sempre.</span>{" "}
            Acesso imediato em até 60 minutos (link por email) 🚀
          </p>
        </div>
      </div>
    </section>
  );
}