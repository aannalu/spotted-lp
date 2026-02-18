// supabase/functions/send-confirmation-email/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@3.2.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const SITE_URL = (Deno.env.get("SITE_URL") ?? "https://www.appspotted.com.br").replace(/\/$/, "");
const TEMPLATE_URL = Deno.env.get("TEMPLATE_URL"); // confirm.html público
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "Spotted <contato@appspotted.com.br>";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const j = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

const isEmail = (v: string) => /^[^\s@]+@[^\s@]{1,}\.[^\s@]{2,}$/.test(v);

async function renderTemplate(token: string) {
  if (!TEMPLATE_URL) throw new Error("Missing TEMPLATE_URL");
  const confirmUrl = `${SITE_URL}/api/confirm?token=${encodeURIComponent(token)}`;
  const r = await fetch(TEMPLATE_URL, { cache: "no-store" });
  if (!r.ok) throw new Error(`Template fetch failed: ${r.status} ${r.statusText}`);
  let html = await r.text();
  html = html.replaceAll("{{TOKEN}}", token).replaceAll("{{CTA_URL}}", confirmUrl);
  return { html, confirmUrl };
}

serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (req.method !== "POST") return j({ ok: false, error: "Method not allowed" }, 405);

    if (!SUPABASE_URL || !SERVICE_KEY) return j({ ok: false, error: "Missing SUPABASE_URL/SERVICE_KEY" }, 500);
    if (!RESEND_API_KEY) return j({ ok: false, error: "Missing RESEND_API_KEY" }, 500);

    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();
    if (!isEmail(email)) return j({ ok: false, error: "Invalid email" }, 400);

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // token válido por 48h
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString();

    // SELECT (limit 1) para evitar erro se houver duplicados
    const { data: existing, error: selErr } = await supabase
      .from("leads")
      .select("email")
      .eq("email", email)
      .limit(1)
      .maybeSingle();
    if (selErr) return j({ ok: false, error: `DB select failed: ${selErr.message ?? selErr}` }, 500);

    if (existing?.email) {
      const { error: updErr } = await supabase
        .from("leads")
        .update({
          confirmed: false,
          confirmed_at: null,
          confirmation_token: token,
          confirmation_expires: expires,
        })
        .eq("email", email);
      if (updErr) return j({ ok: false, error: `DB update failed: ${updErr.message ?? updErr}` }, 500);
    } else {
      const { error: insErr } = await supabase.from("leads").insert([
        {
          email,
          confirmed: false,
          confirmed_at: null,
          confirmation_token: token,
          confirmation_expires: expires,
        },
      ]);
      if (insErr) return j({ ok: false, error: `DB insert failed: ${insErr.message ?? insErr}` }, 500);
    }

    const { html, confirmUrl } = await renderTemplate(token);
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Confirme seu e-mail para entrar na lista ✨",
      html,
      text: `Confirme seu e-mail: ${confirmUrl}`,
      reply_to: "contato@appspotted.com.br",
    });

    return j({ ok: true }, 200);
  } catch (e: any) {
    const msg = String(e?.message || e).slice(0, 400);
    console.error("send-confirmation-email fatal:", msg);
    return j({ ok: false, error: msg }, 500);
  }
});
