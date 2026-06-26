# Outly (working name)

A Brisbane events & experiences marketplace — Phase 0 starter shell.
This is a branded "coming soon" page that proves the whole pipeline works,
including a live API route at `/api/health`.

## Run it on your own computer (optional)

You need Node.js 18+ installed. Then, in this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see it. Visit http://localhost:3000/api/health
to confirm the server side works.

## Put it live (free, no domain needed)

1. Create a free GitHub account, then a new empty repository.
2. Upload these files into that repository (drag and drop in the GitHub
   "Add file → Upload files" screen — do NOT upload node_modules).
3. Go to vercel.com, sign in with GitHub, and "Import" that repository.
4. Click Deploy. Vercel installs everything and gives you a live
   `something.vercel.app` address.

That live address is your practice site. A real domain can be attached later.

## What's next

Phase 0, Step 3 adds the Supabase keys to `.env.local`.
Phase 1 builds the real discovery pages on top of the database seed
(`01_schema_and_seed.sql`).
