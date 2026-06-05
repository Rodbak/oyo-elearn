# OYO-Elearner

Multi-tenant SaaS eLearning platform for K-12 schools, universities, and vocational institutes — built with Next.js 14, Prisma, NextAuth v5, and a neumorphic design system.

## Quick start

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the local database (saved at `prisma/dev.db` on your computer):

   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

   Login and register pages let you choose **Student**, **Instructor**, or **Institution** before signing in. New accounts are persisted in SQLite for future logins.

4. Run the dev server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Demo accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@oyo.test | password123 |
| Institution Admin | admin@lagos-academy.test | password123 |
| Instructor | instructor@lagos-academy.test | password123 |
| Student | student@lagos-academy.test | password123 |

## Project structure

- `app/(marketing)/` — Landing, pricing, about, contact
- `app/(auth)/` — Login, register, onboarding
- `app/(dashboard)/dashboard/*` — Role-based dashboards
- `components/neu/` — Neumorphic UI primitives
- `prisma/schema.prisma` — Full data model

## Tech stack

Next.js 14 · Tailwind · shadcn-style primitives · NextAuth v5 · Prisma · PostgreSQL · Mux · Cloudinary · OpenAI · Paystack · Stripe · Resend · Socket.io (planned)

## License

Proprietary — OYO-Elearner
