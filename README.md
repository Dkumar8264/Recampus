# Recampus

Recampus is a MERN app for college students to post lost items, found items, and peer-to-peer marketplace listings.

This repository is scaffolded as two apps:

- `server`: Express API with MongoDB, JWT auth, validation, and API middleware.
- `client`: React + Vite + Tailwind frontend shell.

## Phase 1 Scope

Phase 1 establishes the backend foundation and authentication flow:

- Express server structure.
- MongoDB connection with Mongoose.
- User signup and login.
- College-domain email validation via `ALLOWED_EMAIL_DOMAIN`.
- Email ownership verification with a 6-digit OTP before login is allowed.
- JWT access and refresh token creation.
- Password hashing with bcrypt.
- Auth middleware and `/api/auth/me`.
- Security headers, explicit CORS origins, NoSQL payload sanitization, request logging, and structured error logs.
- Image upload policy validation for MIME type and size ahead of Cloudinary direct uploads.
- Basic validation and centralized error handling.
- React routes for home, browse, post item, login, signup, my listings, and profile.
- PWA manifest/icon scaffolding, mobile touch target improvements, and community guideline pages.

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

Default local URLs:

- Client: `http://localhost:5175`
- Server: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

## Database

Recampus uses MongoDB through Mongoose. Set `MONGO_URI` in `server/.env` to either a local MongoDB instance or a MongoDB Atlas cluster.

For MongoDB Atlas:

1. Create a free M0 cluster in MongoDB Atlas.
2. Create a database user with read/write access.
3. Add your backend host IP to Network Access. During early testing, Atlas can allow `0.0.0.0/0`, but lock this down before a real launch.
4. Copy the connection string and set it as `MONGO_URI`.
5. Use a database name in the URI, for example `mongodb+srv://USER:PASSWORD@cluster.mongodb.net/recampus?retryWrites=true&w=majority`.
6. In production, set `MONGO_AUTO_INDEX=false` and run the index sync command manually after deployments.

Current collections:

- `users`: verified student/admin accounts, hashed passwords, email verification state
- `listings`: lost/found/sale posts with text and filtered-browse indexes
- `chats`: two-person conversations tied to a listing
- `messages`: chat messages with read state
- `reports`: listing reports for moderation
- `savedsearches`: saved filters for future match notifications

Seed local database data and ensure indexes:

```bash
npm run db:seed --prefix server
```

The seed creates a verified demo account:

- Email: `demo@<ALLOWED_EMAIL_DOMAIN>`
- Password: `password123`

Sync production indexes without seeding demo data:

```bash
npm run db:sync-indexes --prefix server
```

The API health check returns database status:

```json
{
  "status": "ok",
  "service": "recampus-api",
  "database": {
    "status": "connected",
    "database": "recampus",
    "host": "cluster.mongodb.net"
  }
}
```

## Environment Variables

See [server/.env.example](server/.env.example).

Important values:

- `ALLOWED_ORIGINS`: comma-separated frontend origins that may call the API.
- `ALLOWED_EMAIL_DOMAIN`: college email domain required for signup.
- `MONGO_URI`: MongoDB local or Atlas connection string.
- `MONGO_AUTO_INDEX`: keep `true` locally; use `false` in production and run `db:sync-indexes`.
- `MONGO_SERVER_SELECTION_TIMEOUT_MS`, `MONGO_MAX_POOL_SIZE`: production Mongo connection tuning.
- `GOOGLE_CLIENT_ID`, `VITE_GOOGLE_CLIENT_ID`: Google OAuth Web Client ID for verified Google login.
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`: enable OTP email delivery. If omitted in development, OTPs are logged to the server console.
- `MAX_IMAGE_SIZE_MB`, `ALLOWED_IMAGE_MIME_TYPES`: server-side image upload policy.

## API Routes In Phase 1

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `POST /api/auth/refresh-token`
- `POST /api/auth/verify-email`
- `POST /api/auth/resend-verification`
- `GET /api/auth/me`
- `GET /api/listings`
- `POST /api/listings`
- `GET /api/listings/mine`
- `GET /api/listings/:id`
- `GET /api/uploads/image-policy`
- `POST /api/uploads/validate-image`
- `GET /health`

## Production Backend Checklist

Before connecting the deployed frontend to the deployed API:

- Set `NODE_ENV=production`.
- Set `PORT` from the hosting provider.
- Set `CLIENT_URL` to the deployed frontend URL.
- Set `ALLOWED_ORIGINS` to every allowed frontend origin, separated by commas.
- Set `MONGO_URI` to the MongoDB Atlas connection string.
- Set `MONGO_AUTO_INDEX=false`.
- Set long random values for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.
- Configure SMTP or Resend-style email credentials for OTP delivery.
- Set `GOOGLE_CLIENT_ID` after creating a Google OAuth Web client.
- Run `npm run db:sync-indexes --prefix server` once after the backend can connect to Atlas.
- Confirm `/health` returns `status: "ok"` and `database.status: "connected"`.

## Next Phase

Next we should finish Cloudinary upload signatures, owner edit/delete controls, richer listing filters, and the chat/notification flow.
