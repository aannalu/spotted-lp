// src/lib/attribution.ts
export type Attribution = Partial<{
  utm_source: string; utm_medium: string; utm_campaign: string;
  utm_content: string; utm_term: string; fbclid: string; gclid: string;
}>;

const KEY = "spotted_attribution_v1";

export function captureAttributionFromURL() {
  const p = new URLSearchParams(location.search);
  const attrs: Attribution = {};
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","gclid"]
    .forEach(k => { const v = p.get(k); if (v) (attrs as any)[k] = v; });
  if (Object.keys(attrs).length) localStorage.setItem(KEY, JSON.stringify(attrs));
}

export function getAttribution(): Attribution {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
