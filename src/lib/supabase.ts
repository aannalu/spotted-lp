import { createClient } from "@supabase/supabase-js";

const url  = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (import.meta.env.MODE !== "production" && (!url || !anon)) {
  throw new Error("Supabase: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env");
}

export const supabase = createClient(url!, anon!, { auth: { persistSession: false } });
