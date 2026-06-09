-- Star Tracker table for Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE startracker_stars (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  child_name TEXT NOT NULL UNIQUE,
  filled_stars INT[] NOT NULL DEFAULT '{}',
  star_notes TEXT[] NOT NULL DEFAULT '{}', -- "what you did" note per star, parallel to filled_stars
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_child CHECK (child_name IN ('emerson', 'avery'))
);

-- If the table already exists, add the notes column:
-- ALTER TABLE startracker_stars ADD COLUMN IF NOT EXISTS star_notes TEXT[] NOT NULL DEFAULT '{}';

-- Enable Row-Level Security (allow public read/write for MVP)
ALTER TABLE startracker_stars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select" ON startracker_stars
  FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON startracker_stars
  FOR UPDATE USING (true);

CREATE POLICY "Allow public insert" ON startracker_stars
  FOR INSERT WITH CHECK (true);
