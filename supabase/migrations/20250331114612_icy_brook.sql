/*
  # Wedding Website Database Schema

  1. New Tables
    - `rsvps`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `attending` (boolean)
      - `number_of_guests` (integer)
      - `dietary_requirements` (text)
      - `created_at` (timestamp)
    
    - `guest_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `message` (text)
      - `approved` (boolean)
      - `created_at` (timestamp)
    
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `photo_url` (text)
      - `caption` (text)
      - `approved` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - RSVPs: Users can create and read their own RSVPs
      - Guest Messages: Users can create messages, read approved messages
      - Gallery Photos: Users can upload photos, view approved photos
*/

-- Create RSVP table
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  attending boolean NOT NULL DEFAULT false,
  number_of_guests integer NOT NULL DEFAULT 0,
  dietary_requirements text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_guest_count CHECK (number_of_guests >= 0)
);

-- Create Guest Messages table
CREATE TABLE IF NOT EXISTS guest_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  message text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create Gallery Photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  photo_url text NOT NULL,
  caption text,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- RSVP Policies
CREATE POLICY "Users can create their own RSVPs"
  ON rsvps
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own RSVPs"
  ON rsvps
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Guest Messages Policies
CREATE POLICY "Users can create messages"
  ON guest_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view approved messages"
  ON guest_messages
  FOR SELECT
  USING (approved = true);

CREATE POLICY "Users can view their own messages"
  ON guest_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Gallery Photos Policies
CREATE POLICY "Users can upload photos"
  ON gallery_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view approved photos"
  ON gallery_photos
  FOR SELECT
  USING (approved = true);

CREATE POLICY "Users can view their own photos"
  ON gallery_photos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create storage bucket for gallery photos
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name)
  VALUES ('wedding-photos', 'wedding-photos')
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Set up storage policy for wedding photos
CREATE POLICY "Anyone can view wedding photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'wedding-photos');

CREATE POLICY "Authenticated users can upload wedding photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'wedding-photos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );