# Quizzical

Quizzical is a React and Vite quiz platform for creating, publishing, and taking quizzes from configurable question repositories. The application includes public quiz creation, teacher quiz management, platform administration, school administration, and a student quiz view.

Live demo: https://quizzical-mote.netlify.app/

## Features

- Build custom quizzes by subject, difficulty, question type, and question count.
- Fetch questions through repository-specific API adapters, including Open Trivia DB and Trivia API sources.
- Review answers, receive immediate correct/incorrect feedback, and view results.
- Manage API sources, endpoints, categories, custom questions, themes, settings, rewards, and statistics as a platform administrator.
- Manage repositories and quizzes as a teacher.
- Create, edit, duplicate, publish, archive, preview, and delete teacher quizzes.
- Display published, non-private quizzes in the student panel.
- Manage students, teachers, classes, courses, reports, parents, and school settings as a school administrator.
- Use shared accessible UI components, including the reusable Button and Modal components.
- Persist prototype data in browser `localStorage`.

## Quiz publishing flow

Teacher-created quizzes start as drafts and are not visible to students. A quiz appears in the student panel after it is published and its visibility is not set to `private`.

The current student panel supports viewing and searching published quizzes. Starting an assigned teacher quiz from that panel is planned for a later workflow; the public Custom Quiz flow remains available for generating a quiz directly from a repository.

## Routes

### Public

- `/` — Home page
- `/custom-quiz` — Custom quiz builder
- `/quiz` — Active quiz
- `/result` — Quiz result
- `/about` — About page

### Platform administrator

- `/admin/api` — API sources and endpoints
- `/admin/categories` — Category availability and metadata
- `/admin/question-sources` — Question source management
- `/admin/rewards` — Rewards
- `/admin/settings` — Platform settings
- `/admin/themes` — Themes
- `/admin/statistics` — Statistics

### School administrator

- `/principal` — Dashboard
- `/principal/students` — Student management
- `/principal/teachers` — Teacher management
- `/principal/classes` — Classes
- `/principal/courses` — Courses
- `/principal/reports` — Reports
- `/principal/parents` — Parents
- `/principal/settings` — School settings

### Teacher

- `/teacher` — Dashboard
- `/teacher/repositories` — Repository availability and category status
- `/teacher/question-bank` — Question bank
- `/teacher/my-questions` — Teacher-created questions
- `/teacher/quizzes` — Quiz management

### Student

- `/student` — Dashboard
- `/student/quizzes` — Published quizzes
- `/student/insights` — Insights
- `/student/leaderboard` — Leaderboard

## Tech stack

- React 18
- Vite
- `react-router-dom`
- ESLint
- Vite React SWC plugin

## Project structure

- `src/pages` — Public, platform-admin, school-admin, teacher, and student pages
- `src/layouts` — Role-specific layouts and navigation
- `src/context` — Shared React Context providers for quiz, question, category, repository, API, settings, and school data
- `src/services` — API clients and domain services
- `src/components` — Shared UI components and icons
- `src/styles` — Global styles, variables, and form styles
- `src/utiles` — Small application utilities

## Data and persistence

The current frontend prototype stores several datasets in browser storage, including quizzes, categories, APIs, repositories, questions, and settings. Clearing browser storage removes this data.

There is no authentication or server-side authorization layer in this prototype. Role-specific routes and permissions are represented in the frontend structure and should be backed by an API and authenticated user identity before production use.

## Quick start

Requirements: Node.js 18+ and npm.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```
