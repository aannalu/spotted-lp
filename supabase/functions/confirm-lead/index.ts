import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@3.2.0";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const SITE_URL = (Deno.env.get("SITE_URL") ?? "https://www.appspotted.com.br").replace(/\/$/, "");
const WELCOME_TEMPLATE_URL = Deno.env.get("WELCOME_TEMPLATE_URL") ?? Deno.env.get("TEMPLATE_WELCOME_URL");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "Spotted <contato@appspotted.com.br>";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
const redirect = (to)=>new Response(null, {
    status: 302,
    headers: {
      Location: to
    }
  });
async function fetchTemplate(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Template fetch failed: ${r.status}`);
  return await r.text();
}
serve(async (req)=>{
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") ?? "";
    if (!token) return redirect(`${SITE_URL}/confirm?status=missing`);
    // precisamos do email para enviar o welcome
    const { data: lead, error } = await supabase.from("leads").select("email, confirmation_expires").eq("confirmation_token", token).maybeSingle();
    if (error || !lead) return redirect(`${SITE_URL}/confirm?status=invalid`);
    const expires = lead.confirmation_expires ? new Date(lead.confirmation_expires) : null;
    if (!expires || expires.getTime() < Date.now()) {
      return redirect(`${SITE_URL}/confirm?status=expired`);
    }
    // confirma e invalida o token
    await supabase.from("leads").update({
      confirmed: true,
      confirmed_at: new Date().toISOString(),
      confirmation_token: null,
      confirmation_expires: null
    }).eq("confirmation_token", token);
    // dispara o welcome (se secrets estiverem corretos)
    if (RESEND_API_KEY && WELCOME_TEMPLATE_URL && lead.email) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        const html = await fetchTemplate(WELCOME_TEMPLATE_URL);
        await resend.emails.send({
          from: FROM_EMAIL,
          to: lead.email,
          subject: "Você tá dentro da lista do Spotted! 🎉",
          html
        });
      } catch (e) {
        // não quebra a UX: só segue o redirect e loga o erro
        console.error("Erro ao enviar welcome:", e);
      }
    }
    return redirect(`${SITE_URL}/confirmado`);
  } catch (e) {
    console.error(e);
    // em caso de erro inesperado, volta para a tela de erro genérico
    return redirect(`${SITE_URL}/confirm?status=invalid`);
  }
});
