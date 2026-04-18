# K2K Adventurez - Comprehensive Project Documentation

## 1. Project Overview

### Brief Description
K2K Adventurez is a full-stack Next.js (App Router) travel platform for discovering, viewing, and booking adventure trips (primarily Leh-Ladakh and Spiti circuits). It includes:
- Public marketing and discovery pages
- Dynamic trip detail and booking flows
- User authentication and dashboard
- Payment integration with Razorpay
- An admin panel for content and operational management
- Supabase-backed data storage and authentication

### Purpose and Goals
The project is designed to:
- Showcase curated adventure packages with rich itinerary detail
- Convert visitors into leads/bookings
- Allow authenticated users to manage their booking history
- Provide an internal admin interface for managing trips, categories, blogs, gallery, homepage sections, enquiries, and bookings
- Support both database-backed dynamic content and local fallback content for resiliency

### Tech Stack

#### Frontend
- Next.js 16.2.0 (App Router)
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- Framer Motion (UI animations)
- Lucide React (icons)

#### Backend (within Next.js)
- Next.js Route Handlers (`src/app/api/**/route.ts`)
- Supabase SSR + Supabase JS clients
- Node crypto for Razorpay signature verification

#### Database and Auth
- Supabase Postgres
- Supabase Auth (email/password)
- Row Level Security policies configured in SQL scripts

#### Payments
- Razorpay Orders API + Checkout SDK

#### Media/External Services
- Cloudinary (configured in scripts and image source usage)
- WhatsApp deep link for contact lead initiation (`wa.me`)

---

## 2. Application Architecture

### Overall System Design
The app follows a hybrid architecture:
- Server-rendered pages fetch data from Supabase in server context via `createServerSupabase()`
- Client pages/components call internal API endpoints for admin operations and payment steps
- Middleware-like route guard (`src/proxy.ts`) enforces admin page access checks
- Data layer supports fallback to static local trip/blog data when Supabase data is missing/unavailable

### Frontend and Backend Interaction
Primary interaction patterns:
- Server Components -> direct Supabase reads via query functions in `src/lib/data/queries.ts`
- Client Components -> `fetch()` calls to Next API routes (`/api/...`)
- Auth UI -> Supabase client-side auth (`signInWithPassword`, `getSession`, `signOut`)
- Booking flow -> client calls payment APIs then Razorpay callback triggers verification API

### Folder Structure Explanation

- `src/app`
  - App Router pages and layouts
  - Route handlers under `api/`
  - Public, auth, user dashboard, and admin route groups
- `src/components`
  - `layout/`: Navbar, Footer, iOS and scroll behavior helpers
  - `sections/`: page-level presentational and feature components
  - `ui/`: reusable UI primitives
- `src/lib`
  - `supabase/`: server/client Supabase factories
  - `data/`: query layer + local fallback datasets
  - `hooks/`: optimization hooks
- `src/hooks`
  - client hooks (e.g., iOS detection)
- `src/types`
  - TypeScript data contracts (`Trip`, `TripCategory`, etc.)
- `supabase`
  - SQL schema, migration, and patch scripts
- `scripts`
  - operational scripts (admin setup, schema inspection, image upload)
- `public`
  - static assets and local trip imagery
- `content`
  - text content source files

---

## 3. Routing Structure

## Public Routes

| Route | Type | Purpose | Access |
|---|---|---|---|
| `/` | Static/Server mixed | Homepage with hero, featured trips, gallery, testimonials | Public |
| `/about` | Static page wrapper | About section | Public |
| `/why-us` | Static page wrapper | Differentiators and trust section | Public |
| `/contact` | Client page | Contact/lead page, WhatsApp lead initiation | Public |
| `/faq` | Static page wrapper | FAQ content | Public |
| `/guidelines` | Static page wrapper | Travel guidelines | Public |
| `/gallery` | Server + dynamic data | Gallery listing from Supabase/gallery data | Public |
| `/blogs` | Server + dynamic data | Blog listing | Public |
| `/blogs/[slug]` | Dynamic | Blog article detail | Public |
| `/trips` | Server + revalidated | Trip listing/filter view | Public |
| `/trips/[slug]` | Dynamic + revalidated | Trip detail page | Public |
| `/trips/[slug]/book` | Dynamic page | Booking wizard for selected trip | Public page, booking actions require login |
| `/leh-ladakh` | Server + revalidated | Region-specific listing page | Public |
| `/spiti-valley` | Server + revalidated | Region-specific listing page | Public |
| `/policies/terms` | Static page wrapper | Terms | Public |
| `/policies/privacy` | Static page wrapper | Privacy policy | Public |
| `/policies/cancellation` | Static page wrapper | Cancellation policy | Public |
| `/login` | Auth | User sign-in | Public |
| `/register` | Auth | User sign-up | Public |

## User-Private Route

| Route | Type | Purpose | Access |
|---|---|---|---|
| `/dashboard` | Client-side authenticated page | User profile + booking history + admin shortcut | Requires session (redirect to login if missing) |

## Admin-Protected UI Routes
`src/proxy.ts` protects all `/admin*` pages.

| Route | Purpose |
|---|---|
| `/admin` | Admin dashboard metrics |
| `/admin/trips` | Trip management list |
| `/admin/trips/[id]` | Trip create/edit (including `new`) |
| `/admin/categories` | Category management |
| `/admin/enquiries` | Enquiry triage |
| `/admin/bookings` | Booking/revenue management |
| `/admin/blogs` | Blog list and status management |
| `/admin/blogs/[id]` | Blog create/edit (including `new`) |
| `/admin/gallery` | Gallery manager |
| `/admin/settings` | Homepage content section manager |

## Route Protection Behavior (Important)
- `/admin/*` checks:
  - user session exists
  - user id exists in `admin_users` table
  - session age <= 1 hour (`last_sign_in_at` check)
- Non-admin authenticated users are redirected to `/dashboard`.
- Unauthenticated users are redirected to `/login`.

---

## 4. Pages and Features

### Static vs Dynamic Classification

#### Predominantly static wrappers around client-presentational components
- `/about`, `/why-us`, `/faq`, `/guidelines`, `/contact`, `/policies/*`

#### Dynamic/server-data pages
- `/` (homepage sections from Supabase with fallbacks)
- `/gallery` (gallery table)
- `/blogs`, `/blogs/[slug]` (blog posts table + fallback)
- `/trips`, `/trips/[slug]`, `/trips/[slug]/book`
- `/leh-ladakh`, `/spiti-valley`
- `/admin/*` pages (client pages consuming admin APIs)

### Public Feature Pages

#### Home (`/`)
Composes:
- `HeroSlider`
- `FeaturedTrips`
- `GallerySection`
- `HowItWorks`
- `StatsBanner`
- `TestimonialsSection`
- `CTABanner`
Data source is `src/lib/data/queries.ts` via parallel fetches.

#### Trip Discovery and Detail
- Listing page: `TripsListingClient` with DB + fallback trip catalog
- Detail page: `TripDetailClient`
- Region landing pages: `LehLadakhClient`, `SpitiValleyClient`
- Uses merged strategy: local canonical content + DB live fields (notably departures)

#### Booking Page (`/trips/[slug]/book`)
`BookTripClient` is a multi-step flow:
1. Review selection and package quantities
2. Capture rider details
3. Payment mode selection (full/custom)
4. Confirmation with payment receipt details

#### Blogs
- Listing: `BlogListingClient`
- Article: `BlogArticleClient`
- Related posts are fetched and displayed from remaining posts

#### Contact
`ContactPageClient` collects contact details and opens a prefilled WhatsApp chat URL. Current implementation does not insert into `enquiries` from this page.

### Auth Pages
- `/login`: email/password login via Supabase client auth
- `/register`: posts to `/api/auth/register` (admin create user flow), then signs in locally

### User Dashboard
`/dashboard` displays:
- profile information
- admin membership indicator
- booking history (queried by `customer_email`)
- payment and booking status
- sign-out action

### Admin Pages
- Trips: list/filter/activate/deactivate/edit/delete
- Trip editor: tabbed editing (`General`, `Itinerary`, `Pricing`, `Departures`, `Gallery`, `SEO`)
- Categories: update core category metadata (delete disabled in UI)
- Blogs: publish/unpublish CRUD
- Enquiries: status update workflow
- Bookings: detailed split-view operations and status management
- Gallery: add/update/delete/toggle active
- Settings: homepage section-level edits for hero/stats/how-it-works/testimonials

### Core UI Components and Roles

- `Navbar`
  - route-aware style behavior
  - auth-aware profile link
  - desktop + mobile nav with categorized trip dropdowns
  - search overlay filtering trip data
- `Footer`
  - global navigation + contact + social links
- `ScrollToTop`
  - enforces manual scroll reset on route changes
- `IOSOptimizations` + hooks
  - iOS/Safari-specific performance fixes and viewport behavior adjustments
- Trip detail subcomponents
  - `TripPricing`, `TripItinerary`, `TripGallery`, `TripBookingWidget`

---

## 5. Functionalities (Complete Coverage)

### Authentication

#### Login
- `supabase.auth.signInWithPassword({ email, password })`
- on success: redirect to `redirect` query param or `/dashboard`

#### Signup
- Client sends details to `/api/auth/register`
- API uses Supabase admin create user (`email_confirm: true`)
- profile record inserted into `profiles`
- client immediately signs in using Supabase auth

#### Logout
- dashboard logout uses `supabase.auth.signOut()` and redirects home

#### JWT/Session Handling
- Supabase manages session tokens in cookies
- server-side session is read in `src/proxy.ts` and server components via SSR client
- no custom JWT implementation exists

### User Roles and Permissions
- User role model is table-based:
  - `admin_users` contains IDs for admin users
- UI checks:
  - dashboard checks admin membership and shows admin link if true
- middleware/proxy checks admin membership for `/admin` pages

### Payment Integration

#### Gateway
- Razorpay

#### Flow
1. Client computes payable amount and calls `/api/payment/create-order`
2. API creates Razorpay order (`amount` in paise) and returns order metadata
3. Client opens Razorpay Checkout SDK
4. On success callback, client posts details to `/api/payment/verify`
5. Verify API checks HMAC signature and writes booking record in Supabase
6. Client shows booking confirmation and payment receipt data

#### Payment Modes
- Full payment
- Booking amount/custom payment (`>= ₹1`) with remaining due tracked

#### Success/Failure Handling
- Invalid signature => 400 error
- DB insertion failure after successful payment returns `success: true` with note
- Razorpay checkout failure events captured client-side

### Form Handling and Validation
- Primarily controlled React state with HTML-level constraints (`required`, input types, min values)
- Custom checks:
  - booking minimum payment (`₹1`)
  - riders details required before payment step transition
  - register password min length UI requirement (`minLength={6}`)
- No centralized schema validation layer currently active in runtime UI/API (despite zod/react-hook-form deps in package)

### Data Fetching and State Management
- Server-side fetch in page-level async components (query layer)
- Client-side fetch for admin panels
- Local state via `useState`, `useEffect`, `useMemo`, `useCallback`
- No observable Zustand store usage in current source paths

### Notifications
- In-app alerts, inline status banners, and success/error text messages
- No push notifications/email service implementation in repo code

### File Uploads
- No direct end-user upload flow in app UI
- Operational script exists: `scripts/uploadGallery.js` for Cloudinary uploads

### Error Handling
- API handlers wrap logic in `try/catch` and return JSON errors
- UI generally catches fetch errors and either logs or shows basic fallback messages
- Data layer has fallback behavior to local datasets for trips/blogs/home sections

### Security Practices
Implemented:
- Admin page gate via session + `admin_users` check
- Session timeout for admin access (1 hour)
- Razorpay signature verification
- Security headers in Next config:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection`

Important security caveats (current state):
- Admin APIs under `/api/admin/*` use service-role client and do not enforce per-request admin authorization in route handlers.
- The route guard in `src/proxy.ts` checks `/admin*` paths, but not explicit `/api/admin/*` authorization logic.
- `scripts/uploadGallery.js` contains hardcoded Cloudinary credentials (should be env-based and rotated).

---

## 6. API Documentation

## Backend APIs (internal Next route handlers)

### Auth

#### `POST /api/auth/register`
- Purpose: create a verified Supabase auth user and profile
- Auth: public
- Body:
```json
{
  "email": "user@example.com",
  "password": "secret123",
  "name": "User Name",
  "phone": "+919999999999"
}
```
- Success:
```json
{
  "success": true,
  "user": { "id": "...", "email": "..." }
}
```

### Payment

#### `POST /api/payment/create-order`
- Purpose: create Razorpay order
- Auth: public (called from booking flow)
- Body (core fields):
```json
{
  "amount": 5000,
  "tripTitle": "Trip Name",
  "tripSlug": "trip-slug",
  "customerName": "Name",
  "customerEmail": "email@example.com",
  "customerPhone": "9999999999",
  "totalPayable": 25000,
  "riders": []
}
```
- Success:
```json
{
  "orderId": "order_xxx",
  "amount": 500000,
  "currency": "INR",
  "keyId": "rzp_test_xxx"
}
```

#### `POST /api/payment/verify`
- Purpose: verify Razorpay payment signature and persist booking
- Auth: public
- Body:
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature",
  "bookingDetails": {
    "tripTitle": "...",
    "tripSlug": "...",
    "customerName": "...",
    "customerEmail": "...",
    "customerPhone": "...",
    "userId": "uuid-or-null",
    "departureDate": "YYYY-MM-DD",
    "occupancyRule": "DBL",
    "totalPersons": 2,
    "packages": [],
    "riders": [],
    "subtotal": 10000,
    "gst": 500,
    "totalPayable": 10500,
    "amountPaid": 5000,
    "remainingAmount": 5500,
    "paymentType": "custom"
  }
}
```
- Success:
```json
{
  "success": true,
  "verified": true,
  "dbSaved": true,
  "bookingId": "uuid",
  "paymentId": "pay_xxx",
  "orderId": "order_xxx"
}
```

### Admin APIs

#### Homepage
- `GET /api/admin/homepage`: fetches `heroSlides`, `stats`, `howItWorks`, `testimonials`
- `PUT /api/admin/homepage`: upserts section items

#### Trips
- `GET /api/admin/trips`: list all trips incl. relations
- `POST /api/admin/trips`: create trip + nested pricing/itinerary/departures
- `GET /api/admin/trips/:id`: fetch single trip
- `PUT /api/admin/trips/:id`: update trip + replace nested relations
- `DELETE /api/admin/trips/:id`: soft deactivate (`is_active=false`)

#### Categories
- `GET /api/admin/categories`
- `POST /api/admin/categories`
- `PUT /api/admin/categories/:id`
- `DELETE /api/admin/categories/:id` (soft deactivate)

#### Blogs
- `GET /api/admin/blogs`
- `POST /api/admin/blogs`
- `GET /api/admin/blogs/:id`
- `PUT /api/admin/blogs/:id`
- `DELETE /api/admin/blogs/:id`

#### Gallery
- `GET /api/admin/gallery`
- `POST /api/admin/gallery`
- `PUT /api/admin/gallery/:id`
- `DELETE /api/admin/gallery/:id`

#### Enquiries
- `GET /api/admin/enquiries?status=...`
- `PUT /api/admin/enquiries/:id`
- `DELETE /api/admin/enquiries/:id`

#### Bookings
- `GET /api/admin/bookings`
- `GET /api/admin/bookings/:id`
- `PUT /api/admin/bookings/:id`
- `DELETE /api/admin/bookings/:id`

### Seed/Sync APIs
- `POST /api/seed`: seeds homepage, categories, trips, related tables
- `POST /api/seed/sync-trips`: upsert-like sync for local trips to DB

## Frontend-Consumed APIs (client side)

Internal API calls from frontend pages/components:
- `/api/auth/register`
- `/api/payment/create-order`
- `/api/payment/verify`
- `/api/admin/*` endpoints from admin pages

External runtime APIs/services consumed in frontend:
- Razorpay Checkout script: `https://checkout.razorpay.com/v1/checkout.js`
- WhatsApp lead open: `https://wa.me/919899157292?text=...`

Authentication mode across APIs:
- App relies on Supabase session cookies for user-facing auth state
- Admin API routes currently do not perform explicit request-time admin token/session verification in handler code

---

## 7. Admin Panel

### Admin Functionalities
- Dashboard metrics for trips, enquiries, bookings, revenue, dues
- Trip lifecycle management (create/edit/deactivate)
- Category management
- Blog lifecycle management (draft/publish/edit/delete)
- Gallery CRUD and activation toggles
- Enquiry triage via status transitions
- Booking status and payment review/update/delete
- Homepage section content updates

### Admin Routes and Pages
- `/admin`
- `/admin/trips`
- `/admin/trips/[id]`
- `/admin/categories`
- `/admin/enquiries`
- `/admin/bookings`
- `/admin/blogs`
- `/admin/blogs/[id]`
- `/admin/gallery`
- `/admin/settings`

### Admin-Specific APIs
All `/api/admin/*` routes listed in section 6 are admin-functional endpoints.

### API Key Usage and `.env.local` Setup
Admin operations and script flows depend on:
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, highly privileged)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Razorpay admin/payment backend usage:
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

Suggested `.env.local` template:
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Role-Based Access Control
- Role storage: `admin_users` table
- Route guard: `src/proxy.ts`
- UI route-level enforcement present for `/admin/*`
- API route-level RBAC is not explicitly implemented in route handlers (see Known Issues)

---

## 8. Database Design

### Core Tables

#### Content/Home
- `hero_slides`
- `stats`
- `how_it_works`
- `testimonials`

#### Trip Domain
- `trip_categories`
- `trips`
- `trip_pricing` (`trip_id` FK -> `trips`)
- `trip_itinerary` (`trip_id` FK -> `trips`)
- `trip_departures` (`trip_id` FK -> `trips`)

#### CMS/Marketing
- `blog_posts`
- `gallery_images`
- `enquiries`

#### Auth/User/Admin
- `profiles` (`id` FK -> `auth.users.id`)
- `admin_users` (`id` FK -> `auth.users.id`)

#### Booking/Payments
- `bookings`
- optional/legacy: `booking_riders` table exists in schema file but active booking flow stores rider list in JSON (`bookings.riders`)

### Relationships
- `trip_categories (1) -> (many) trips`
- `trips (1) -> (many) trip_pricing`
- `trips (1) -> (many) trip_itinerary`
- `trips (1) -> (many) trip_departures`
- `auth.users (1) -> (1) profiles`
- `auth.users (1) -> (0/1) admin_users`
- booking design evolved from normalized (`trip_id`, `departure_id`) to denormalized order snapshot fields (`trip_title`, `packages`, `riders`, etc.)

### Schema Notes
Multiple SQL files show schema evolution and migration steps:
- Initial schema in `supabase/schema.sql`
- Bookings recreation in `supabase/migrations/20260413_create_bookings.sql`
- Follow-up patches in `supabase/update_bookings_table.sql` and `supabase/fix_existing_bookings.sql`

---

## 9. Environment Configuration

## Variables Used in Runtime/App Code

| Variable | Used In | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase client/server factories, proxy, auth API | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser and SSR clients | public anon API key |
| `SUPABASE_SERVICE_ROLE_KEY` | admin server client, register API, scripts | privileged DB/admin operations |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | booking client + create-order route response | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | payment create-order and verify routes | Razorpay signing secret |

## Script/Operational Environment
- `scripts/setup-admin.mjs` and `scripts/check-schema.ts` require Supabase env variables loaded from `.env.local`

## Security Guidance
- Keep `SUPABASE_SERVICE_ROLE_KEY` and `RAZORPAY_KEY_SECRET` server-only
- Never expose service role key to client-side bundles
- Rotate leaked credentials immediately (see `scripts/uploadGallery.js` caveat)

---

## 10. Third-Party Integrations

### Supabase
- Authentication (email/password)
- Postgres database access
- SSR and browser client usage

### Razorpay
- Order creation (`razorpay.orders.create`)
- Checkout modal in frontend
- Signature verification via HMAC SHA-256

### Cloudinary
- Remote image hosting (`next.config.ts` allows `res.cloudinary.com`)
- Gallery and trip imagery usage
- Upload helper script (`scripts/uploadGallery.js`)

### WhatsApp
- Contact flow opens prefilled WhatsApp message for lead capture

### Social Platforms
- External profile links in footer/contact pages (Instagram, YouTube, Facebook, X/Twitter)

---

## 11. Deployment Details

### Build and Run
`package.json` scripts:
- `npm run dev` -> local development
- `npm run build` -> production build
- `npm run start` -> production server
- `npm run lint` -> linting

### Hosting Platform
- Not explicitly declared in repository configuration files.
- Domain in metadata indicates production branding: `https://k2kadventurez.com`.
- Typical Next.js hosting target is Vercel or Node-capable platform.

### Build/Deploy Prerequisites
- Node environment compatible with Next 16 + React 19
- `.env.local` values configured for Supabase and Razorpay
- Supabase schema/migrations applied before production use

---

## 12. Additional Notes

### Assumptions
- App Router behavior and runtime are aligned with Next.js 16 in this project
- Admin pages are intended to be protected by middleware and admin table membership

### Known Issues and Risks
1. `/api/admin/*` routes are not explicitly authorization-guarded in handlers; they use service-role DB client directly.
2. `scripts/uploadGallery.js` currently contains hardcoded Cloudinary secrets (security risk).
3. Contact page currently routes leads to WhatsApp only; it does not persist enquiry records to `enquiries` table in this implementation.
4. Admin sidebar Sign Out button in `admin/layout.tsx` has no implemented action handler.
5. Dependencies `react-hook-form`, `zod`, and `zustand` are installed but not materially used in current runtime code paths.
6. Bookings schema has signs of evolution/mixed patterns; ensure DB state matches current API expectations.

### Future Improvements
1. Add strict server-side authorization middleware/helpers for all `/api/admin/*` endpoints.
2. Move all secrets to env variables and rotate exposed credentials.
3. Add robust schema validation (Zod) for all API payloads.
4. Add centralized error handling + structured API error format.
5. Add automated tests for payment verification and admin CRUD endpoints.
6. Wire contact form to persist enquiries in database and optionally notify admins.
7. Implement admin logout in sidebar with secure session termination.
8. Add audit logs for admin mutations.

---

## Appendix A: API Method Matrix

| Endpoint | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/api/auth/register` | - | yes | - | - |
| `/api/payment/create-order` | - | yes | - | - |
| `/api/payment/verify` | - | yes | - | - |
| `/api/seed` | - | yes | - | - |
| `/api/seed/sync-trips` | - | yes | - | - |
| `/api/admin/homepage` | yes | - | yes | - |
| `/api/admin/trips` | yes | yes | - | - |
| `/api/admin/trips/:id` | yes | - | yes | yes |
| `/api/admin/categories` | yes | yes | - | - |
| `/api/admin/categories/:id` | - | - | yes | yes |
| `/api/admin/blogs` | yes | yes | - | - |
| `/api/admin/blogs/:id` | yes | - | yes | yes |
| `/api/admin/gallery` | yes | yes | - | - |
| `/api/admin/gallery/:id` | - | - | yes | yes |
| `/api/admin/enquiries` | yes | - | - | - |
| `/api/admin/enquiries/:id` | - | - | yes | yes |
| `/api/admin/bookings` | yes | - | - | - |
| `/api/admin/bookings/:id` | yes | - | yes | yes |

---

## Appendix B: Route Access Summary

- Public: all marketing/content pages, auth pages, booking page shell
- Auth-required action: booking completion requires logged-in session in booking client flow
- User-only page: `/dashboard`
- Admin UI page group: `/admin/*` (guarded by `src/proxy.ts`)

---

This document reflects the current repository implementation and SQL scripts as of April 15, 2026.
