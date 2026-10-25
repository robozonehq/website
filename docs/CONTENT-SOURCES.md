# Content source of truth

Every fact the public site states, where it came from, and whether it still needs confirmation. The values themselves live in [`src/data/site.ts`](../src/data/site.ts); change them there, then update the status here.

Status key: **Owner-confirmed** (stated directly by the owners, with date) · **Verified** (checked against a live source) · **Owner-published** (on the site the owners maintained, most recently Jan 2026) · **Supplied** (owner's notes/résumé, not independently checked) · **Confirm** (needs an owner decision before it is treated as current)

## Organization

| Fact | Public wording | Source | Status |
| --- | --- | --- | --- |
| Name | RoboZone (not "RoboZone World") | Site, logo, HCB | Verified |
| Description | "Student-led robotics education initiative", founded in South Brunswick, NJ. Online classes and local branches are described only as **being explored** | Owner brief, Oct 24 2026 | Owner-confirmed |
| Web address | `https://robozone.world` intended as primary; set in `astro.config.mjs` (`SITE_URL`). Old `robozonenj.org` keeps working until redirects are switched on | Owner, Oct 2026: owner controls DNS and hosting; domain via GoDaddy | Owner-confirmed. **Going live soon**: follow `docs/DOMAIN-LAUNCH.md` |
| Founded | 2024 | Supplied; git history starts April 2024 | Supplied |
| Origin | Founded in South Brunswick, New Jersey. All workshops so far have been there | Supplied; Kendall Park venue is in South Brunswick | Supplied |
| Who teaches | High school student mentors | Owner-published ("courses from high-school mentors") | Owner-published |
| Fiscal sponsor | "RoboZone is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit." | HCB donation page, checked 2026-10-23 | Verified |
| Donation destination | `https://hcb.hackclub.com/donations/start/robozone` | HCB, returns 200 with "Give to RoboZone" | Verified (no test donation made) |
| Public finances | Not linked | The HCB ledger (`https://hcb.hackclub.com/robozone`) is public, but the owners asked to remove the link for now | Owner-confirmed, Oct 2026 |
| EIN | **Not published.** The EIN on HCB belongs to Hack Club, not RoboZone | — | Do not add |
| Contact email | team@robozonenj.org | Owner, Oct 2026: keep it until the specific `@robozone.world` addresses are decided | Owner-confirmed. Change `site.email` only once a replacement mailbox receives mail |
| Social links | None published | No verified accounts found in the repo | Add only real accounts |
| Logo | Padded gradient RZ mark (`src/assets/brand/logo-padded.png`), used in the header, footer, favicons, touch icon, social image, and `public/images/logo.png` | Owner request; source file `RoboZone/RoboZonePadded.png` | Owner-confirmed, Oct 2026 |

## Impact figures (cumulative, since 2024)

| Figure | Public wording | Source | Status / notes |
| --- | --- | --- | --- |
| Students | 90+ students taught | Owners, Oct 2026 | Owner-confirmed, Oct 2026. Supersedes 50+ and 25+ in older documents. In-person students only, never planned or prospective learners |
| Workshop hours | 160 workshop hours | Owners, Oct 2026 | Owner-confirmed, Oct 2026. The ~300 total hours including planning is **not** published, and neither are student-hours |
| Mentors | 15+ mentors involved since 2024 | Owners, Oct 2026 | Owner-confirmed, Oct 2026. Supersedes 12 in older documents. Not described as the current team, and not used to infer team size, branches, or countries |
| In-person course length | 8 weeks, workshops of about 2 hours | Owners, Oct 2026 | Owner-confirmed. Applies to the in-person course only |

The site now says **"8 weeks"** for the in-person course (owner-confirmed, Oct 2026), replacing "eight workshops". Online workshops have their own confirmed session length (60 minutes weekly); their course length is still a planning default.

## Programs and status

| Offering | Maturity | Availability shown | Source | Status |
| --- | --- | --- | --- | --- |
| In-person workshops, South Brunswick | Established | "Next session not scheduled" (no entries in `sessions`) | Delivered 2024–25; last advertised session ended 2025-08-15 | **Confirm** whether a session is planned |
| Online classes | Being explored | "Dates not announced" | Owners, Oct 2026 | **Confirmed format**: free (all online workshops), 60-minute weekly sessions, circuit simulation + CAD, entirely digital (no hardware, kits, printing, or shipping). Not launched; dates, audience, registration, and platforms **Open**. See `docs/LAUNCH-CHECKLIST.md` |
| Local branches | Being explored | "No other branches yet" | Owner brief, Oct 24 2026 | Not launched. No process, kit, funding, or license promised |

The facts below describe the **in-person course only**. They are not reused for online classes or branches.

## In-person course

| Fact | Public wording | Source | Status |
| --- | --- | --- | --- |
| Grades | Grades 4–8 | Owners, Oct 2026 (replaces 5–8 on the old site and in the Oct 24 captures) | Owner-confirmed, Oct 2026. Set `grades` on each session in `sessions` |
| Experience | No experience needed; challenges at different levels | Owner-published ("caters to both beginner and advanced students"); notes mention extension challenges | Owner-published |
| Venue | "Past workshops: Code Ninjas, Kendall Park" (historical, not a promise for the next session) | Owner-published home page through Jan 2026 | Owner-published as a **venue**. Not described as a sponsor or as current. **Confirm** the next session's venue |
| Workshop length | About two hours each | Owner-published 2024–25 session text | Owner-published |
| Group size | Past sessions capped sign-ups at 15 students | Owner-published (2024–25 signup text) | Owner-published (historical) |
| Cost | Not published. "Fees are shared when registration opens; after you sign up we email billing details." | Price removed deliberately in the Jan 2026 "scrub" commit; billing follow-up is on the current signup page | Owner decision. **Confirm** whether to publish a price |
| Confirmation timing | About two business days | Owner-published signup success message | Owner-published |
| Curriculum topics | See `curriculum` in `site.ts` | Owner notes (8 topic lists) | Supplied. Grouped into four skill stages; **no week numbers** are claimed |
| Current availability | **No session open; next session not scheduled** | Last advertised session ended 2025-08-15 | **Confirm** before the site goes live again |

## People

| Person | Role shown | Source | Status |
| --- | --- | --- | --- |
| Samuel Asefa | Co-Founder & Co-President | Owners, Oct 2026 | Owner-confirmed |
| Daksh Gupta | Co-Founder & Co-President | Owners, Oct 2026 | Owner-confirmed |
| Nitish Pendyala | Co-Founder & Co-President | Owners, Oct 2026 | Owner-confirmed |
| Rohan Kunala | Co-Founder & Co-President | Owners, Oct 2026 | Owner-confirmed |

All four share the same title, so the site states it once above the portraits ("Co-Founders & Co-Presidents") instead of under each name. Display order (owner request): Samuel, Daksh, Nitish, Rohan. This replaces the earlier President / Vice-President / Secretary / Operations Manager titles. Bios were shortened from the owner-published versions, and grade levels ("junior") were removed because they go stale.

## Projects and photos

All photos come from the owners' folders (Oct 2026), organized by session. Every caption and alt text lives in [`src/data/photos.ts`](../src/data/photos.ts) and describes only what's visible. Students are never named.

| Photo (key) | Session | Where it's used |
| --- | --- | --- |
| Two students with their breadboard circuit (`ledThumbsUp`) | Summer 2025 | Homepage hero |
| Mentor between two students at laptops (`mentorCode`) | Summer 2024 | Learning journey, stage 2; Get involved, mentoring |
| Student designing in Onshape (`onshapeCad`) | Summer 2024 | Learning journey, stage 3 |
| Three 3D-printed project cases (`printedEnclosures`) | Summer 2025 | Learning journey, stage 4 |
| Plant-watering machine with mentors (`plantProject`) | Summer 2024 | Student work feature; social preview image |
| Printed panel with servo and LED (`buildServoPanel`) | Summer 2025 | Student builds gallery |
| Project in a printed case with breadboard (`buildWiredCase`) | Summer 2025 | Student builds gallery |
| Printed box with LEDs and servo (`buildLedCase`) | Winter 2024–25 | Student builds gallery |
| Printed box with servo and ball (`ballGame`) | Winter 2024–25 | Student builds gallery |
| Breadboard wired to an Arduino Uno (`breadboardWiring`) | Summer 2024 | Programs, in-person overview |
| Workshop room, mentors at tables (`workshopRoom`) | Summer 2024 | Programs, "Taught by high school mentors" |
| Mentor checking in on two students (`mentorCheckIn`) | Summer 2024 | Not currently placed |
| Four mentors around two students (`mentorsWatching`) | Summer 2024 | About, "Why we started" |
| Busy table (`busyTable`), CAD planning (`cadPlanning`), wiring together (`wiringTogether`) | Summer 2024, Winter 2024–25, Summer 2025 | About, "Where we've taught" timeline |
| Student wiring at a shared table (`handsOnWiring`) | Summer 2024 | Program updates, in-person section |

Not used: `2024-summer-session-5` (posed and cluttered), `2024-summer-session-4` (mentor at a CAD monitor; removed at the owner's request), and the Summer 2025 flyer and 2024 poster (outdated dates and prices; grades 5–8). Course builds listed in text (button LED, servo, CAD organizer, minigame) are labeled "Built in the in-person course", not as specific student work.

**Venue history (owner-confirmed, Oct 2026):** the very first session (Summer 2024) was held in a garage; since then, workshops have been held at Code Ninjas in Kendall Park. The About timeline shows highlights from sessions we have photos for, not every session. Shown on the About page timeline ("Every session so far", from `sessionHistory` in `site.ts`) and in the in-person "Where" fact and FAQ.

**Consent:** these photos show minors. They come from the owners for publication. **Confirm** families agreed to their children's photos being on the website, and remove any photo on request.

**Team portraits:** cropped to one framing by `scripts/make-portraits.mjs` (equal face size, aligned head tops, centered between the eyes). Sammy's portrait uses the owner-supplied edited photo (`sammy copy.png`, 526×747), which is a brighter, lower-resolution version of the original upload; it's slightly softer than the others on high-density screens.

**Social accounts:** the fall 2024 poster lists Instagram **@robozonenj** and Facebook **"robozone"**. Not added to the site. **Confirm** they're active and owned by RoboZone before linking.

## Unresolved items for the owners

Answered Oct 2026: figures (90+ students, 15+ mentors, 160 workshop hours), in-person length (8 weeks), email (keep team@robozonenj.org for now), domain ownership (owner, GoDaddy), online format (free, 60 minutes weekly, simulation + CAD, digital only).

1. In-person sessions: owner is considering winter (Jan–Feb) and spring (Mar–Apr). **Nothing confirmed**; add to `sessions` only once dates, venue, grades, and fee are set.
2. Is team@robozonenj.org monitored? Which `@robozone.world` addresses will exist, and when?
3. Publish the in-person course fee, or keep it private until registration?
4. Is the Code Ninjas Kendall Park relationship current? If it is a formal partner, how would they like to be credited?
5. Should the public HCB finances link come back later? (Removed Oct 2026 at the owners' request.)
6. Online workshops: dates, course length, grades, eligible regions, platforms, adult supervisor, registration form, and data-retention policy (see `docs/LAUNCH-CHECKLIST.md`).
7. Local branches: pilot approval, support, sponsorship/money, and insurance (see `docs/LAUNCH-CHECKLIST.md`).
8. Photos: confirm family consent for the published photos of students.
9. Are Instagram @robozonenj and Facebook "robozone" active RoboZone accounts? If so, they can go in the footer.
