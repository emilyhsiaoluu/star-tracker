import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseKey);

let supabaseClient: SupabaseClient | null = null;

export function getSupabase() {
  if (!hasSupabaseEnv) {
    throw new Error(
      'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  return supabaseClient;
}

export interface StarTrackerRow {
  id: number;
  child_name: string;
  filled_stars: number[];
  star_notes: string[];
  updated_at: string;
}
