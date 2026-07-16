# FULAFIA Accommodation Management System (AMS)

Enterprise-level accommodation management system for students, agents, and administrators.

## Features
- Student registration, search, booking, online/offline payments, complaints, recommendations
- Agent onboarding, property creation, listing management, booking requests
- Admin verification, approvals, analytics, payment review, complaint resolution, user management
- JWT auth, RBAC, secure middleware, rate limiting, file uploads, Paystack integration

## Backend
Location: `/server`

### Setup
1. `cd server`
2. Copy `.env.example` to `.env`
3. Configure `MONGO_URI` (for local MongoDB Compass use `mongodb://localhost:27017/fulafia-ams`), `JWT_SECRET`, Paystack keys, and `CLIENT_URL`
4. `npm install`
5. `npm run dev`

### MongoDB Compass
Open MongoDB Compass and connect to:
- `mongodb://localhost:27017`
- database: `fulafia-ams`

### Project locations
This application is configured for the following local areas:
- Gandu
- Mararaba
- Gimare
- Bukan Koto
- Akunza
- Tudun Kauri

## Frontend
Location: `/client`

### Setup
1. `cd client`
2. `npm install`
3. `npm run dev`

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Notes
- Uploaded images are stored in `/server/uploads`
- API routes are proxied from the client to `/api`
