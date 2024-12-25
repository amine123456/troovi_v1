/*
  # Create items table for lost and found items

  1. New Tables
    - `items`
      - `id` (uuid, primary key)
      - `owner_name` (text)
      - `email` (text)
      - `phone` (text)
      - `item_name` (text)
      - `description` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `items` table
    - Add policy for public read access to items
    - Add policy for authenticated users to create items
*/

CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  item_name text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Items are viewable by everyone"
  ON items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create items"
  ON items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);