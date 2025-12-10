import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  avatar_url: string | null;
  created_at: string;
};

export type DesignRequest = {
  id: string;
  user_id: string;
  concept_description: string;
  style: string;
  mood: string;
  background_style: string | null;
  size: string;
  placement: string;
  additional_elements: string | null;
  reference_notes: string | null;
  personal_meaning: string | null;
  status: 'submitted' | 'generating' | 'review' | 'variations_requested' | 'approved' | 'stencil_ready' | 'completed';
  notion_page_id: string | null;
  created_at: string;
  updated_at: string;
};

export type GeneratedImage = {
  id: string;
  design_request_id: string;
  image_url: string;
  storage_path: string;
  grid_position: number | null;
  generation_round: number;
  parent_image_id: string | null;
  goapi_task_id: string | null;
  image_type: 'initial' | 'variation' | 'upscale';
  is_liked: boolean;
  is_approved: boolean;
  created_at: string;
};
