/*
  # Create plants table and related schemas

  1. New Tables
    - `plants`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `species` (text)
      - `image` (text)
      - `health_score` (integer)
      - `last_watered` (timestamptz)
      - `next_watering` (timestamptz)
      - `location` (text)
      - `watering_frequency` (integer)
      - `light_requirement` (text)
      - `humidity` (text)
      - `temperature_min` (integer)
      - `temperature_max` (integer)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on plants table
    - Add policies for authenticated users to manage their own plants
*/

-- Create plants table
CREATE TABLE IF NOT EXISTS plants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  species text NOT NULL,
  image text NOT NULL,
  health_score integer NOT NULL DEFAULT 100,
  last_watered timestamptz NOT NULL,
  next_watering timestamptz NOT NULL,
  location text,
  watering_frequency integer NOT NULL,
  light_requirement text NOT NULL,
  humidity text NOT NULL,
  temperature_min integer NOT NULL,
  temperature_max integer NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own plants"
  ON plants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own plants"
  ON plants
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own plants"
  ON plants
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plants"
  ON plants
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_plants_updated_at
  BEFORE UPDATE ON plants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();