/*
  # Update items table RLS policies

  1. Security Changes
    - Remove authenticated-only insert policy
    - Add public insert policy to allow anyone to create items
*/

-- Drop the existing authenticated-only policy
DROP POLICY IF EXISTS "Authenticated users can create items" ON items;

-- Create new public insert policy
CREATE POLICY "Anyone can create items"
  ON items
  FOR INSERT
  TO public
  WITH CHECK (true);