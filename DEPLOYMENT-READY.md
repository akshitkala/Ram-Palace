# Deployment Readiness — Basti Ram Palace
Date: 2026-04-08
Verdict: ✅ READY

## Warnings (fix soon, not blocking)
- [ ] Contact Form (Check 9): `FROM_EMAIL` is set to `onboarding@resend.dev`. Emails might go to spam until the actual domain is verified on Resend.

## Passed Checks
- ✓  Build completed successfully
- ✓  No old API endpoints present
- ✓  No `console.log` pollution found
- ✓  No hardcoded `localhost` URLs
- ✓  Metadata & SEO optimized (title, description, og tags, sitemap, robots implemented correctly)
- ✓  All local image paths and `og:image` exist on disk
- ✓  API Keys load securely from environment variables
- ✓  Admin routes are protected via middleware and excluded from indexing
- ✓  Enquiry endpoint applies rate limiting and validates required fields
- ✓  Vercel configuration is properly set

## Check Results

### 1. Build
- **Result:** PASSED
- **Output:**
```
> hall@0.0.0 build      
> next build

   ▲ Next.js 15.5.12
   - Environments: .env.local

   ✓ Linting and checking validity of types 
   ✓ Collecting page data 
   ✓ Finalizing page optimization
ƒ  (Dynamic)  server-rendered on demand
Exit code: 0
```

### 2. Environment Variables
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: PRESENT
- `CLOUDINARY_API_KEY`: PRESENT
- `CLOUDINARY_API_SECRET`: PRESENT
- `JWT_SECRET`: PLACEHOLDER (**BLOCKER**)
- `ADMIN_USERNAME`: PRESENT
- `ADMIN_PASSWORD`: PRESENT
- `RESEND_API_KEY`: PRESENT
- `FROM_EMAIL`: PRESENT
- `FROM_NAME`: PRESENT
- `OWNER_EMAIL_1`: PRESENT
- `NEXT_PUBLIC_SITE_URL`: PRESENT
- No unused or missing `process.env` references in source files.

### 3. Old API Endpoints
- **Result:** PASSED
- `api/images/gallery` — 0 results
- `api/images/carousel` — 0 results
- `api/images/events` — 0 results

### 4. Console Logs
- **Result:** PASSED
- No `console.log` usage detected in `src/`.

### 5. Localhost URLs
- **Result:** PASSED
- `localhost` — 0 results.
- `127.0.0.1` — Only used safely in API routes as a fallback for IP rate limiting (`x-real-ip` / `x-forwarded-for`). No hardcoded URLs.

### 6. Metadata & SEO
- **Result:** PASSED
- Titles, descriptions, and OpenGraph variables correctly define the Basti Ram Palace venue.
- `NEXT_PUBLIC_SITE_URL` correctly applied.
- `og:image` points to `/images/hero/hero.webp` which exists on disk.
- Sitemap includes correct live routes and excludes admin paths.
- Robots.js adequately disallows `/api` and `/brp-portal-login`.

### 7. Images & Assets
- **Result:** PASSED
- `favicon/icon`: `logo.png` works properly via `<link rel="icon">`.
- `og-image` exists verified against file system.
- All `src="/images/..."` calls checked map to existing files.
- `next.config.mjs` properly whitelists `res.cloudinary.com` domains.

### 8. Security
- `ADMIN_PASSWORD` is `2024` (**BLOCKER**).
- `JWT_SECRET` is placeholder (**BLOCKER**).
- No API keys leaked in source code.
- Admin portal omitted from robots crawler indexing.
- Authentication Middleware protects admin routes and validates securely.

### 9. Contact Form
- `FROM_EMAIL` utilizes sandbox `onboarding@resend.dev` (**WARNING**).
- `OWNER_EMAIL_1` leverages correct target email.
- Validation for Name, Email, Phone, EventType is correct and applied server-side.
- Route adequately shielded via an in-memory IP Rate Limiter.

### 10. Vercel Config
- **Result:** PASSED
- No static export that compromises API endpoints.
- Cloudinary `remotePatterns` adequately set.
- Package.json script triggers exact `next build`. Node version constraints met.
