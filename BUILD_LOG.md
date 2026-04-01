# Star Tracker — Build Log

*Track progress session by session. Keep recent entries; archive old ones.*

---

## Session 2 — Vacation Tracker Rewards Expansion
**Date**: 2026-04-01
**Status**: ✅ COMPLETE

### What We Changed
1. **Renamed the app**
   - Updated the on-page title to `Vacation Star Tracker`
   - Updated metadata and Open Graph title text so the browser/share preview matches

2. **Changed stars from simple on/off to dated rewards**
   - Reworked saved star data from a 5-slot boolean-style model into a 20-slot date-code model
   - Each filled star now shows the date it was earned in `M/D` format like `4/1` or `4/13`
   - Added backward compatibility for the old 5-star saved format so existing data still loads

3. **Added tiered reward progression**
   - Stars now unlock in batches of 5
   - After 5 stars, the first TV unlocks at 75% of the old size
   - Added `MORE STARS` so the next 5 stars appear after each completed tier
   - TV now grows at 10, 15, and 20 stars
   - Hard cap is now 20 stars

4. **Layout updates**
   - Switched stars into a compact grid so larger reward counts fit cleanly
   - Kept reset behavior, confetti, and reward sounds intact

5. **Character sounds**
   - Added a Charizard reward sound so Emerson now hears `rawr rawr rawr`
   - Avery keeps the existing `meow meow meow`

### Verification
- Ran `npm run build`
- Production build passed with TypeScript

### Next Step
- Open localhost and visually confirm the new 5-star-to-20-star flow feels right on mobile

## Session 1 — Scaffold & Component Refactor
**Date**: 2026-03-30
**Status**: ✅ COMPLETE

### What We Built
1. **Project Setup**
   - Created Next.js 16 project with TypeScript
   - Installed dependencies: next, react, react-dom, @supabase/supabase-js
   - Optimized Press Start 2P font via next/font for zero Cumulative Layout Shift (CLS)
   - Created config files: tsconfig.json, next.config.ts, .gitignore

2. **Component Refactoring** (from original star-tracker.jsx)
   - Split monolithic React component into 6 modular files:
     - `Particle.tsx` — particle explosion animation
     - `PixelStar.tsx` — star button (filled/empty with explosion)
     - `PixelCharizard.tsx` — Emerson's character with fire animation
     - `PixelUnicorn.tsx` — Avery's character with rainbow animation
     - `RetroTV.tsx` — CRT TV display with scanlines & control panel
     - `KidPanel.tsx` — main container (star grid, TV, reset button)
   - All components use 'use client' (client-side rendering for interactivity)
   - Preserved all original animations: particle effects, fire breath, rainbow sparkles, scanlines

3. **Main App**
   - Created `app/page.tsx` (Next.js App Router)
   - Created `app/layout.tsx` with font optimization
   - Created `app/globals.css` with @keyframes for animations
   - Layout imports Press Start 2P font via next/font (best practice)

4. **API Routes**
   - Created `app/api/stars/[child]/route.ts`
   - Implements GET: fetch stars for a child (auto-create row if not found)
   - Implements PUT: save/update stars (upsert pattern)
   - Handles Next.js 16 async params correctly
   - Validates child_name is 'emerson' or 'avery'
   - Returns StarTrackerRow type from Supabase

5. **Supabase Setup**
   - Created `lib/supabase.ts` with typed client
   - Created `lib/types.ts` (StarTrackerRow interface)
   - Created `.env.local.example` template for Supabase URL + anon key

### What's Left
1. **Manual Supabase Setup** (Emily's step)
   - Go to Supabase dashboard
   - Copy SQL from PLAN.md to create `startracker_stars` table
   - Copy URL + anon key from Settings > API to `.env.local`

2. **Local Testing**
   - Run `npm install` (to ensure all deps present)
   - Run `npm run dev`
   - Click stars, verify saves to Supabase
   - Test sync in two browser tabs

3. **GitHub & Vercel Deploy**
   - Create GitHub repo
   - Push code
   - Link to Vercel
   - Add env vars to Vercel dashboard
   - Deploy

### Known Issues
- None at this stage (pre-Supabase integration)

### Files Created This Session
```
app/
├── page.tsx
├── layout.tsx
├── globals.css
└── api/
    └── stars/
        └── [child]/
            └── route.ts
components/
├── Particle.tsx
├── PixelStar.tsx
├── PixelCharizard.tsx
├── PixelUnicorn.tsx
├── RetroTV.tsx
└── KidPanel.tsx
lib/
├── supabase.ts
tsconfig.json
next.config.ts
.gitignore
.env.local.example
PLAN.md (updated)
BUILD_LOG.md (this file)
```

### Progress Checklist
- [x] Next.js 16 scaffold complete
- [x] Components split into modules
- [x] All animations preserved
- [x] API routes built
- [x] Supabase client configured
- [x] Supabase table created
- [x] Local testing (dev server verified)
- [x] GitHub repo created
- [x] Vercel deployment complete
- [x] Environment variables configured
- [x] TypeScript type errors fixed
- [x] Production app LIVE

## Deployment Details

**GitHub**: https://github.com/emilyhsiaoluu/star-tracker
**Vercel Production**: https://star-tracker-two.vercel.app
**Supabase Project**: mfsurihnjrslnghlasvt.supabase.co
**Table**: startracker_stars

### How It Works
1. Kid opens app on any device
2. Clicks stars (1-5)
3. Stars save to Supabase in real-time
4. Other kid's device sees the same stars update
5. When all 5 stars filled → TV turns on with their character
6. Click RESET to clear stars
