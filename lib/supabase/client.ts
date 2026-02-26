import { createClient } from "@supabase/supabase-js";

// Setup Supabase Client
// Digunakan hanya untuk simulasi environment setup seperti yang diminta pada requirement.
// Belum digunakan langsung oleh komponen bisnis (karena pakai localStorage).

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
