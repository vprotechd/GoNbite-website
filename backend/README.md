# GoNbite Backend

Express + MongoDB API for GoNbite website authentication and blog management.

## Setup

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `ADMIN_REGISTRATION_KEY`
   - SMTP settings for real verification emails
4. `npm run dev`

API runs on `http://localhost:5000`.

## Authentication

- `POST /api/auth/register` — user registration + email verification
- `GET /api/auth/verify-email?token=...` — verify email
- `POST /api/auth/resend-verification` — resend verification
- `POST /api/auth/login` — verified user login
- `POST /api/auth/admin/register` — administrator registration using the private admin key
- `POST /api/auth/admin/login` — admin login
- `GET /api/auth/me` — authenticated session

Passwords are hashed with bcrypt. Verification tokens are stored hashed and expire after 24 hours. JWT sessions expire after 7 days.

## Blogs

Public:
- `GET /api/blogs`
- `GET /api/blogs/:slug`

Admin:
- `GET /api/blogs/admin/all`
- `POST /api/blogs`
- `PUT /api/blogs/:id`
- `DELETE /api/blogs/:id`

The backend also exposes a dynamic `/sitemap.xml`. In production, route the public site's `/sitemap.xml` to this endpoint (or periodically publish its output as the frontend sitemap) so newly published blog URLs are included.

## Production

Use HTTPS, a strong random JWT secret, a strong private admin registration key, a production MongoDB connection, and a real SMTP provider. Do not commit `.env`.
