# Quizzical

Quizzical is a React and Vite quiz platform for creating, publishing, and taking quizzes from configurable question repositories. The application includes public quiz creation, teacher quiz management, platform administration, school administration, and a student quiz view.

Live demo: [https://quizzical-mote.netlify.app/](https://quizzical-mote.netlify.app/)

## Features

- Build custom quizzes by subject, difficulty, question type, and question count.
- Fetch questions through repository-specific API adapters, including Open Trivia DB and Trivia API sources.
- Review answers, receive immediate correct/incorrect feedback, and view results.
- Manage API sources, endpoints, categories, custom questions, themes, settings, rewards, and statistics as a platform administrator.
- Manage repositories and quizzes as a teacher.
- Create, edit, duplicate, publish, archive, preview, and delete teacher quizzes.
- Display published, non-private quizzes in the student panel.
- Manage students, teachers, classes, and schools through PostgreSQL-backed CRUD operations.
- View the remaining school administration areas for courses, reports, parents, and school settings.
- Use shared accessible UI components, including reusable Button and Modal components.
- Persist prototype datasets in browser `localStorage`.

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

**Frontend**
- React 18
- Vite
- React Router
- ESLint
- Vite React SWC plugin

**Backend**
- Node.js
- Express 5
- PostgreSQL
- `pg` (node-postgres)

**Development environment**
- Docker
- Docker Compose
- Make

## Project structure

```text
Quizzical/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── db.js
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
├── database/
│   ├── init.sql
│   └── seed.sql
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   ├── services/
│   │   ├── components/
│   │   ├── styles/
│   │   └── utiles/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── Makefile
└── README.md
```

## Data and persistence

The application currently uses two persistence approaches:

- PostgreSQL stores schools, users, user roles, teachers, students, classes, and their relationships.
- Browser `localStorage` stores prototype datasets such as quizzes, categories, APIs, repositories, questions, and settings.

The database schema is maintained in `database/init.sql`. Initial development data is maintained separately in `database/seed.sql`.

The backend connects to PostgreSQL using environment variables. The database hostname is `db` inside the Docker network.

There is currently no authentication or server-side authorization layer. Role-specific routes and permissions are represented in the frontend and should be backed by authenticated user identity before production use.

## Getting started with Docker

### Requirements

- Docker Desktop (or Docker Engine with Docker Compose)
- Git

Node.js and PostgreSQL do not need to be installed locally when using Docker.

### 1. Clone the repository

```bash
git clone https://github.com/habibma/quizzical.git
cd Quizzical
```

### 2. Configure environment variables

Create a root `.env` file:

```env
DB_USER=postgres
DB_PASSWORD=your_strong_password
DB_NAME=quizzical
DB_PORT=5432
PORT=3000
```

Use a strong password. Do not commit `.env` to Git.

### 3. Build and start the application

```bash
make build
```

This builds the frontend and backend images and starts all services.

### 4. Access the application

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)
- PostgreSQL: `localhost:5432`

### 5. Verify the services

```bash
make status
```

Check backend and database logs:

```bash
docker compose logs -f backend db
```

## Makefile commands

| Command | Description |
|---|---|
| `make up` | Start containers |
| `make down` | Stop and remove containers |
| `make build` | Rebuild images and start services |
| `make restart` | Restart services |
| `make logs` | Follow container logs |
| `make status` | Show container status |
| `make db` | Open PostgreSQL shell |
| `make shell-backend` | Open backend container shell |
| `make shell-frontend` | Open frontend container shell |
| `make clean` | Remove containers and volumes |

**Warning:** `make clean` removes the PostgreSQL volume and permanently deletes its stored database data.

## Database management

The database schema is initialized from `database/init.sql` when PostgreSQL first initializes an empty data volume.

To apply the schema manually:

```bash
docker compose exec -T db psql -U postgres -d quizzical < database/init.sql
```

To insert initial development data:

```bash
docker compose exec -T db psql -U postgres -d quizzical < database/seed.sql
```

To access PostgreSQL:

```bash
make db
```

Useful PostgreSQL commands:

```sql
\dt
\d users
SELECT * FROM schools;
```

The PostgreSQL data is stored in the named Docker volume `postgres_data`. It persists when containers are stopped or rebuilt.

## Backend API

The school administration endpoints include:

| Endpoint | Operations |
|---|---|
| `/api/schools` | List, create, update, delete |
| `/api/users` | User management |
| `/api/students` | List, create, update, delete |
| `/api/teachers` | List, create, update, delete |
| `/api/classes` | List, create, update, delete |

The backend uses Express and connects to PostgreSQL through a connection pool.

The frontend uses `VITE_API_URL` to configure the backend API address. For local Docker development, it points to `http://localhost:3000`.

## Running without Docker

For development without Docker, install Node.js 22+ and npm, and provide a separately running PostgreSQL database.

Install frontend dependencies:

```bash
cd frontend
npm ci
npm run dev
```

In another terminal, install backend dependencies:

```bash
cd backend
npm ci
npm run dev
```

Configure the backend database environment variables appropriately. When running outside Docker, `DB_HOST` should normally be `localhost`, not `db`.

## Linting and production builds

Run frontend ESLint:

```bash
cd frontend
npm run lint
```

Build the frontend:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Current limitations

- Authentication and server-side authorization are not implemented.
- Several platform and teacher datasets still use browser `localStorage`.
- The student panel does not yet support starting assigned teacher quizzes.
- Production deployment and production database configuration require additional setup.
