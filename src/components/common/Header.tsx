// src/components/common/Header.tsx

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 backdrop-blur-md bg-[rgba(13,13,13,0.95)] border-b border-white/8">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/icons/logo-spotted.svg"
          alt="Spotted"
          className="h-6"
        />
      </Link>

      {/* Nav Desktop */}
      <nav className="hidden md:flex items-center gap-8 text-sm">
        <a href="#como-funciona" className="text-[#A1A1AA] hover:text-[#00FFB2] transition">
          Como funciona
        </a>
        <a href="#por-que" className="text-[#A1A1AA] hover:text-[#00FFB2] transition">
          Por que o Spotted?
        </a>
        <a href="#faq" className="text-[#A1A1AA] hover:text-[#00FFB2] transition">
          FAQ
        </a>
      </nav>

      {/* CTA */}
      <a
        href="#emailcapture"
        className="rounded-full bg-[#00FFB2] px-5 py-2 text-sm font-semibold text-[#0D0D0D] transition hover:scale-105"
      >
        Garantir acesso
      </a>
    </header>
  );
}