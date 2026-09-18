# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring managers** arriving from a link shared on LinkedIn or Hitmarker. They give a portfolio 15–30 seconds to decide whether to read further, looking for name, role, and real shipped work.
- **Portuguese small businesses** that need automation, a website, a web app or an integration, and are deciding whether to get in touch.
- **Users of Crudo and Feit-Y** who need support or the privacy policy. Apple's App Review opens these pages from a cold browser during every submission.

## Product Purpose

One site that is Pedro Feiteira's portfolio, his first contact with prospective clients, and the support and legal home for his iOS apps. Success: a recruiter reaches the résumé or the work in one click, a client reaches services or contact in one click, and every App Store URL resolves with a working way to reach a person.

## Positioning

An engineer who ships end to end: a production generative-AI support system for Aircall, the Python SDK at EngineAI, and two iOS apps of his own (Crudo, Feit-Y), designed, built and supported himself.

## Operating Context

- Home offers two doors: "hiring?" (résumé) and "need something built?" (services), with a proof strip of the apps and named client work below.
- Routes: `/work` (apps, client work, three concepts), `/services`, `/resume` (with PDF), `/apps/` and `/apps/<app>/{support,privacy}/`, `/contact` (form with subject select, prefilled by `?topic=`), `/privacy`.
- Contact form posts through EmailJS; support pages link to it with the app preselected and show the email.

## Capabilities and Constraints

- Next 16 static export (`output: "export"`) on GitHub Pages, next-intl, Tailwind, shadcn/ui, framer-motion. No server, no middleware.
- PT-PT is the default locale and x-default; EN is supported. Slugs are localised through `ROUTE_SLUGS` / `APP_DOC_SLUGS` in `src/lib/routes.ts`.
- App URLs under `/apps/` are frozen: they are entered in App Store Connect.
- No phone number, by decision. Routes in are email, LinkedIn and the contact form.
- The site runs no analytics today; the privacy page says so and must change with it.
- App Store badge appears only once an app is live (Apple's badge must link to the app).

## Brand Commitments

- Name: Pedro Feiteira. Portrait: `public/profile.jpeg`.
- An animated ambient background stays (mesh + dot grid), respecting reduced motion.
- App pages wear each app's own brand inside the site shell: Crudo per `../crudo/DESIGN.md`, Feit-Y per `../y/docs/brand`.

## Evidence on Hand

- Case studies: Aircall (via AdvanceWorks, Sep 2025–present) and EngineAI (Sep 2021–Aug 2025), named, without metrics.
- Apps: Crudo and Feit-Y, not yet on the App Store.
- Three concept sites, clearly labelled as fictional: Meridian Goods, Linha Viva Listings, Sereno Spa.
- Résumé with experience, stack, education, languages and PDF.
- There are no testimonials, client logos, metrics or press. None may be invented.

## Product Principles

1. Real work first: shipped apps and named clients outrank concepts, which are always labelled.
2. One click to the right door for each audience; nobody lands on a page with nothing to see.
3. Honest claims only: every statement about data, pricing or results is checked against code or fact.
4. App Store pages are compliance infrastructure: stable URLs, a visible way to reach a person.
