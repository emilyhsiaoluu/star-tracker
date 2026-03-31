-- Star Tracker table for Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE startracker_stars (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  child_name TEXT NOT NULL UNIQUE,
  filled_stars INT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_child CHECK (child_name IN ('emerson', 'avery'))
);

-- Enable Row-Level Security (allow public read/write for MVP)
ALTER TABLE startracker_stars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select" ON startracker_stars
  FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON startracker_stars
  FOR UPDATE USING (true);

CREATE POLICY "Allow public insert" ON startracker_stars
  FOR INSERT WITH CHECK (true);
