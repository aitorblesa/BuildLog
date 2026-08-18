# BuildLog — Frontend Career OS

A personal, mobile-first web app to fight procrastination and track a transition
into modern frontend web development. Built with Astro, TypeScript, Tailwind CSS,
and React (islands only, for the session timer and coach chat).

## What it does

- **Today** — one task, one `START SESSION` button. Reduces the gap between
  opening the app and starting a 25-minute focused session.
- **Session mode** — a distraction-free timer with pause/finish, a completion
  note, and a generated session receipt (checksum included) once saved.
- **Roadmap** — 7 phases (JS/TS/React → Next.js → Testing → Vue → Backend →
  SQL → Professional Frontend), each with skills and tasks.
- **Progress** — manual skill states (`NOT STARTED` → `INTERVIEW READY`), a
  daily log of completed sessions, and a weekly review form.
- **Career** — the "Road to 40–50K" view (current phase, gaps, next milestone),
  editable milestones (M01–M10), a 3-project portfolio outline, and an offline
  local "career coach" stub (see below).

## Persistence

Everything is stored in `localStorage` behind a `repositories/` layer
(`SessionRepository`, `ProgressRepository`, `SettingsRepository`, `ReviewRepository`,
`ActiveSessionRepository`), so the app never touches `window.localStorage` directly
from a component. This makes it straightforward to later swap the storage layer
for Supabase/Postgres or a custom API without touching feature code.

## AI coaching

`src/lib/ai/CareerCoach.ts` defines a `CareerCoach` interface and a
`buildCoachContext()` helper that grounds prompts in real progress data
(current phase, next task, weekly stats). `LocalCareerCoach` is a deterministic,
fully offline implementation used today. Wiring in a real model later means
implementing the same interface — no other code changes.

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm run dev`       | Start the local dev server (`localhost:4321`) |
| `npm run build`     | Type-generate + build to `./dist/`           |
| `npm run preview`   | Preview the production build locally         |
| `npm run check`     | Type-check the whole project (`astro check`) |

## PWA

The app ships a `manifest.webmanifest`, app icons, and a minimal service worker
(`public/sw.js`) that caches the app shell for offline use. On iPhone, use
Share → **Add to Home Screen** to install it in standalone mode.
