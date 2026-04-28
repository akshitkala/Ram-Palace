# Project Report: Basti Ram Palace (BRP) Website

## 1. Project Overview
**Project Name:** Basti Ram Palace (BRP)
**Nature:** Premium Event Venue & Marriage Hall Landing Page / Multi-page Application.
**Objective:** To showcase a high-end luxury event venue, manage bookings/enquiries, and provide a premium digital experience that matches the physical grandeur of the palace.
**Target Audience:** Couples planning weddings, corporate event organizers, and families looking for luxury event spaces.

---

## 2. Technology Stack
*   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
*   **Language:** JavaScript (ES6+)
*   **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) (Modern utility-first styling)
*   **Animations:** 
    *   [GSAP (GreenSock Animation Platform)](https://gsap.com/) for complex sequencing and parallax.
    *   [@gsap/react](https://www.npmjs.com/package/@gsap/react) for React-specific animation hooks.
    *   [Locomotive Scroll 5](https://locomotivemtl.github.io/locomotive-scroll/) for smooth, high-end scrolling experiences.
*   **Media Management:** [Cloudinary](https://cloudinary.com/) (Remote image/video hosting and optimization).
*   **Communication:** [Resend](https://resend.com/) for transactional email handling (enquiry notifications).
*   **Authentication:** JWT-based secure access for the admin portal (using `jose`).
*   **Deployment:** Vercel (implied by Next.js usage).

---

## 3. Architecture & File Structure
The project follows a modular Next.js App Router structure:

*   `/src/app`: Contains all routes and API endpoints.
    *   `/api`: Serverless functions for enquiries, admin auth, and image management.
    *   `/brp-portal-login`: Admin authentication entry point.
    *   `/gallery`, `/events`, `/catering`, `/services`: Public-facing feature pages.
*   `/src/components`: UI components organized by feature.
    *   `Hero.jsx`: Complex animated entry section.
    *   `Ornaments.jsx`: Decorative GSAP-animated elements.
    *   `Preloader.jsx`: Custom site-wide entry animation.
    *   `Gallery/`: Cloudinary-powered grid systems.
*   `/src/Data`: Static data stores (JS objects) for site content (Menu, Catering, Events, Testimonials).
*   `/src/lib`: Utility functions for Cloudinary, Resend, and Auth logic.
*   `/src/hooks`: Custom React hooks (e.g., for scroll triggers or animations).

---

## 4. Key Features
1.  **Immersive UI/UX:** High-fidelity animations using GSAP and Locomotive Scroll to create a "luxury" feel.
2.  **Custom Preloader:** A signature entrance animation to mask asset loading.
3.  **Cloudinary Gallery:** Dynamic image fetching and optimized delivery for high-resolution venue photos.
4.  **Enquiry System:** A robust form (Home + Dedicated page) that sends real-time notifications to owners via Resend.
5.  **Admin Portal:** A private area for managing site-specific data or viewing submissions (JWT protected).
6.  **SEO Optimized:** Use of `StructuredData.jsx` (JSON-LD) and semantic HTML5 for venue discovery.
7.  **Responsive Design:** Fully fluid layouts tailored for both mobile browsing and high-resolution desktop screens.

---

## 5. Design & Branding
*   **Aesthetic:** "Modern Luxury" — likely featuring gold/dark palettes, elegant typography (Outfit/Playfair), and glassmorphism.
*   **Interactivity:** Scroll-triggered reveals, magnetic buttons, and custom cursor interactions (implied by the premium stack).
*   **Logo/Naming:** Consistent use of "BRP" or "Basti Ram Palace".

---

## 6. Integration Details
*   **Environment Variables:** Managed via `.env.local`, covering `JWT_SECRET`, `RESEND_API_KEY`, `CLOUDINARY_CLOUD_NAME`, and `OWNER_EMAIL` lists.
*   **API Routes:**
    *   `POST /api/enquiry`: Processes user enquiries and sends emails.
    *   `POST /api/admin/login`: Handles admin authentication.
    *   `GET /api/images`: Fetches asset lists from Cloudinary.

---

## 7. Current Status
The project is in a refined state, focusing on:
*   Performance optimization (using `sharp` and Cloudinary).
*   Smooth animation transitions between pages.
*   Robustness of the enquiry pipeline.
*   Responsive layout debugging across edge-case screen sizes.

---
*Note: This report is generated to provide structural and technical context for further development and debugging.*
