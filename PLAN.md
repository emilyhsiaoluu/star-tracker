# Star Tracker — Deployment Plan

## Overview
Convert React star tracker to a shareable Next.js app with persistent Supabase storage.

## Current App Definition
- **What this app does:** Tracks vacation reward stars for Emerson and Avery, with TV rewards that unlock every 5 stars.

## Core Features
- Title reads **Vacation Star Tracker**
- Each tapped star saves and shows the date it was earned in `M/D` format
- Stars unlock in batches of 5, up to a hard max of 20
- TV reward appears at 5, 10, 15, and 20 stars, getting bigger at each level
- After each reward tier, user can either reset or reveal the next 5 stars

## Tech Stack
- **Framework**: Next.js 16 (App Router, Server Components)
- **Database**: Supabase (`mfsurihnjrslnghlasvt.supabase.co`)
- **Hosting**: Vercel
- **Client**: React (reuse existing component logic)

## Supabase Setup
**Project**: mfsurihnjrslnghlasvt.supabase.co

**Table**: `startracker_stars`
```sql
CREATE TABLE startracker_stars (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  child_name TEXT NOT NULL UNIQUE, -- 'emerson' or 'avery'
  filled_stars INT[] NOT NULL DEFAULT '{}', -- array of star indices (0-4)
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_child CHECK (child_name IN ('emerson', 'avery'))
);
```

## Project Structure
```
star-tracker/
├── app/
│   ├── page.tsx           # Main app (StarTracker component)
│   ├── api/
│   │   └── stars/
│   │       ├── route.ts   # GET/PUT stars state
│   │       └── [child]/
│   │           └── route.ts # GET/PUT stars for specific child
│   └── layout.tsx
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── types.ts           # Types
├── components/
│   ├── PixelStar.tsx
│   ├── PixelCharizard.tsx
│   ├── PixelUnicorn.tsx
│   ├── RetroTV.tsx
│   ├── KidPanel.tsx
│   └── Particle.tsx
├── .env.local            # Supabase keys (local only)
├── vercel.json           # Vercel config
└── package.json
```

## Build Phases

### Phase 1: Scaffold Next.js project ✅ DONE
- [x] Create Next.js 16 project
- [x] Install dependencies (next, react, @supabase/supabase-js)
- [x] Set up Supabase client (`lib/supabase.ts`)
- [x] Create .env.local.example with Supabase keys template
- [x] Created tsconfig.json, next.config.ts, globals.css
- [x] Optimized Press Start 2P font via next/font (zero-CLS)

### Phase 2: Convert React component to Next.js ✅ DONE
- [x] Broke original `star-tracker.jsx` into separate component files:
  - `components/Particle.tsx` — particle explosion effect
  - `components/PixelStar.tsx` — clickable star (filled/empty)
  - `components/PixelCharizard.tsx` — fire-breathing animation
  - `components/PixelUnicorn.tsx` — rainbow particle animation
  - `components/RetroTV.tsx` — CRT TV display with scanlines
  - `components/KidPanel.tsx` — main kid panel with star tracking
- [x] Created main app page (`app/page.tsx`)
- [x] Created layout with font optimization (`app/layout.tsx`)
- [x] Wired up component tree with proper 'use client' directives

### Phase 3: Build API routes ✅ DONE
- [x] Created `app/api/stars/[child]/route.ts`:
  - GET: Fetch stars for a child (auto-create if not found)
  - PUT: Save/update stars for a child (upsert)
  - Handles params as async Promise (Next.js 16 requirement)
  - Validates child_name is 'emerson' or 'avery'

### Phase 4: Set up Supabase table ✅ DONE
- [x] Create `startracker_stars` table in Supabase dashboard
- [x] Run SQL from PLAN.md to create table schema
- [x] Set up Row-Level Security (public read/write for MVP)
- [x] Get Supabase URL + anon key
- [x] Copy keys to `.env.local` (from `.env.local.example`)

### Phase 5: Test locally ✅ DONE
- [x] Run `npm install` to ensure all deps installed
- [x] Run `npm run dev` to start local dev server
- [x] Verified app loads and responds to clicks

### Phase 6: Deploy to Vercel ✅ DONE
- [x] Create GitHub repo and push code
- [x] Create Vercel project (auto-linked on push)
- [x] Add Supabase env vars to Vercel dashboard
- [x] Fix TypeScript type errors
- [x] Deploy to production
- [x] App is live and working

## Status

### Supabase Project (PENDING)
- **Project URL**: https://mfsurihnjrslnghlasvt.supabase.co
- **Table Name**: `startracker_stars`
- **Status**: Table SQL defined in PLAN.md, NOT YET CREATED in Supabase
- **Next Step**: Emily must create this table in Supabase dashboard using SQL from above

### Environment Variables (PENDING)
- **Keys Needed**:
  - `NEXT_PUBLIC_SUPABASE_URL` — from Supabase > Settings > API
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase > Settings > API
- **Local File**: `.env.local.example` created; Emily copies to `.env.local` and fills in keys
- **Vercel**: Will be added to project settings during deployment

## Notes
- Existing `star-tracker.jsx` successfully refactored into modular components
- All API logic centralized in route handler (Supabase queries server-side only)
- Particle/animation logic unchanged from original—just moved to separate files
- Next.js 16 async params handled correctly
- Real-time sync: Currently polling on star changes; can add live subscriptions later if needed
