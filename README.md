# RoboZone Website

The website for RoboZone, a student-led robotics education initiative founded in South Brunswick, NJ. Its established program is an in-person course; online classes and local branches are being explored. Intended address: **https://robozone.world** (see [`docs/DOMAIN-LAUNCH.md`](docs/DOMAIN-LAUNCH.md)).

Built with [Astro](https://astro.build) (pages are prerendered to static HTML and served by Astro's Node server) with a [PocketBase](https://pocketbase.io) backend for in-person sign-ups.

## Where to change things

Almost everything you'll need to update is in **[`src/data/site.ts`](src/data/site.ts)**:

| To change… | Edit in `site.ts` |
| --- | --- |
| Where an offering stands (established, being explored, in development) | `offerings[id].maturity` |
| Announce or open a session: dates, times, location/timezone, grades, fee | `sessions` (instructions are in the comments) |
| One honest line about what's undecided for online classes or branches | `offerings[id].openQuestions` |
| Confirmed online-workshop facts (free, 60 minutes weekly, simulation + CAD) | `onlineWorkshops` |
| Students taught, workshop hours, mentors | `impact` |
| In-person course facts (grades, format, past venue, cost wording) | `inPersonCourse.facts` |
| Curriculum stages and topics (in-person) | `curriculum` |
| Team names, roles, bios, photos | `team`; portraits are cropped by `scripts/make-portraits.mjs` from `src/assets/team/originals/` |
| Workshop photos, captions, alt text | `src/data/photos.ts` (files in `src/assets/photos/`) |
| FAQs | `faqGeneral`, `faqInPerson` ("Can I enroll now?" is generated from `sessions`) |
| Contact email, donation link | `site.email`, `links` |
| Canonical web address | `site` in `astro.config.mjs` / `SITE_URL` env var |

After changing a fact, update its status in [`docs/CONTENT-SOURCES.md`](docs/CONTENT-SOURCES.md).

**Opening registration:** add a session with `state: "open"` and every essential fact (dates, schedule, location or timezone, grades, fee, closing date, and a registration destination). Only then does a "Register" action appear, the header button change to "Workshop sign-up", and the form show on `/signup`. It closes itself after `registrationCloses`. Full walkthrough and the questions to settle before launching new formats: [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md).

Design tokens and components are documented in [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md). The 2026 audit is in [`docs/AUDIT.md`](docs/AUDIT.md).

## Local development

```sh
npm install
npm run dev        # http://localhost:4321
npm test           # unit tests: program availability, form validation, servo-arm geometry
npm run build      # type check + production build
npm run check:links  # after a build: broken links, anchors, alt text, one h1 per page
npm run preview    # serve the production build
```

If your folder path contains a colon (for example `Clubs:ECs`), npm scripts can't find the `astro` command. Run it directly instead: `node node_modules/astro/astro.js dev`.

### Testing the sign-up form without touching real data

The form sends to `https://robozonenj.org/admin` by default. **Never test against it.** Instead:

```sh
node scripts/mock-pocketbase.mjs                     # fake backend on :8090, stores nothing
echo "PUBLIC_POCKETBASE_URL=http://localhost:8090" > .env.development.local
npm run dev
```

Temporarily add a complete test entry to `sessions` with `state: "open"` and `registration: { kind: "signup-form" }`, try the form, then revert and delete `.env.development.local`. The mock's header comment lists inputs that trigger error responses.

## Deployment

Unchanged from before:

- Clone repository, install Docker
- Create volume with `docker volume create data`
- Run `docker compose up`
- Head to admin dashboard
- Set up `signups` with the following fields:
    - Text: `name`
    - Text: `guardian`
    - Email: `email`
    - Email: `guardian_email`
    - Number: `grade`
- Make sure you can create entries without admin

The Linux-only build packages (`@esbuild/linux-x64`, `@rollup/rollup-linux-x64-*`) are now `optionalDependencies`, so `npm install` also works on macOS and Windows. The Docker build (Linux x64) still installs them.

**Changing the logo:** replace `src/assets/brand/logo-padded.png` (square PNG, transparent rounded corners), then run `node scripts/make-brand-images.mjs` to regenerate the favicons, touch icon, social preview image, and `public/images/logo.png`.
