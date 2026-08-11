# Quizzical

Quizzical is a compact single-page quiz application originally built following Scrimba's "Learn React" course. It fetches multiple-choice questions from the Open Trivia Database and provides a simple, extensible Admin area for managing sources and questions.

Live demo: https://quizzical-mote.netlify.app/

## Features
- Take randomized multiple-choice quizzes from Open Trivia DB
- Immediate feedback, scoring, and results view
- Admin section for managing APIs, questions, and repositories
- Client-side state using React Contexts and adapters for API data

## Tech stack
- React 18 + Vite
- Routing: `react-router-dom`
- Utilities: `html-entities`, `nanoid`
- Dev: ESLint, Vite, React SWC plugin

## Project structure (high level)
- `src/pages` — app pages (Public + Admin)
- `src/layouts` — layout components
- `src/context` — React Context providers (Admin/Public)
- `src/services` — API clients and domain services
- `src/adaptors` — adapters to normalize external API data
- `src/components` — shared UI primitives

## Quick start
Requirements: Node.js 18+ and npm

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment & configuration
- Use Vite env files (`.env`, `.env.local`) for API endpoints and keys.

## Short roadmap (next actions)
1. Add ESLint + Prettier config and run lint across the project (quick).
2. Add CI (GitHub Actions) to run lint + build on PRs.
3. Add clear loading and error states for API calls in `src/services`.
4. Run accessibility audit (axe/Lighthouse) and fix top issues.

## Medium/long-term goals
- Add unit tests (Jest + React Testing Library) for contexts and scoring logic
- Add E2E tests (Playwright/Cypress) for core flows
- Centralize API client and adopt typed adaptors; consider incremental TypeScript migration
- Add authentication and role-based access for Admin
- Add automated deploys and monitoring (Sentry)

## Testing & CI recommendations
- Unit tests: Jest + React Testing Library
- E2E: Playwright or Cypress (Playwright recommended for multi-browser)
- CI: GitHub Actions — `lint` → `test` → `build` → `deploy`

## Contributing
- Run `npm install` and `npm run dev` to start development
- Create feature branches and open PRs; CI will run lint/build

---

If you'd like, I can now add a GitHub Actions workflow, an ESLint/Prettier config, or start adding loading/error UI in `src/services`. Which should I do next?
