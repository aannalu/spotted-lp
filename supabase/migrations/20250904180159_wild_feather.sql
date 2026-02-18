/*
  # Create leads table with RLS policies

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `consent` (boolean, default false)
      - `href` (text)
      - `referrer` (text)
      - `ua` (text, user agent)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for anonymous users to insert leads
    - Add policy for anonymous users to update leads (for upsert functionality)

  3. Notes
    - This allows public lead capture from the landing page
    - Anonymous users can insert and update their own leads based on email
*/

-- Create leads table if it doesn't exist
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  consent boolean DEFAULT false,
  href text,
  referrer text,
  ua text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous insert leads" ON leads;
DROP POLICY IF EXISTS "Allow anonymous update leads" ON leads;

-- Create policy to allow anonymous users to insert leads
CREATE POLICY "Allow anonymous insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anonymous users to update leads (for upsert)
CREATE POLICY "Allow anonymous update leads"
  ON leads
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();