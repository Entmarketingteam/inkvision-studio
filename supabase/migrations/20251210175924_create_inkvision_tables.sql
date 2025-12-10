/*
  # InkVision Studio - Tattoo Design Portal Database Schema

  ## Overview
  Complete database schema for the InkVision tattoo design portal, including user profiles,
  design requests, generated images, reference uploads, and lead generation tracking.

  ## New Tables Created

  1. **profiles**
     - Links to Supabase auth.users
     - Stores user profile information (name, phone, role, avatar)
     - Role defaults to 'client' for regular users

  2. **design_requests**
     - Stores all tattoo design request details
     - Tracks concept, style preferences, mood, size, placement
     - Status tracking: submitted → generating → review → variations_requested → approved → stencil_ready → completed
     - Links to Notion for artist workflow

  3. **generated_images**
     - Stores AI-generated tattoo concept images
     - Tracks 4-image grids (grid_position 1-4)
     - Supports variations and upscales with parent_image_id tracking
     - Generation rounds for iteration tracking
     - Like and approval flags for client feedback

  4. **reference_images**
     - Stores client-uploaded reference images
     - Links to design requests

  5. **leads**
     - Email capture for lead generation
     - Tracks conversion to registered users
     - Source tracking for marketing analytics

  ## Security
  - Row Level Security enabled on all tables
  - Clients can only read/write their own data
  - Public can submit leads
  - All policies check authentication and ownership
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  role text DEFAULT 'client' NOT NULL CHECK (role IN ('client', 'artist', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create design_requests table
CREATE TABLE IF NOT EXISTS design_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  concept_description text NOT NULL,
  style text NOT NULL,
  mood text NOT NULL,
  background_style text,
  size text NOT NULL,
  placement text NOT NULL,
  additional_elements text,
  reference_notes text,
  personal_meaning text,
  status text DEFAULT 'submitted' NOT NULL CHECK (
    status IN ('submitted', 'generating', 'review', 'variations_requested', 'approved', 'stencil_ready', 'completed')
  ),
  notion_page_id text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE design_requests ENABLE ROW LEVEL SECURITY;

-- Create generated_images table
CREATE TABLE IF NOT EXISTS generated_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_request_id uuid REFERENCES design_requests(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  storage_path text NOT NULL,
  grid_position int CHECK (grid_position BETWEEN 1 AND 4),
  generation_round int DEFAULT 1 NOT NULL,
  parent_image_id uuid REFERENCES generated_images(id) ON DELETE SET NULL,
  goapi_task_id text,
  image_type text DEFAULT 'initial' NOT NULL CHECK (
    image_type IN ('initial', 'variation', 'upscale')
  ),
  is_liked boolean DEFAULT false NOT NULL,
  is_approved boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

-- Create reference_images table
CREATE TABLE IF NOT EXISTS reference_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_request_id uuid REFERENCES design_requests(id) ON DELETE CASCADE NOT NULL,
  storage_path text NOT NULL,
  file_name text NOT NULL,
  uploaded_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE reference_images ENABLE ROW LEVEL SECURITY;

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text,
  phone text,
  source text DEFAULT 'landing_page',
  interested_in text,
  converted_to_user boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Design requests policies
CREATE POLICY "Users can view own design requests"
  ON design_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own design requests"
  ON design_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own design requests"
  ON design_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Generated images policies
CREATE POLICY "Users can view images for own design requests"
  ON generated_images FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM design_requests
      WHERE design_requests.id = generated_images.design_request_id
      AND design_requests.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update images for own design requests"
  ON generated_images FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM design_requests
      WHERE design_requests.id = generated_images.design_request_id
      AND design_requests.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM design_requests
      WHERE design_requests.id = generated_images.design_request_id
      AND design_requests.user_id = auth.uid()
    )
  );

-- Reference images policies
CREATE POLICY "Users can view own reference images"
  ON reference_images FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM design_requests
      WHERE design_requests.id = reference_images.design_request_id
      AND design_requests.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own reference images"
  ON reference_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM design_requests
      WHERE design_requests.id = reference_images.design_request_id
      AND design_requests.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own reference images"
  ON reference_images FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM design_requests
      WHERE design_requests.id = reference_images.design_request_id
      AND design_requests.user_id = auth.uid()
    )
  );

-- Leads policies (public can submit)
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own lead if converted"
  ON leads FOR SELECT
  TO authenticated
  USING (
    converted_to_user = true
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = leads.email
      AND profiles.id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_design_requests_user_id ON design_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_design_requests_status ON design_requests(status);
CREATE INDEX IF NOT EXISTS idx_generated_images_design_request_id ON generated_images(design_request_id);
CREATE INDEX IF NOT EXISTS idx_generated_images_is_approved ON generated_images(is_approved);
CREATE INDEX IF NOT EXISTS idx_reference_images_design_request_id ON reference_images(design_request_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on design_requests
DROP TRIGGER IF EXISTS update_design_requests_updated_at ON design_requests;
CREATE TRIGGER update_design_requests_updated_at
  BEFORE UPDATE ON design_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();