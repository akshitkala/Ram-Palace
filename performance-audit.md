═══════════════════════════════════════════
BASTI RAM PALACE — PERFORMANCE AUDIT
═══════════════════════════════════════════

SEVERITY LEGEND
  🔴 CRITICAL  — Actively hurting load time
                 or causing layout shift
  🟠 HIGH      — Noticeable slowness,
                 easy to fix
  🟡 MEDIUM    — Worth fixing before launch
  🟢 LOW       — Minor, fix when time permits

═══════════════════════════════════════════
SUMMARY
═══════════════════════════════════════════

Total issues found: 18
  🔴 Critical: 4
  🟠 High:     6
  🟡 Medium:   5
  🟢 Low:      3

Estimated performance impact if all fixed:
  Largest Contentful Paint (LCP) could improve by ~1.5s - 2s on mobile. Cumulative Layout Shift (CLS) would drop to near-zero. Total bundle size could be reduced by ~120KB. Time to Interactive (TTI) would improve significantly on mid-range devices by reducing main-thread blocking from heavy layout-triggering animations.

═══════════════════════════════════════════
A. IMAGES
═══════════════════════════════════════════

🔴 [src/app/gallery/page.jsx:194] — Using standard <img> tag instead of next/image.
  Impact: Misses automatic image optimization, format conversion (avif/webp), and progressive loading.
  Fix:    Replace <img> with Next.js <Image> component.

🔴 [src/app/gallery/page.jsx:194] — Missing width and height on gallery grid images.
  Impact: Causes severe Cumulative Layout Shift (CLS) as images pop in.
  Fix:    Add explicit width/height or use 'aspect-square' with 'fill' correctly.

🟠 [src/components/Carousel.jsx:70] — All carousel images are mounted and loaded simultaneously.
  Impact: Unnecessary bandwidth usage for images that aren't yet visible.
  Fix:    Only render the active, previous, and next slides.

🟠 [src/components/MiniGallery.jsx:31,98] — Image list is tripled for infinite loop (rendering ~60 images).
  Impact: Heavy DOM weight and multiple concurrent image requests on mount.
  Fix:    Use a virtualized loop or limit the number of duplicated elements.

🟡 [Across App] — Many images in public/ are .jpg or .png (e.g., logo.png, heroAbout.png, Menu.png).
  Impact: Larger file sizes than modern .webp or .avif.
  Fix:    Convert all public/ images to .webp.

✅ GOOD: [src/components/Hero.jsx:52] — Correct use of 'priority' on LCP image.
✅ GOOD: [src/app/Menu/page.jsx:17] — Replaced heavy category images with CSS gradients.

═══════════════════════════════════════════
B. FONTS
═══════════════════════════════════════════

🟠 [src/app/layout.jsx:18] — Loading 12 different font weights/styles from Google Fonts.
  Impact: Significant blocking time for font discovery and download.
  Fix:    Limit to 300, 400, 600 weights and only one italic variant.

✅ GOOD: [src/app/layout.jsx:16] — Preconnect and display=swap are correctly implemented.

═══════════════════════════════════════════
C. JAVASCRIPT BUNDLES
═══════════════════════════════════════════

🟠 [package.json:19] — 'framer-motion' is included (~100KB+) but used sparingly.
  Impact: Large bundle overhead.
  Fix:    Replace Testimonial.jsx motion with lightweight GSAP animations (already in use elsewhere).

🟡 [src/components/Navbar.jsx:1] — Entire Navbar is a massive Client Component.
  Impact: Increases hydration time for every page.
  Fix:    Split into Server Component (links) and small Client Component (mobile menu toggler).

═══════════════════════════════════════════
D. API CALLS
═══════════════════════════════════════════

🔴 [src/app/api/images/gallery/route.js:6] — GET handler has no cache-control headers.
  Impact: Every gallery view triggers a fresh Cloudinary API call (slow).
  Fix:    Add 'stale-while-revalidate' or 'max-age' cache headers.

🟠 [src/app/api/admin/stats/route.js:5] — Fetches 5 separate Cloudinary folders on every mount.
  Impact: Slow admin dashboard loading due to API waterfall.
  Fix:    Cache stats in a simple DB or use a single Cloudinary search query with OR prefix.

✅ GOOD: [src/components/Events.jsx:160] — Uses Promise.allSettled for parallel fetching.

═══════════════════════════════════════════
E. ANIMATIONS
═══════════════════════════════════════════

🟠 [src/components/AntiGravitySection.jsx:51] — 'will-change-transform' applied to every section.
  Impact: Excessive GPU memory usage, can cause performance degradation on mobile.
  Fix:    Apply will-change only when the section is near the viewport or removing it entirely as modern browsers optimize transforms well.

🟡 [src/components/Testimonial.jsx:91] — Word-by-word animation creates hundreds of DOM nodes.
  Impact: Heavy layout/paint cycles during testimonial transitions.
  Fix:    Animate whole lines or the entire block instead of individual words.

✅ GOOD: [src/components/Preloader.jsx] — Use of useLayoutEffect and cleanup prevent memory leaks.

═══════════════════════════════════════════
F. NEXT.JS SPECIFIC
───────────────────

🟡 [next.config.mjs:2] — Missing image optimization configuration for Cloudinary subfolders.
  Impact: Potential for suboptimal resizing.
  Fix:    Ensure remotePatterns are as narrow as possible.

✅ GOOD: [src/app/gallery/layout.jsx] — Layouts are Server Components, keeping the router efficient.

═══════════════════════════════════════════
G. CSS
──────

🟡 [src/app/globals.css:109] — Multiple instances of backdrop-filter: blur(18px).
  Impact: Very expensive repaint cost, especially on mobile browsers.
  Fix:    Reduce blur radius or use a semi-opaque solid color for simpler browsers.

═══════════════════════════════════════════
H. NETWORK
──────────

🟡 [src/app/api/images/gallery/route.js:33] — Returning full Cloudinary metadata objects.
  Impact: Inflated JSON response size.
  Fix:    Return only strictly necessary fields (secure_url, public_id, width, height).

═══════════════════════════════════════════
I. MEMORY LEAKS
───────────────

🟢 [src/components/ClientLayoutWrapper.jsx:24] — LocomotiveScroll cleanup.
  ✅ GOOD: Properly destroyed on unmount.

═══════════════════════════════════════════
J. RENDER PERFORMANCE
──────────────────────

🔴 [src/app/gallery/page.jsx:188] — List of 100+ images rendered without virtualization.
  Impact: Severe memory usage and slow scrolling on low-end devices.
  Fix:    Implement virtualization or keep keeping the list lean as part of infinite scroll.

═══════════════════════════════════════════
PRIORITY FIX ORDER
═══════════════════════════════════════════

Fix these first for maximum impact:

1. 🔴 Convert <img> to <Image> — src/app/gallery/page.jsx — [+LCP, +Optimization]
2. 🔴 Add Dimensions to Images — src/app/gallery/page.jsx — [+CLS Score]
3. 🔴 Add API Caching Headers — API Routes — [Reduced Latency]
4. 🔴 Virtualize/Render-Limit Image Lists — Gallery & MiniGallery — [Memory Savings]
5. 🟠 Reduce Font Weights — src/app/layout.jsx — [Reduced First Byte/Blocking]
6. 🟠 Optimize Carousel Loading — src/components/Carousel.jsx — [Bandwidth Savings]
7. 🟠 Remove will-change from All Sections — src/components/AntiGravitySection.jsx — [GPU Memory]
8. 🟠 Replace Framer Motion — src/components/Testimonial.jsx — [Bundle Size -100KB]
9. 🟡 Simplify Backdrop Blurs — src/app/globals.css — [Mobile Smoothness]
10. 🟡 Reduce API Response Payload — API Routes — [Network Speed]

═══════════════════════════════════════════
BUNDLE SIZE ESTIMATE
═══════════════════════════════════════════

List every significant dependency from package.json:

  gsap:          ~90KB gzipped (High use, justified)
  framer-motion: ~105KB gzipped (Low use, recommendation: REMOVE)
  locomotive-scroll: ~15KB gzipped
  react/react-dom: ~45KB gzipped
  next:          ~75KB gzipped
  lucide/tabler icons: ~30KB (Check tree-shaking)

Total estimated JS: ~360KB gzipped
Target for this type of site: <200KB gzipped

═══════════════════════════════════════════
CORE WEB VITALS PREDICTION
═══════════════════════════════════════════

Based on the issues found, estimate:

  LCP (Largest Contentful Paint):
    Current estimate: NEEDS WORK (~3.5s on 4G)
    Main culprit: Excessive font loading and uncached API images.

  CLS (Cumulative Layout Shift):
    Current estimate: POOR (>0.25)
    Main culprit: Missing width/height on Gallery grid images.

  FID/INP (Interactivity):
    Current estimate: GOOD (<100ms)
    Main culprit: None, but main-thread can be busy due to word-by-word animations.

═══════════════════════════════════════════
END OF REPORT
═══════════════════════════════════════════
