# OYO-Elearner

**Africa's institutional eLearning platform** — built for K-12 schools, universities, and vocational centres. Combines the best of Coursera-style course delivery with deep school management system integrations.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rodbak/OYO-Elearning)

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1 — Database (Neon — free)
1. Go to [neon.tech](https://neon.tech) → sign up free
2. Create a project → copy the **Connection string**

### Step 2 — Deploy
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Set **Root Directory** to `oyo-elearn-main` if prompted
4. Add these **Environment Variables** in Vercel:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string |
| `NEXTAUTH_SECRET` | Any random string (e.g. `oyo-secret-2025`) |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

5. Click **Deploy** — done ✅

### Step 3 — Seed demo accounts
After first deploy, run once from your local machine:
```bash
# Make sure DATABASE_URL in your local .env points to Neon
npm run db:seed
```

Or from Vercel/Railway terminal:
```bash
npx tsx prisma/seed.ts
```

---

## 🔑 Demo Accounts (after seed)

| Role | Email | Password | Portal |
|---|---|---|---|
| Super Admin | `superadmin@oyo.test` | `password123` | Institution |
| Institution Admin | `admin@lagos-academy.test` | `password123` | Institution |
| Instructor | `instructor@lagos-academy.test` | `password123` | Instructor |
| Student | `student@lagos-academy.test` | `password123` | Student |

> 💡 Demo logins are also available on the login page — click **"Ready to try it?"** to expand.

---

## 💻 Local Development

```bash
# 1. Clone and install
git clone https://github.com/Rodbak/OYO-Elearning.git
cd OYO-Elearning/oyo-elearn-main
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env — set DATABASE_URL to your Neon URL or use SQLite:
# DATABASE_URL="file:./prisma/dev.db"

# 3. Set up database
npx prisma generate
npx prisma db push       # or: npx prisma migrate deploy
npm run db:seed          # creates demo accounts

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
app/
├── (marketing)/          # Public landing page (single page)
├── (auth)/               # Login, register, onboarding
└── (dashboard)/
    └── dashboard/
        ├── student/      # Student dashboard
        ├── instructor/   # Instructor dashboard
        ├── admin/        # Institution admin
        └── superadmin/   # Platform super admin

components/
├── neu/                  # Neumorphic UI primitives
├── marketing/            # Landing page components
├── auth/                 # Auth components
├── dashboard/            # Dashboard shell
└── i18n/                 # Language switcher & locale provider

lib/
├── auth.ts               # NextAuth config
├── prisma.ts             # Prisma client
├── roles.ts              # Role/portal logic
├── ai.ts                 # OpenAI helpers
├── mux.ts                # Mux video helpers
└── i18n/                 # EN + FR dictionaries

prisma/
├── schema.prisma         # Full database schema
├── seed.ts               # Demo account seeder
└── migrations/           # SQL migrations (production safe)
```

---

## 🌍 Features

| Feature | Status |
|---|---|
| Multi-tenant institutions | ✅ |
| Role-based dashboards (Student, Instructor, Admin, SuperAdmin) | ✅ |
| EN + FR translations (full) | ✅ |
| Currency switcher (GHS, USD, NGN, KES, EUR, GBP) | ✅ |
| Neumorphic design system | ✅ |
| NextAuth (credentials + Google OAuth) | ✅ |
| Video lectures (Mux) | ✅ API ready |
| Live classes + attendance | ✅ UI ready |
| AI tutor + quiz generator (OpenAI) | ✅ API ready |
| Verifiable certificates | ✅ |
| SCORM 1.2/2004 import | ✅ API ready |
| LTI 1.3 launch + grade passback | ✅ API ready |
| Google Classroom sync | ✅ API ready |
| Paystack + Stripe billing | ✅ Webhooks ready |
| Email notifications (Resend) | ✅ API ready |

---

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom neumorphic design tokens
- **Auth**: NextAuth v5 (credentials + Google)
- **Database**: PostgreSQL via Prisma ORM
- **Hosting**: Vercel (app) + Neon (database)
- **Video**: Mux
- **Storage**: Cloudinary
- **AI**: OpenAI GPT-4o
- **Payments**: Paystack (Africa) + Stripe (international)
- **Email**: Resend

---

## 📋 Useful Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run db:seed          # Seed demo accounts
npm run db:push          # Push schema to DB (dev)
npm run db:migrate:prod  # Run migrations (production)
npm run db:studio        # Open Prisma Studio (visual DB editor)
npm run lint             # Run ESLint
```

---

## License

Proprietary — OYO-Elearner © 2025
