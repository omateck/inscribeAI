/*
  # Initial Schema Setup for Inscribe AI

  1. New Tables
    - `content_items`: Stores all user-generated content
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `content` (text)
      - `type` (enum: article, social, email, product)
      - `user_id` (uuid, references auth.users)
      - `seo_score` (integer)
      - `status` (enum: draft, published)
      - `keywords` (text array)
    
    - `user_profiles`: Stores user profile and subscription data
      - `id` (uuid, primary key, references auth.users)
      - `created_at` (timestamp)
      - `full_name` (text)
      - `plan` (enum: free, basic, pro, enterprise)
      - `words_used` (integer)
      - `words_limit` (integer)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create content_items table
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL CHECK (type IN ('article', 'social', 'email', 'product')),
  user_id uuid REFERENCES auth.users NOT NULL,
  seo_score integer DEFAULT 0,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  keywords text[] DEFAULT ARRAY[]::text[]
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'pro', 'enterprise')),
  words_used integer DEFAULT 0,
  words_limit integer DEFAULT 1000
);

-- Enable RLS
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for content_items
CREATE POLICY "Users can create their own content"
  ON content_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own content"
  ON content_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own content"
  ON content_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);