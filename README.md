# DineAI - Restaurant Pulse

## Product Vision
DineAI is a real-time restaurant operating system connecting customers, tables, servers, kitchen staff, and management. It bridges the gap between front-of-house operations, back-of-house fulfillment, and inventory, solving problems like long wait times, delayed communication, manual tracking, and safety compliance.

## Unique Innovation - SafePlate Relay
The signature feature is "SafePlate Relay": a closed-loop dietary-constraint communication workflow. It ensures that when a guest selects a dietary constraint (e.g., Peanut allergy), it travels immutably through the entire lifecycle of the order. The system enforces acknowledgments from the Server, Kitchen, Prep station, and Delivery runner to guarantee maximum communication safety. 

> **DISCLAIMER:** SafePlate supports communication and operational decisions but cannot guarantee the absence of allergens or cross-contact.

## Architecture
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, shadcn/ui patterns.
- **Backend**: Next.js Server Components and Server Actions.
- **Database**: MongoDB with Mongoose (Local for dev, Atlas for prod).
- **Authentication**: Auth.js (NextAuth v5) using Credentials and Google OAuth.
- **Testing**: Playwright for E2E, Vitest for unit tests.

## Technology Stack
- Next.js (App Router)
- React & Tailwind CSS
- MongoDB & Mongoose
- NextAuth.js
- Zod, React Hook Form
- Recharts (Analytics)
- Playwright, Vitest

## Data Model Overview
- **User**: Staff and Customer accounts.
- **Restaurant**: Main multi-tenant scope.
- **QueueEntry**: Waitlist management.
- **Table**: Seating assignments and QR tokens.
- **MenuItem/MenuCategory**: Digital menu structure.
- **Ingredient**: Granular inventory with allergens.
- **Order**: Immutable snapshot of the guest request.
- **SafetyCheck**: Audit log of SafePlate acknowledgments.

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Copy `.env.example` to `.env.local` and add your configurations.
   For local development:
   ```
   MONGODB_URI="mongodb://127.0.0.1:27017/dine-ai"
   AUTH_SECRET="your-secret"
   ```

3. **Seed Database:**
   ```bash
   $env:MONGODB_URI="mongodb://127.0.0.1:27017/dine-ai"
   npm run seed
   ```

4. **Run Dev Server:**
   ```bash
   npm run dev
   ```

## Demo Accounts
Password for all: `PulseDemo!2026`
- **Customer**: `customer@restaurantpulse.demo`
- **Server**: `server@restaurantpulse.demo`
- **Kitchen**: `kitchen@restaurantpulse.demo`
- **Manager**: `manager@restaurantpulse.demo`

## Test Commands
- Unit Tests: `npm run test`
- E2E Tests: `npm run test:e2e`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`

## Deployment (Vercel)
Set the environment variables in Vercel. Ensure `MONGODB_URI` points to a MongoDB Atlas cluster.
