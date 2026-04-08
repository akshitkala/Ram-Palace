# Codebase Audit — Basti Ram Palace
Date: 2026-04-07

## 1. File Tree

```
src/Data/Testimonial.js
src/Data/catering.js
src/Data/events.js
src/Data/gallery.js
src/Data/menu.js
src/app/about/page.jsx
src/app/admin/dashboard/page.jsx
src/app/admin/login/page.jsx
src/app/admin/page.jsx
src/app/api/admin/login/route.js
src/app/api/admin/logout/route.js
src/app/api/enquiry/route.js
src/app/api/images/carousel/route.js
src/app/api/images/events/route.js
src/app/api/images/gallery/route.js
src/app/brp-portal-login/login/page.jsx
src/app/brp-portal-login/page.jsx
src/app/catering/layout.jsx
src/app/catering/page.jsx
src/app/contact/layout.jsx
src/app/contact/page.jsx
src/app/events/corporate-events/layout.jsx
src/app/events/corporate/page.jsx
src/app/events/page.jsx
src/app/events/private-parties/layout.jsx
src/app/events/weddings/layout.jsx
src/app/gallery/layout.jsx
src/app/gallery/page.jsx
src/app/layout.jsx
src/app/menu/layout.jsx
src/app/menu/page.jsx
src/app/page.jsx
src/app/robots.js
src/app/services/layout.jsx
src/app/services/page.jsx
src/app/sitemap.js
src/components/AntiGravitySection.jsx
src/components/Carousel.jsx
src/components/Catering/CateringCTA.jsx
src/components/Catering/CateringGallery.jsx
src/components/Catering/CateringHero.jsx
src/components/Catering/CateringStats.jsx
src/components/Catering/CulinaryPhilosophy.jsx
src/components/Catering/EventsWeCater.jsx
src/components/Catering/ServiceExcellence.jsx
src/components/Catering/TrustedClients.jsx
src/components/CateringFeature.jsx
src/components/Events.jsx
src/components/Footer.jsx
src/components/Gallery/GalleryGrid.jsx
src/components/Gallery/GalleryHero.jsx
src/components/Gallery/GalleryLightbox.jsx
src/components/Hero.jsx
src/components/HeroAboutSection.jsx
src/components/HomeEnquiry.jsx
src/components/Menu/MenuCategorySection.jsx
src/components/Menu/MenuFinalCTA.jsx
src/components/Menu/MenuFloatingNav.jsx
src/components/Menu/MenuHero.jsx
src/components/Menu/MenuIntro.jsx
src/components/Menu/MenuStickyNav.jsx
src/components/Menu/MenuTicker.jsx
src/components/MiniGallery.jsx
src/components/Preloader.jsx
src/components/Services/EventTypesGrid.jsx
src/components/Services/HowToBook.jsx
src/components/Services/ServicesCTA.jsx
src/components/Services/ServicesHero.jsx
src/components/Services/VenueStats.jsx
src/components/Services/WhatsIncluded.jsx
src/components/StructuredData.jsx
src/components/Testimonial.jsx
src/components/admin/ConfirmDeleteModal.jsx
src/components/admin/ConfirmDialog.jsx
src/components/admin/Lightbox.jsx
src/components/admin/Toast.jsx
src/components/admin/ToastSystem.jsx
src/components/events/EventAnimations.jsx
src/components/events/EventNavTabs.jsx
src/components/events/EventPageTemplate.jsx
src/lib/auth/verifySession.js
src/lib/cloudinary.js
src/lib/emails/enquiryConfirmation.js
src/lib/emails/enquiryNotification.js
src/lib/resend.js
src/middleware.js
```

## 2. API Routes

### Admin Login
- **Path**: `src/app/api/admin/login/route.js`
- **HTTP methods**: POST
- **Purpose**: Authenticates admin using env variables and signs a JWT token with `jose`. Sets an `admin_token` cookie.
- **Inputs**: JSON `{ username, password }`
- **Outputs**: JSON success or error `{ error: 'Invalid credentials' }`
- **Status**: WORKING
- **Notes**: Includes in-memory rate limiting (5 attempts per IP). Uses `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`.

### Admin Logout
- **Path**: `src/app/api/admin/logout/route.js`
- **HTTP methods**: POST
- **Purpose**: Clears the `admin_token` cookie.
- **Inputs**: None
- **Outputs**: JSON `{ success: true }`
- **Status**: WORKING
- **Notes**: Clears both `admin_token` and an old `admin_session` cookie for safety.

### Enquiry Submission
- **Path**: `src/app/api/enquiry/route.js`
- **HTTP methods**: POST
- **Purpose**: Handles contact form enquiries, sends emails to venue owners and a confirmation to the user using Resend.
- **Inputs**: JSON `{ name, email, phone, message, eventType, guestCount, eventDate }`
- **Outputs**: JSON `{ success: true, id: '...' }` or error.
- **Status**: WORKING
- **Notes**: Includes simple rate limiting (3 requests/10min). Validates email format and Indian phone numbers. Handles multiple owner emails from env.

### Carousel Images
- **Path**: `src/app/api/images/carousel/route.js`
- **HTTP methods**: GET / POST / DELETE
- **Purpose**: Manages global homepage carousel slides in Cloudinary (`ram-palace/carousel` folder).
- **Inputs**: POST expects FormData `file`; DELETE expects JSON `{ public_id }`.
- **Outputs**: GET returns JSON `{ images: [...] }`.
- **Status**: WORKING
- **Notes**: Limit of 8 slides enforced for performance. CSRF/Auth handled via `verifySession`.

### Event Images
- **Path**: `src/app/api/images/events/route.js`
- **HTTP methods**: GET / POST / DELETE
- **Purpose**: Manages event-specific images grouped by category (`ram-palace/events/{category}`).
- **Inputs**: GET takes `category` query param; POST takes FormData `file` and `category`.
- **Outputs**: JSON list of images or the created image object.
- **Status**: WORKING
- **Notes**: Validates category against `['weddings', 'corporate', 'private-parties']`.

### Gallery Images
- **Path**: `src/app/api/images/gallery/route.js`
- **HTTP methods**: GET / POST / DELETE
- **Purpose**: Manages high-res images for the main gallery page (`ram-palace/gallery` folder).
- **Inputs**: GET supports pagination (cursor-based).
- **Outputs**: JSON with `images`, `nextCursor`, and `hasMore`.
- **Status**: WORKING
- **Notes**: Initial load limit increased to 24 for better performance.

**Cloudinary Folders Used:**
- `ram-palace/carousel`
- `ram-palace/events/{category}`
- `ram-palace/gallery`

**Environment Variables Referenced:**
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `RESEND_API_KEY`
- `FROM_NAME`, `FROM_EMAIL`
- `OWNER_EMAIL_1`, `OWNER_EMAIL_2`, `OWNER_EMAIL_3`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

**Middleware Protection:** 
`middleware.js` protects all `/brp-portal-login/` routes (except for `/login`) by verifying the JWT `admin_token`.

## 3. Pages

### Home
- **Route**: `/`
- **File**: `src/app/page.jsx`
- **Type**: Server Component
- **Purpose**: Landing page with Hero, About, Carousel, Events, Mini-Gallery, and Enquiry.
- **API calls**: None directly (server component).
- **Components**: `Hero`, `Carousel`, `Events`, `MiniGallery`, `HomeEnquiry`, etc.
- **Status**: WORKING

### About
- **Route**: `/about`
- **File**: `src/app/about/page.jsx`
- **Type**: Server Component
- **Purpose**: "Coming Soon" placeholder for the About page.
- **API calls**: None.
- **Status**: INCOMPLETE/STUBBED
- **Notes**: Minimalist implementation with only a contact number.

### Gallery
- **Route**: `/gallery`
- **File**: `src/app/gallery/page.jsx`
- **Type**: Client Component
- **Purpose**: Comprehensive infinite-scroll gallery using IntersectionObserver.
- **API calls**: `/api/images/gallery` (GET).
- **Components**: `GalleryHero`, `GalleryGrid`, `GalleryLightbox`.
- **Status**: WORKING
- **Notes**: Uses GSAP for entrance animations and standard React state for the lightbox.

### Menu
- **Route**: `/menu`
- **File**: `src/app/menu/page.jsx`
- **Type**: Client Component
- **Purpose**: Detailed menu listing with sticky navigation and category filtering.
- **API calls**: None (uses static `src/Data/menu.js`).
- **Components**: `MenuHero`, `MenuStickyNav`, `MenuCategorySection`, etc.
- **Status**: WORKING
- **Notes**: Advanced GSAP usage with `ScrollTrigger` and a `MenuTicker`.

### Contact
- **Route**: `/contact`
- **File**: `src/app/contact/page.jsx`
- **Type**: Client Component
- **Purpose**: Contact page with enquiry form submission.
- **API calls**: `/api/enquiry` (POST).
- **Status**: WORKING
- **Notes**: Displays success message after submission. Background image is static.

### Events (Individual Pages)
- **Routes**: `/events/weddings`, `/events/corporate`, `/events/private-parties`
- **Type**: Client Components (using `EventPageTemplate`)
- **API calls**: `/api/images/events?category=...`
- **Status**: WORKING
- **Notes**: Uses a generic `EventPageTemplate` powered by GSAP.

### Admin Dashboard (Portal)
- **Route**: `/brp-portal-login`
- **File**: `src/app/brp-portal-login/page.jsx`
- **Type**: Client Component
- **Purpose**: Protected management portal for gallery, carousel, and events.
- **API calls**: All `/api/images/*` endpoints (GET/POST/DELETE).
- **Status**: WORKING
- **Notes**: Robust implementation including bulk actions, upload progress, and toasted notifications.

## 4. Components

Comprehensive component mapping of major building blocks: [Truncated for brevity, focusing on core logic]

- **src/components/Carousel.jsx**: Client Component. Fetches carousel images via API. Implements auto-slide and touch gestures. No external libraries like GSAP used. Status: **WORKING**.
- **src/components/Events.jsx**: Client Component. Manages 3 event categories. Auto-cycles images by picking a random category every 1-2 seconds. Status: **WORKING**.
- **src/components/Gallery/GalleryGrid.jsx**: Client Component. Renders images in a grid with `layout-shift-safe` logic for Next.js `Image`. Status: **WORKING**.
- **src/components/Preloader.jsx**: Client Component. High-fidelity GSAP preloader with SVG animation. Status: **WORKING**.

## 5. Lib / Utilities

- **src/lib/auth/verifySession.js**: Export `verifySession`. Validates admin JWT. Used by all protected API routes. Status: **WORKING**.
- **src/lib/cloudinary.js**: Configures and exports the Cloudinary SDK. Status: **WORKING**.
- **src/lib/resend.js**: Configures and exports the Resend SDK. Status: **WORKING**.
- **src/lib/emails/...**: HTML templates for enquiries. Status: **WORKING**.

## 6. Admin Panel

**Current Sections:**
- **Gallery tab**: Upload/Delete venue photos.
- **Carousel tab**: Direct management of homepage slides (Limit 8).
- **Events tab**: Category-based management (Weddings/Corporate/Private).

**Logic:**
- **Listing**: GET `/api/images/{section}`
- **Uploading**: POST `/api/images/{section}` via FormData. Single-file sequential uploads for bulk selection are implemented in the UI.
- **Deleting**: DELETE `/api/images/{section}` via `public_id`.
- **Bulk actions**: Supports multiple selection and sequential deletion.

**Authentication:**
- Password-protected with JWT session stored in HTTP-only `admin_token` cookie.
- Middleware handles route protection automatically.
- Logout clears the local cookie.

## 7. Environment Variables

Reference check against `.env.local`:

| Key | Status | Notes |
| :--- | :--- | :--- |
| `CLOUDINARY_CLOUD_NAME` | OK | Real value |
| `NEXT_PUBLIC_SITE_URL` | OK | Localhost:3000 |
| `ADMIN_USERNAME` | OK | "admin" |
| `ADMIN_PASSWORD` | OK | "123" |
| `RESEND_API_KEY` | OK | Real value |
| `OWNER_EMAIL_1` | OK | Real email |
| `JWT_SECRET` | **MISSING** | Missing from `.env.local` but required by middleware and login. |

## 8. Packages

- **Next.js**: v15.3.0
- **React**: v19.2.0
- **GSAP**: v3.14.2 (Installed and used extensively)
- **Cloudinary**: v2.9.0 (Installed and used)
- **Resend**: v6.9.3 (Installed and used)
- **Multer**: Installed (`^2.1.1`) but seemingly **UNUSED** in favour of `request.formData()` in Next.js App Router (Grep search found 0 imports).

## 9. Known Issues

### CRITICAL
- [ ] `JWT_SECRET` is missing from environment — Middleware will fail on production/Vercel (breaks admin login) — `.env.local`
- [ ] `/api/admin/login` rate limiting is in-memory only — will reset on Vercel serverless function warmups — `src/app/api/admin/login/route.js:9`

### MODERATE
- [ ] Sub-event pages (e.g., `/events/weddings`) use hardcoded absolute URLs for `canonical` and `og:url` metadata — `src/app/events/corporate/page.jsx:9`
- [ ] Home gallery pagination is stubbed with a static limit of 24, although the API supports cursors — `src/app/gallery/page.jsx:12`

### MINOR
- [ ] `about/page.jsx` is essentially an empty shell with "Coming Soon" — `src/app/about/page.jsx`
- [ ] `multer` package is installed but unused, contributing to package bloat — `package.json`

## 10. Working vs Not Working

### CONFIRMED WORKING
- Home, Gallery, Menu, and Services pages.
- Admin portal: Login, Upload, Delete, Bulk operations.
- Enquiry submission and email delivery (Resend integration).
- GSAP Preloader and Scroll animations.
- Dynamic Cloudinary image loading for homepage sections.

### NOT YET WORKING / INCOMPLETE
- About Us page: Substantive content missing (`src/app/about/page.jsx`).
- Social Media metadata: Many OpenGraph images are hardcoded placeholders (`src/app/layout.jsx`).
- Site Search: Component often mentioned or seen in UI but has no logic integration.
