# CampusHub

CampusHub is a MERN app for college students to post lost items, found items, and peer-to-peer marketplace listings.

This repository is scaffolded as two apps:

- `server`: Express API with MongoDB, JWT auth, validation, and API middleware.
- `client`: React + Vite + Tailwind frontend shell.

## Phase 1 Scope

Phase 1 establishes the backend foundation and authentication flow:

- Express server structure.
- MongoDB connection with Mongoose.
- User signup and login.
- College-domain email validation via `ALLOWED_EMAIL_DOMAIN`.
- JWT access and refresh token creation.
- Password hashing with bcrypt.
- Auth middleware and `/api/auth/me`.
- Basic validation and centralized error handling.
- React routes for home, browse, post item, login, signup, my listings, and profile.

## Prerequisites

- Node.js 20+
- MongoDB Atlas connection string or local MongoDB

## Setup

Install dependencies:

```bash
npm run install:all
```

Create server environment variables:

```bash
cp server/.env.example server/.env
```

Update `server/.env` with your values.

Run both apps:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

Default URLs:

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

## Environment Variables

See [server/.env.example](server/.env.example).

## API Routes In Phase 1

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /health`

## Next Phase

Phase 2 should add listing models, Cloudinary signed upload support, listing CRUD, filtering/search, and the browse/post/detail flows.
