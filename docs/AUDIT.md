# Site audit (October 2026)

Working audit that drove the 2026 redesign. Each finding is tagged:

- **[source]** read in the code or git history
- **[runtime]** observed by running the site locally (`astro dev`) or probing a URL
- **[supplied]** from the owner's notes, résumé, or application materials
- **[proposal]** a design decision made in this redesign

## Access results

| What | Result | Date |
| --- | --- | --- |
| Local checkout (`main`, clean, last commit `c6c10a7 feat: scrub`, Jan 2026) | Available. All source read. | 2026-10-23 |
| `https://robozonenj.org/` | **[runtime]** Cloudflare `522` (origin timeout) reproduced with `curl`. Not diagnosed: no server access. DNS resolves to Cloudflare; MX records point to Google Workspace. | 2026-10-23 |
| `https://github.com/robozonehq/website` | **[runtime]** `404` to an anonymous request (likely private; the local `origin` remote points here). | 2026-10-23 |
| `https://hcb.hackclub.com/robozone` and `/donations/start/robozone` | **[runtime]** `200`. Page title "Give to RoboZone – HCB". States: "RoboZone is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit." Finances are public. | 2026-10-23 |
| Reference sites (hackclub.com, firstinspires.org, charitywater.org, apple.com, arduino.cc) | **[runtime]** All five loaded; first view of each inspected. | 2026-10-23 |

## Stack

- **[source]** Astro 4.7 (`output: "server"`, `@astrojs/node` standalone). Plain CSS (scoped `<style>` blocks + a global stylesheet that no page imported). DM Sans Variable via Fontsource, Signwood display font (SIL OFL 1.1, GGBotNet) self-hosted.
- **[source]** Deployment: `compose.yaml` runs nginx → Astro node server (`:4321`) and PocketBase 0.22.10 (`:8080`). nginx proxies `/admin/*` to PocketBase, so the browser SDK talks to `https://robozonenj.org/admin`.
- **[source]** Package manager: `npm` (Dockerfiles use `package-lock.json`). A `pnpm-lock.yaml` also exists from a 2025 commit.
- **[runtime]** `npm ci` fails on macOS because Linux-only binaries (`@esbuild/linux-x64`, `@rollup/rollup-linux-x64-*`) are listed as regular dependencies. `npm ci --force` works.
- **[runtime]** Baseline `astro check && astro build`: 0 errors, 1 hint.

## Routes and components

| Existing route / component | Purpose | Content to retain | Weakness observed | Change made | Integration to preserve |
| --- | --- | --- | --- | --- | --- |
| `/` `index.astro` | Home | Grades 5–8, Code Ninjas Kendall Park, course description (breadboards, transistors, capacitors, resistors, Arduino, C++, 3D-printed final project), plant-watering caption, team | **[runtime]** Every heading in an all-caps display face; emoji as icons; four identical feature cards with generic copy ("solve real-world problems"); `Sign Up Now` CTA for a session that ended Aug 2025; team bios say "junior" (stale); 6 MB portrait PNGs; no footer contact, sponsor, or donation info; no Open Graph or canonical tags | Rebuilt as image-led home: hero, proof strip, course facts with live availability, learning journey, student work, team, get involved, FAQ | `/` URL; `/#about` anchor kept |
| `/signup` `signup.astro` | Registration form → PocketBase `signups` | Field contract (`name`, `email`, `guardian`, `guardian_email`, `grade` as number), 2-business-day confirmation promise, billing follow-up | **[source]** Advertises "Session: July 21st – August 15th" (2025) and still accepts submissions. Grade picker is JS-only `<button>`s with no fieldset/legend or keyboard state. One generic error for all fields. PocketBase URL hard-coded. **[runtime]** Renders on a dark background in a dark-mode browser (no explicit page background) with very low-contrast heading | Kept the URL. Form only renders when `registration.status` is `open`; otherwise an honest "no session open" state with an email route. Native radio group, per-field errors, error summary, preserved input, duplicate-submit guard, success only after a confirmed record id | Same collection, field names, and payload types. URL now overridable with `PUBLIC_POCKETBASE_URL` (default unchanged) |
| `/?page=about`, `/?page=support` | 2024 single-page URLs | — | **[source]** Old query-string URLs | Redirect (tiny inline script on `/`) to `/about` and `/get-involved#support` | — |
| `Navbar.astro` | Fixed top bar | Home / About / Sign Up | **[runtime]** `6vh` height, text-shadow hack, wordmark overlaps links at 375px, no mobile menu, no focus styles | New `Header.astro`: sticky, wordmark + logo, mobile menu button with `aria-expanded`, Escape to close, no-JS fallback | — |
| `Button.astro`, `AltButton.astro`, `Card.astro`, `Scrolling.astro` | Unused (Card is Astro starter code) | — | **[source]** Not imported anywhere | Removed; replaced by `.btn` classes in the design system | — |
| `src/styles/global.css` | Global styles | — | **[source]** Never imported; three conflicting copies of the same tokens across files | Replaced by `src/styles/tokens.css` + `global.css`, imported once by `Layout.astro` | — |
| `public/favicon.svg` | — | — | **[source]** Astro's default logo, not RoboZone's (unreferenced) | Removed | `public/images/favicon.ico` kept |
| `plugins/proxy-middleware.mjs` | Dev proxy experiment | — | **[source]** Not referenced by `astro.config.mjs` | Left in place (server-side only, outside redesign scope) | — |
| Footer (inline in each page) | Copyright | — | No contact, location, sponsor, or donation info | New `Footer.astro` with mission, area, email, nav, fiscal-sponsor line, HCB links | — |
| Donation | 2024 "Support Us" section | HCB destination, Hack Club sponsorship | **[source]** Removed in the Nov 2024 redesign; no donate path on the current site | Restored on `/get-involved#support` with verified HCB wording and links | `https://hcb.hackclub.com/donations/start/robozone` |

New routes: `/program`, `/about`, `/get-involved`, `/404`, `/sitemap.xml`, `/robots.txt`.

## Asset inventory

| Asset | What it actually shows (visual check) | Quality | Where it is used now |
| --- | --- | --- | --- |
| `work1.jpg` (4126×4284) | Student wiring a breadboard to an Arduino Uno on a yellow tablecloth; second student watching; laptop in foreground | Sharp, warm, authentic | Home hero; program page "circuits" stage |
| `work2.jpg` (5712×4284) | Student working in Onshape on a laptop; Arduinos, breadboards, jumper wires on the table; 3D printer and filament in background | Sharp | Learning journey CAD stage; student-work gallery |
| `a.jpg` (1600×1200) | Student holds a wired project (breadboard, Arduino, small printed part) with five mentors in RoboZone shirts. Owner caption: "A student's automatic plant watering machine" | Medium resolution; fine up to ~800px wide | Featured documented project; OG image source |
| `daksh.png`, `sammy.png`, `nitish.png`, `rohan.png` (≈2300–3000px, 5.5–7.6 MB each) | Consistent portraits: black shirts against light walls | Good, consistent | Team section (now served as ~30 KB WebP) |
| `logo.png` (1080²) | RZ mark: white italic letters with black offset shadow on sky blue `#53C1FF`, light-blue gear | Crisp | Header/footer lockup, favicon, OG image. **Kept in `public/images/`** because the PocketBase email template may reference it |
| `favicon.png` (transparent), `favicon.ico` | White RZ + gear on transparent | — | Favicon (ico) |
| Signwood TTF (regular, italic) | Heavy italic display face that matches the logo letterforms | SIL OFL 1.1 | Wordmark only |
| YouTube `W5mgfXPiBGE` | Embedded on the 2024 site; content not verified | — | Not used. Confirm what it shows before reusing |

### Assets that would most improve the site

1. A landscape photo of a mentor helping a student at the table (clear interaction, faces optional).
2. A close-up of a finished minigame build or a printed part.
3. A screenshot or render of a student's Onshape model.
4. Written confirmation that families agreed to photos being published (for any new images of minors).

## Verification (2026-10-23, after the redesign)

| Check | Result |
| --- | --- |
| `astro check` | 0 errors, 0 warnings, 0 hints |
| `npm test` (registration logic, validation, PocketBase payload contract) | 12/12 pass |
| `npm run check:links` on the production build | 6 pages: no broken internal links or anchors, every `<img>` has `alt`, one `<h1>` per page |
| Production server (`node dist/server/entry.mjs`) | All routes 200 with and without trailing slash; unknown URLs return the custom 404 with status 404; `/?page=about` and `/?page=support` redirect |
| Sign-up form against a local mock PocketBase (`scripts/mock-pocketbase.mjs`) | Empty submit shows summary + per-field errors with focus on the summary; keyboard-only entry works (Tab into grades, arrow keys select); three rapid submits send one request; payload has exactly `name, email, guardian, guardian_email, grade` with `grade` as a number; server 500 and unreachable backend show the failure message and keep all input; server-side field error maps onto the field; success shows only after a record id is returned. **No request was sent to the real PocketBase.** |
| Browser checks | 360, 375, 768, 1280, 1366, 1920px. No horizontal overflow. Mobile menu: `aria-expanded` toggles, Escape closes and returns focus. Skip link visible on first Tab and moves focus to `<main>`. Visible focus rings on links, buttons, radios |
| Contrast | Every text/background pair in use computed at WCAG AA or better (lowest text pair 5.2:1; form control borders 3.4:1) |
| Build output | `dist/client` 8 MB (was 47 MB before right-sizing source photos). First view of `/` on a phone: ~354 KB uncompressed across 11 requests |

Not verified: field Core Web Vitals or a Lighthouse score (the browser pane was hidden, which suppresses LCP reporting, and Lighthouse wasn't installed); the Docker build (Docker daemon not running; lockfile checked instead); end-to-end submission to the real PocketBase (production returns 522, and testing against it was out of bounds); the HCB donation flow beyond confirming the page loads.

## Follow-up changes (2026-10-23, owner requests)

- Team titles: all four are Co-Founders & Co-Presidents (shown once above the portraits).
- Figures: 90+ students taught, 15+ mentors involved. Workshop hours (160) unchanged pending confirmation.
- Logo: the padded gradient RZ mark now drives the header, footer, favicons, touch icon, social image, structured data, and `public/images/logo.png`.
- Public HCB finances link removed from the footer, About, Get involved, and home.
- New homepage interactive: a two-servo arm (`ServoArm.astro`) that eases toward the cursor or a tap, with live Arduino `servo.write()` values. Geometry in `src/lib/servo-arm.ts` with 7 unit tests (19 tests total).

## Organizational transition (2026-10-24)

Scope change: RoboZone is the organization; the South Brunswick in-person course is one established program; online classes and local branches are **being explored**. Intended address `robozone.world`.

- **Captures:** the October 24 captures weren't available in this session; the audit used the local source and running site. The "small dark floating bars" are Astro's dev toolbar: present only under `astro dev`, absent from the production build (0 references in `dist/`). Now disabled in dev too (`devToolbar.enabled: false`).
- **Data model:** `offerings` (maturity) and `sessions` (registration state) replace the single global `registration` flag. Registration actions require complete session facts (`canRegister()`).
- **Routes:** `/` reframed around the organization with a "Ways to learn" section; `/program` is now "Programs" (overview, then the in-person course with its existing `#curriculum`, `#builds`, `#teaching`, `#faq` anchors, then `#online` and `#branches`); `/signup` is "Program availability and updates" (same URL); `/about` gains "Now and next"; `/get-involved` separates local hosting from discussing a program elsewhere. New `robots.txt` endpoint follows the configured domain.
- **Copy scope:** every "the course" / "next session" / eight-workshop statement is tied to the in-person course. Header action is "Program updates" unless a session is open.
- **Domain:** canonical, Open Graph, sitemap, robots, and structured data use `site` (`https://robozone.world`, overridable with `SITE_URL`). Email, PocketBase endpoint, and HCB links unchanged.
- **Checks:** `astro check` 0/0/0; `npm test` 24/24; link checker passes on 6 pages; production preview checked at 360, 375, 700, and 1280px; mobile menu, Escape, arm (touch and keyboard), and FAQ accordion exercised; a temporary open in-person session confirmed every scoped registration action appears and online stays independent (reverted). No records submitted anywhere.

## Owner answers applied (2026-10-24)

- Figures confirmed: 90+ students, 15+ mentors, 160 workshop hours. In-person course length is **8 weeks** (site now says "8 weeks", not "eight workshops").
- Email stays team@robozonenj.org until specific `@robozone.world` addresses exist. Owner controls DNS/hosting (GoDaddy); go-live steps in `docs/DOMAIN-LAUNCH.md`.
- Online workshops, confirmed: free for all cohorts, 60-minute weekly sessions, circuit simulation + CAD, entirely digital. Shown via `onlineWorkshops` / `OnlinePlan.astro`. Still "Being explored / Dates not announced": no session added.
- Registration rules: a zero fee ("Free", "$0") is valid and a missing fee isn't; online sessions must be free, use a real https link, and state what submitting means.
- Winter (Jan–Feb) and spring (Mar–Apr) sessions noted internally as possibilities only; not published.

## Photos and portraits (2026-10-24)

- Reviewed all 19 workshop photos from the owners' folders (Summer 2024, Winter 2024–25, Summer 2025) plus flyers. Used 17; skipped one posed/cluttered shot and one near-duplicate; flyers not used (outdated dates/prices).
- New photo registry `src/data/photos.ts` + `WorkshopPhoto.astro`: one place for alt text, captions, sessions, and focal points. Placements: hero, all four learning-journey stages, a four-build gallery, Programs (overview, teaching), About (story, one photo per session), Get involved (mentoring), Program updates.
- Three Winter/Summer PNGs looked dim in macOS previews because of their color profile; read correctly (converted to sRGB) they need no exposure change.
- Team portraits normalized by `scripts/make-portraits.mjs` using Apple Vision face boxes and a hair-line scan: equal face size, aligned head tops (Sammy 1% higher, as requested), centered on the eyes. CSS zoom removed.
- Venue wording changed to "Recent workshops were held at Code Ninjas" (Summer 2024 photos show a different space).

## Photo fixes (2026-10-24, owner feedback)

- Sammy's portrait lowered to sit level with the others (head top now ~1–2px above their average on screen).
- Printed-cases photo flipped 180°.
- Gallery and team photos now fill their frames (`<picture>` wrapper set to `display: contents`); a browser check confirmed all 33 photos per page width fill their boxes at 1280px and 375px.
- Venue history added: About page timeline ("Every session so far": garage for the first session, Code Ninjas for every session since, then the next session's real status). "Where" fact and FAQ updated to match.
- Get involved now uses the mentor check-in photo; the CAD-monitor photo was removed from the site. Programs uses the breadboard photo (overview) and the workshop room (who teaches); Program updates uses a previously unused hands-on Summer 2024 photo.
