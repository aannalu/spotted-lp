// src/pages/Landing.tsx

import React from "react";
import Layout from "../components/common/Layout";
import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import WhySpotted from "../components/landing/WhySpotted";
import HowItWorks from "../components/landing/HowItWorks";
import SocialProof from "../components/landing/SocialProof";
import Security from "../components/landing/Security";
import FAQ from "../components/landing/FAQ";
import EmailCapture from "../components/landing/EmailCapture";

export default function Landing() {
  return (
    <Layout>
      <Hero />
      <ProblemSection />
      <WhySpotted />
      <HowItWorks />
      <SocialProof />
      <Security />
      <FAQ />
      
      <div className="relative">
        <div
          className="absolute inset-x-0 -top-20 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(27,17,64,0.4) 100%)",
          }}
        />
        <EmailCapture
          variant="full"
          ctaLabel="Garantir meu acesso VIP"
          className="bg-gradient-to-br from-[#1b1140] to-[#0D0D0D]"
        />
      </div>
    </Layout>
  );
}