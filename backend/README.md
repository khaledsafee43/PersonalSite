# PersonalSite Backend

Unified Express + MongoDB API for the public portfolio, client dashboard, and the separate admin panel. It uses CommonJS so it can run as a single Node.js service on port 5000.

## 1. Requirements

- Node.js 20 or newer
- MongoDB Atlas database or local MongoDB
- The portfolio frontend and admin panel frontend are separate projects; both can use this API.

## 2. Install and configure

Open a terminal inside this folder:

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your own values. On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Required settings:

- `MONGO_URI`: MongoDB connection string. Use your actual Atlas URI and database name.
- `JWT_SECRET`: a private random secret of at least 32 characters.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: credentials for the separate admin panel. Password must be at least 12 characters.
- `CLIENT_ORIGIN`: comma-separated frontend origins, for example `http://localhost:5173,http://localhost:5174`.

Do not upload `.env` to GitHub or send it to anyone. The admin account is created automatically the first time the server starts. If you already have an admin account with the same email in this database, it is reused; its password is not reset automatically.

## 3. Seed initial portfolio content (optional but recommended)

After setting `.env`, run this once to add starter portfolio profile, hero, about, skills, services, and the six project records based on the supplied frontend data:

```bash
npm run seed
```

The seed uses upsert-on-insert and will not overwrite records you have already edited. It is safe to run again. You can manage the records from the admin panel.

## 4. Start the API

```bash
npm run dev
```

Health check: `http://localhost:5000/api/health`

For production:

```bash
npm start
```

## 5. API overview

All responses are JSON. Protected endpoints require:

`Authorization: Bearer YOUR_TOKEN`

### Public portfolio

- `GET /api/public/site` — all published portfolio content grouped by type.
- `GET /api/public/content/:type` — published `home`, `about`, `projects`, `posts`, `skills`, `services`, `resume`, `contact`, `seo`, `appearance`, `languages`, or `general` content.
- `POST /api/public/contact` — create a contact message; appears in the admin panel's Messages collection.

Portfolio content is managed in the admin panel and stored in MongoDB's `contents` collection. Public endpoints only return records with `status: "published"`.

### Authentication

- `POST /api/auth/signup` — client registration (`fullName`, `email`, `password`).
- `POST /api/auth/login` — signs in either an admin account or client account, depending on the credentials.
- `GET /api/auth/profile` — current client profile; client token required.
- `PATCH /api/auth/client-profile` — update client profile and preferences.
- `PATCH /api/auth/client-password` — change client password.
- `GET /api/auth/me` — current admin profile; admin token required.
- `PATCH /api/auth/profile` — update admin name/email.
- `PATCH /api/auth/password` — change admin password.

Client signup always creates a `client` account. A visitor cannot choose the admin role during signup. Admin accounts use a separate `admins` collection, matching the provided admin-panel frontend.

### Client dashboard (client token required)

- `GET /api/client/dashboard` — summary statistics and recent projects.
- `GET /api/client/projects` — the signed-in client's projects.
- `POST /api/client/projects` — submit a project request. Required: `title` and `description`.
- `GET /api/client/projects/:id` — get one of the signed-in client's projects.
- `GET /api/client/messages` — messages for the client's projects.
- `POST /api/client/messages` — send `{ "text": "...", "projectId": "optional-project-id" }`.
- `GET /api/client/payments` — project budget summaries only, not real payment processing.
- `GET /api/client/files` — file metadata attached to projects. This API does not upload file bytes to cloud storage.

### Admin panel (admin token required)

- `GET /api/dashboard` — dashboard stats (compatible with the provided admin UI).
- `GET/POST /api/content/:type` — list/create portfolio content.
- `PATCH/DELETE /api/content/:type/:id` — update/delete portfolio content.
- `GET/POST /api/messages`, `/api/clients`, `/api/requests` — manage inbox collections.
- `PATCH/DELETE /api/:kind/:id` — update/delete an inbox record.
- `GET /api/users` — registered client accounts (without passwords).
- `GET/POST /api/projects` — list/create client projects.
- `PATCH/DELETE /api/projects/:id` — update project status, progress, milestones, files metadata, etc.
- Equivalent admin-only routes are also available under `/api/admin/...` for dashboard, content, and projects.

## 6. Important integration notes

1. Set the portfolio frontend API base URL to `http://localhost:5000/api` for local development. For public portfolio content, call `/public/site` or `/public/content/projects` etc.
2. The provided portfolio frontend currently has some static arrays and localStorage-based screens. The API is ready, but those screens must call these endpoints to show database data; adding a backend does not automatically replace hard-coded frontend data.
3. Set the admin-panel frontend `VITE_API_URL=http://localhost:5000/api`. It uses `portfolio_admin_token` and expects `/auth/login`, `/auth/me`, `/dashboard`, `/content/:type`, and `/messages|clients|requests`, all supported here.
4. Add the deployed frontend domains to `CLIENT_ORIGIN` in the backend environment settings. Do not include a trailing slash in an origin.
5. MongoDB Atlas must allow the backend server's IP address. For local development, allow your current IP in Atlas Network Access. Avoid permanently allowing all IPs in production.
6. This project does not include Cloudinary/S3 upload credentials or payment-gateway credentials. File metadata and budget summaries are supported, but real file uploads and payment transactions need a configured provider.

## 7. Quick test

1. Start the server and open `/api/health`.
2. Sign up a client using `POST /api/auth/signup`.
3. Sign in using `POST /api/auth/login` and copy `token`.
4. Send `GET /api/client/dashboard` with `Authorization: Bearer <token>`.
5. Sign in to the admin panel with `ADMIN_EMAIL` and `ADMIN_PASSWORD`; create published content under `/content/projects` or `/content/about`.
6. Fetch `/api/public/content/projects` without a token to verify that published content is visible publicly.
