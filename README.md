# Bier Belly Bites — Prototype

A Next.js prototype for the Bier Belly Bites food brand.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before publishing

1. Replace the sample menu and prices in `app/page.tsx` with the real menu.
2. Replace the placeholder `orderLink` with the actual Zomato and Swiggy restaurant URLs.
3. Replace the placeholder email, city/service area and operating hours.
4. Review image licensing and replace sample Unsplash images with owned/licensed food photography.
5. The cart is a frontend demo. Checkout and payment are intentionally not enabled.

## Deploy

Push this repository to GitHub, import it into Vercel, and deploy. Vercel automatically detects Next.js. Connect the Git repository to enable deployments on future pushes.

This prototype uses sample content and does not yet connect to the Java/Spring Boot backend.
