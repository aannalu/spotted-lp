// supabase/functions/send-welcome/index.ts
// Envia e-mail de boas-vindas via Resend
// Requer secrets: RESEND_API_KEY, FROM_EMAIL (e opcional TEMPLATE_URL)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
serve(async (req)=>{
  if (req.method === "OPTIONS") {
    // Preflight CORS
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  try {
    const { email, name } = await req.json().catch(()=>({}));
    if (!email) {
      return new Response(JSON.stringify({
        ok: false,
        error: "email requerido"
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "Spotted <no-reply@resend.dev>";
    const TEMPLATE_URL = Deno.env.get("TEMPLATE_URL"); // opcional: HTML público no Storage
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({
        ok: false,
        error: "Falta RESEND_API_KEY"
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // Carrega HTML do template (opcional)
    let html = "";
    if (TEMPLATE_URL) {
      const t = await fetch(TEMPLATE_URL);
      html = await t.text();
    } else {
      // Template simples (troque depois pelo seu)
      html = `
        <div style="font-family:Inter,Arial,sans-serif">
          <h1>Bem-vindo ao Spotted 👋</h1>
          <p>Seu e-mail <strong>${email}</strong> foi adicionado à lista de espera.</p>
          <p>Em breve mandaremos novidades!</p>
        </div>
      `;
    }
    // Chamada HTTP direta à API da Resend (sem SDK, compatível com Deno)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [
          email
        ],
        subject: "Você entrou na lista do Spotted 🎉",
        html
      })
    });
    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({
        ok: false,
        error: text
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify({
      ok: true
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      ok: false,
      error: String(e)
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
