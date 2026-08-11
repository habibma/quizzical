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
