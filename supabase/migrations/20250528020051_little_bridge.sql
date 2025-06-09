/*
  # Update profiles table

  1. Changes
    - Add username column (unique)
    - Add language column (default 'en')
    - Add location column
    - Add updated_at column with default timestamp
*/

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS username text UNIQUE,
ADD COLUMN IF NOT EXISTS language text DEFAULT 'en',
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();