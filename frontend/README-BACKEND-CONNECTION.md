# PersonalSite Frontend + Backend Integration

The frontend now uses `VITE_API_URL` from `.env` for API requests.

## Start the backend first
1. Extract `PersonalSite-Backend.zip` into a separate folder.
2. In that backend folder, run `npm install`.
3. Configure the backend `.env` using its `.env.example`; set `MONGO_URI`, a strong `JWT_SECRET` (at least 32 characters), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `CLIENT_ORIGIN=http://localhost:5173`.
4. Run `npm run seed` once to insert the initial portfolio content.
5. Run `npm run dev`.

Check `http://localhost:5000/api/health`.

## Start this frontend
1. Run `npm install` in this frontend folder.
2. Keep `.env` as `VITE_API_URL=http://localhost:5000/api` for local development.
3. Run `npm run dev`.

## API connections implemented
- Public portfolio: `GET /api/public/site`
- Contact form: `POST /api/public/contact`
- Client signup/login: `POST /api/auth/signup`, `POST /api/auth/login`
- Client profile: `GET/PATCH /api/auth/profile`, `PATCH /api/auth/client-profile`
- Client dashboard: `GET /api/client/dashboard`
- Projects: `GET/POST /api/client/projects`
- Messages: `GET/POST /api/client/messages`
- Project files: `GET /api/client/files`
- Budget summaries: `GET /api/client/payments`

## Important
- The contact form stores messages in MongoDB; it does not send email by itself.
- Payments are budget summaries only; no payment processor is connected.
- The files page displays files already attached to projects by the admin. File upload/cloud storage is not implemented by this frontend.
- If the backend uses a different port or is deployed, update `VITE_API_URL` and the backend `CLIENT_ORIGIN`.
- After changing `.env`, restart Vite.
