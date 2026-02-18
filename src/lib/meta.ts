// src/lib/meta.ts
import { getAttribution } from "./attribution";

function fbExist(): boolean { return typeof window !== "undefined" && !!(window as any).fbq; }

export function trackClickCTA(placement: "hero" | "sticky" | "footer") {
  if (!fbExist()) return;
  const attrs = getAttribution();
  (window as any).fbq("trackCustom", "ClickCTA", { placement, ...attrs });
}

export function trackFormVisible(formId: string) {
  if (!fbExist()) return;
  const attrs = getAttribution();
  (window as any).fbq("trackCustom", "FormVisible", { form_id: formId, ...attrs });
}

export function trackSignupStart(formId: string) {
  if (!fbExist()) return;
  const attrs = getAttribution();
  (window as any).fbq("trackCustom", "SignupStart", { form_id: formId, ...attrs });
}

export function trackLead(formId: string) {
  if (!fbExist()) return;
  const attrs = getAttribution();
  // Evento padrão (otimiza campanhas):
  (window as any).fbq("track", "Lead", { form_id: formId, ...attrs });
}

export function trackSignupError(formId: string, reason: string) {
  if (!fbExist()) return;
  const attrs = getAttribution();
  (window as any).fbq("trackCustom", "SignupError", { form_id: formId, reason, ...attrs });
}
