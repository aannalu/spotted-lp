// src/components/common/Layout.tsx

import React from "react";
import Header from "./Header";  // ✅ AGORA não é circular!
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
  withFooter?: boolean;
  background?: string;
  className?: string;
};

const DEFAULT_BG = `
  radial-gradient(1400px 700px at 10% -10%, rgba(138,43,226,0.55), transparent 70%),
  radial-gradient(1000px 500px at 90% 20%, rgba(106,13,173,0.45), transparent 65%),
  radial-gradient(800px 400px at 50% 95%, rgba(75,0,130,0.35), transparent 60%),
  linear-gradient(180deg, #1A0329 0%, #2D0A45 100%)
`;

export default function Layout({ 
  children, 
  withFooter = true, 
  background, 
  className 
}: Props) {
  const bg = background ?? DEFAULT_BG;
  
  return (
    <div
      className={`min-h-screen text-[#F5F5F5] relative overflow-hidden ${className ?? ""}`}
      style={{ background: bg }}
    >
      <Header />
      <main>{children}</main>
      {withFooter && <Footer />}
    </div>
  );
}