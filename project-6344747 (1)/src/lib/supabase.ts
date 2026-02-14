import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Model {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}
