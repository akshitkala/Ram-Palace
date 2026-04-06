# Basti Ram Palace — Pre-Launch Audit Report
**Date:** March 28, 2026
**Status:** 🔴 NOT READY FOR LAUNCH

---

## ⚖️ SEVERITY LEGEND
- 🔴 **BLOCKER**: Must fix before go-live. Security or core functional failure.
- 🟠 **HIGH**: Highly recommended. SEO loss, UX friction, or potential security risk.
- 🟡 **MEDIUM**: Nice-to-have. Minor UI polish or optimization.
- 🔵 **LOW**: Trivial copy etc.
- ✅ **GOOD**: Passes audit.

---

## 1. 🛡️ SECURITY & AUTHENTICATION
| Item | Status | Finding | Recommendation |
| :--- | :--- | :--- | :--- |
| **Secrets Check** | ✅ GOOD | No hardcoded Resend or Cloudinary keys found in Checked files. | - |
| **Admin Auth API** | 🔴 BLOCKER | API routes for Image management (`gallery`, `carousel`, `events`) lack session verification in `POST`/`DELETE`. | Implement `cookies().get('admin_session')` check in every modifying API route. |
| **Middleware** | ✅ GOOD | Admin routes are protected by a middleware check. | - |
| **Brute Force** | 🟠 HIGH | No rate limiting on `/api/admin/login`. | Implement simple rate limiting (e.g., `lru-cache` or external service). |
| **Form Safety** | 🟠 HIGH | Enquiry form lacks rate limiting and HTML sanitization of user strings. | Sanitize inputs before generating HTML emails; add rate limiting. |

## 2. ⚙️ BACKEND & API INTEGRITY
| Item | Status | Finding | Recommendation |
| :--- | :--- | :--- | :--- |
| **API Endpoints** | 🔴 BLOCKER | `/api/images/events` call in `Events.jsx` is broken (`404`) due to wrong path construction. | Fix frontend call to use query params: `?category=...`. |
| **Enquiry Data** | 🟠 HIGH | Contact page sends `guestCount` and `eventDate`, but Enquiry API route completely ignores them. | Update `POST /api/enquiry` to destructure and include these in the email template. |
| **Email Templates**| 🔴 BLOCKER | `lib/emails/` templates still contain "Civil Lines, Basti, UP" address. | Update with Manesar address immediately. |
| **Cloudinary** | ✅ GOOD | Using consistent folder structure and auto-transformations. | - |

## 3. 🎨 FRONTEND UI/UX
| Item | Status | Finding | Recommendation |
| :--- | :--- | :--- | :--- |
| **Copy & Brand** | 🔴 BLOCKER | Hero and Events sections mention "Basti's most beloved" or "Basti's families". | Replace with "Manesar" or "Gurugram" to avoid brand confusion. |
| **Asset Delivery** | ✅ GOOD | `next/image` utilized with proper priority and scaling for Hero/Carousel. | - |
| **Footer Copy** | ✅ GOOD | Footer contains correct coordinates, phone numbers, and 2026 copyright. | - |
| **Navigation** | 🟠 HIGH | Menu/Footer links use `/events/corporate-events`, but some components use `corporate`. | Standardize slug casing and ensuring all links match active routes. |

## 4. 🔍 SEO & METADATA
| Item | Status | Finding | Recommendation |
| :--- | :--- | :--- | :--- |
| **Base Domain** | 🟠 HIGH | `layout.jsx`, `sitemap.js`, and `robots.js` use `ram-palace.vercel.app` as base URL. | Switch all to `https://bastirampalace.com`. |
| **Robots.txt** | ✅ GOOD | Properly hiding `/admin` and pointing to sitemap. | - |
| **Meta Tags** | ✅ GOOD | Rich OG/Twitter metadata populated in Root Layout. | - |
| **Structured Data**| 🟡 MEDIUM | JSON-LD `EventVenue` schema is missing. | Add to home page to improve local SEO snippet. |

## 5. ⚡ PERFORMANCE & BUILD
| Item | Status | Finding | Recommendation |
| :--- | :--- | :--- | :--- |
| **Bundle Weight** | 🟡 MEDIUM | Use of `framer-motion` + `gsap` + `locomotive-scroll` creates overlap. | Future refactor: consolidate to one animation library. |
| **Image Qualities**| ✅ GOOD | Mobile specific quality and sizes defined in `next.config.mjs`. | - |
| **Font Loading** | ✅ GOOD | Using Google Fonts with `preconnect` and `display=swap`. | - |

---

## 🏗️ ORDERED FIX LIST (Priority)
1. 🔴 **Blocker**: Protect `/api/images/*` (POST/DELETE) with session logic.
2. 🔴 **Blocker**: Update all "Basti UP" copy to "Manesar/Gurugram" (Hero, Events).
3. 🔴 **Blocker**: Fix Broken API call in `Events.jsx`.
4. 🔴 **Blocker**: Fix address in Email templates (`src/lib/emails/`).
5. 🟠 **High**: Update Enquiry API to capture/send Guest Count and Date.
6. 🟠 **High**: Update all URLs to use `bastirampalace.com` instead of `.vercel.app`.
7. 🟠 **High**: Add rate limiting to Login and Enquiry routes.

---

## 🏁 LAUNCH VERDICT
> [!CAUTION]
> **GO/NO-GO: NO-GO** 🛑
>
> The application has critical security gaps in image management and broken functional routes (Events Gallery). Additionally, the copy refers to the wrong geographic location (Basti vs Manesar). These must be addressed before public launch.
