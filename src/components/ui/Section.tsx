// src/components/ui/Section.tsx

import React from "react";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  center?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  center = false,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-6 py-20 sm:py-28 scroll-mt-24 ${className}`}
    >
      <div className={`mx-auto max-w-7xl ${center ? "text-center" : ""}`}>
        {title && (
          <h2 className="font-bold text-[32px] sm:text-[40px] text-[#F5F5F5]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-4 text-lg text-[#A1A1AA] max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}