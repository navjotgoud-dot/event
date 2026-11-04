# Business Plan Championship Platform

Complete website & event management platform for a two-day business-plan pitching championship.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Prisma**, **NextAuth**, and designed for deployment on **Vercel** with **Neon PostgreSQL**.

---

## Features Implemented

### Public Website
- Premium homepage with championship proposition and CTAs
- About, Competition Format, How to Participate
- Timeline, Judges, Speakers, Investors, Prizes, Sponsors, Venue
- Multi-step Apply / Register form (team & individual)
- Audience Tickets / RSVP page
- FAQs, Privacy Policy, Terms & Conditions
- Mobile-first responsive design

### Administration
- Secure admin dashboard skeleton with metrics placeholders
- Module navigation for applications, judges, agenda, tickets, awards, emails, reports
- Role-based access control schema (Super Admin, Director, Judge, Reviewer, Participant, etc.)

### Backend & Data
- Full Prisma schema covering all entities from the specification:
  - Users, roles, sessions
  - Championships, settings, tracks, event pages
  - Participants, teams, applications, business plans, pitch decks
  - Screening, reviewers, judging rubrics, scores
  - Pitch rounds, slots, agenda sessions
  - Speakers, mentors, investors
  - Tickets, check-ins
  - Awards, winners, certificates
  - Feedback, follow-up cases
  - SPOCs, email templates/logs, audit logs
- Authentication with NextAuth (credentials provider)
- Utility helpers for application IDs, tickets, certificates

### Student-Friendly Deployment
- No command-line required for basic deploy once files are on GitHub
- Clear `.env.example`
- Step-by-step README

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- A Neon (or any PostgreSQL) database
- (Optional) Resend account for emails

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set at minimum:
- `DATABASE_URL` — your Neon connection string
- `NEXTAUTH_SECRET` / `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL=http://localhost:3000`

### 3. Database setup
```bash
npx prisma db push
npx prisma generate
```

### 4. Run
```bash
npm run dev
```
Open http://localhost:3000

---

## Student-Friendly Deployment (No CLI Required)

1. **Download** this project ZIP and extract it.
2. Create a new repository on **GitHub** (github.com → New repository).
3. On the repository page click **Add file → Upload files**.
4. Drag all project files into the browser and commit.
5. Go to **vercel.com** → Add New Project → Import the GitHub repository.
6. In Vercel Project Settings → Environment Variables, add:
   - `DATABASE_URL` (from Neon dashboard)
   - `DATABASE_URL_UNPOOLED` (optional, from Neon)
   - `NEXTAUTH_SECRET` (long random string)
   - `NEXTAUTH_URL` (your Vercel URL, e.g. https://your-app.vercel.app)
   - `NEXT_PUBLIC_APP_URL` (same as above)
   - `RESEND_API_KEY` (if using email)
7. Deploy. Vercel will build and host the site.
8. After first deploy, run migrations via Vercel CLI or a one-time script, or use Prisma Data Platform.

### Neon Setup
1. Create account at https://neon.tech
2. Create a new project
3. Copy the connection string into `DATABASE_URL`

### Super Admin Setup
After database is connected, create the first Super Admin by running a seed script or inserting a user with hashed password (bcrypt) and role `SUPER_ADMIN`.

---

## Project Structure

```
├── prisma/
│   └── schema.prisma          # Complete database schema
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── about/, competition/, apply/, ...
│   │   ├── admin/             # Admin dashboard
│   │   └── auth/              # Login
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   └── ui/                # Button and shared UI
│   └── lib/
│       ├── db.ts              # Prisma client
│       ├── auth.ts            # NextAuth config
│       └── utils.ts           # Helpers
├── .env.example
├── package.json
├── tailwind.config.ts
└── README.md
```

---

## Important Notes

- **Do not commit secrets.** Keep `.env` out of Git (already in `.gitignore`).
- File uploads currently use browser-side inputs; production requires connecting Vercel Blob, S3 or similar and updating the submission API.
- Email sending requires a valid Resend API key and verified domain/sender.
- Dashboard metrics show placeholders until real database records exist.
- Judging rubric weights and championship settings are designed to be fully configurable via the admin panel once the settings CRUD is wired to the database.
- This platform implements the connected workflows and schema defined in the specification. Some advanced modules (live timer, QR scanner UI, certificate PDF generation) are scaffolded and ready for completion with external credentials.

---

## Quality Checklist Status

- [x] Frontend builds (after `npm install` + env)
- [x] Database schema defined and migration-ready
- [x] Authentication schema and NextAuth configured
- [x] Individual / team registration form
- [x] Public pages for all required sections
- [x] Admin dashboard structure
- [x] Role model and RBAC schema
- [x] `.env.example`, `.gitignore`, README
- [ ] Full end-to-end file upload to cloud storage (requires credentials)
- [ ] Live Resend email delivery (requires API key)
- [ ] QR check-in scanner (UI ready to connect)
- [ ] Certificate PDF generation library integration

---

## License & Usage

Prepared as a reusable specification implementation for educational and organizational use.  
Configure event-specific details (name, dates, judges, prizes) through the championship settings — do not hard-code them.

**Mandatory package name:** `Business_Plan_Championship_Platform.zip`

---

## Vercel Blob Integration (File Storage)

Business plans and pitch decks are stored using **Vercel Blob** with private access.

### Setup

1. Go to [Vercel Dashboard → Storage](https://vercel.com/dashboard/stores)
2. Create a new **Blob** store
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add it to your Vercel project Environment Variables and local `.env`

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/upload` | POST | Upload file (multipart form). Fields: `file`, `folder` |
| `/api/files` | GET | Get blob metadata (`?url=...`) |
| `/api/files` | DELETE | Delete a blob (`?url=...`) |

### Client Helper

```ts
import { uploadFile } from "@/lib/upload";

const result = await uploadFile(file, "plans"); // or "decks", "logos", etc.
// result.url, result.pathname, result.size, result.contentType
```

### Security

- Files are stored with `access: "private"`
- Max size: 20 MB
- Allowed types: PDF, DOC/DOCX, PPT/PPTX, PNG, JPEG, WebP
- In production, protect `/api/upload` and `/api/files` with NextAuth session + role checks
