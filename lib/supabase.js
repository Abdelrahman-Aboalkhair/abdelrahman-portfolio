import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://nysuxwjmghbjrqlcsbzo.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55c3V4d2ptZ2hianJxbGNzYnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3Mjc1MzUsImV4cCI6MjA3NDMwMzUzNX0.xET_TZf6ICgCbwbwo0nX5lF5vusnao6pGJAMh8B2siw";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
