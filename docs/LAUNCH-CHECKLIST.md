# Launch checklist: new formats

Internal notes from the owners (Oct 2026). The public site only states **Confirmed** decisions. Everything else stays here until it's real.

Status key: **Confirmed** (owner decision) · **Planning default** (working assumption, may change) · **N/A** (doesn't apply to this format) · **Open** (still to decide or set up)

## How status works on the site

All program status lives in [`src/data/site.ts`](../src/data/site.ts):

| What | Where | Values |
| --- | --- | --- |
| How far along an offering is | `offerings[id].maturity` | `established`, `exploring`, `in-development`, `retired` |
| A specific session | `sessions[]`, one entry per session | `state`: `upcoming`, `open`, `full`, `closed`, `completed` |
| What's still undecided (one honest public line) | `offerings[id].openQuestions` | Free text |
| Confirmed online facts shown publicly | `onlineWorkshops` | Cost, session length, curriculum, equipment |

These are independent. Confirmed format decisions don't mean a class has launched: online stays "Being explored / Dates not announced" until a session is added.

A **Register** button appears only when a session has `state: "open"` **and** all of: `dates`, `schedule`, `location` (in-person) or `timezone` (online), `grades`, `fee`, `registrationCloses`, and `registration`. A fee of `"Free"` (or `"$0"`) counts; a missing or blank fee doesn't. Online sessions are also refused unless the fee is free, the registration is a real `https://` link (not the PocketBase form), and `afterRegistering` says whether submitting requests a place or confirms one. All enforced in `canRegister()` and `npm test`.

### Moving an offering forward

1. **Exploring → in development:** change `maturity` to `"in-development"` and update `openQuestions`.
2. **Announce a session:** add it to `sessions` with `state: "upcoming"`, dates, and location or timezone.
3. **Open registration:** fill in every required fact and set `state: "open"`. The header becomes "Workshop sign-up" / "Online class sign-up" and the form or link appears on `/signup`.
4. **After it ends:** set `state: "completed"`.

Owner is considering **winter (Jan–Feb)** and **spring (Mar–Apr)** sessions. **Open**: nothing is announced. Don't add sessions or publish these until confirmed, and don't infer online dates from them.

## Online workshops

**Confirmed** (Oct 2026), shown on the site:

- All online workshops are **free**: not an introductory price, and no later paid cohorts. No tuition, enrollment fees, required donations, paid upgrades, hardware purchases, or paid software subscriptions.
- **60-minute** sessions, once a week. Set up and test the video host for the full 60 minutes; don't shorten for an assumed platform limit.
- Curriculum is **circuit simulation and CAD**: build and test virtual circuits, explore electronics concepts, program simulated microcontrollers, debug simulations, and create, edit, and present digital 3D models. Final projects can be a simulation, a CAD model, or both.
- **Entirely digital.** No physical circuit building, 3D printing, fabrication, or assembly of physical parts. No kits, components, tools, take-home builds, printed parts, or shipping, not even optional ones.
- Students need a suitable computer, internet access, and access to the chosen platforms. No physical Arduino, breadboard, components, 3D printer, or paid student software.

The in-person course keeps its physical electronics, CAD, and 3D printing, and its own pricing and schedule. None of the above changes it.

| # | Question | Answer | Status |
| --- | --- | --- | --- |
| 1 | Live or recorded? Group or individual? Size? | Live group classes (not tutoring or a recorded library). Eight-week course, one 60-minute session weekly, capped at 12, adjusted to actual staffing. Lead instructor + supporting mentors. Lesson notes, example circuits, starter code, and practice activities after sessions. **No recordings of classes with students**; instructor-only demos may be made separately | Session length **Confirmed**; course length and cap **Planning default** |
| 2 | Grades and prerequisites | Proposed grades 6–8 (not the in-person 4–8). No coding or electronics experience needed; basic typing/browser skills. A guardian helps with setup and is reachable during sessions | **Planning default** |
| 3 | Hardware / kits / shipping / returns | None. Simulation and digital CAD only | **N/A** |
| 3 | Platforms | Free circuit-simulation and CAD tools. Tinkercad Circuits is the proposed simulator; Onshape or another CAD tool is not excluded. Pick by the teaching plan and account rules (age limits, guardian consent, classroom management). Every activity must be completable online | **Open**: test before naming publicly |
| 4 | Computer and software | Laptop, desktop, or compatible Chromebook; reliable internet; audio/mic; supported browser. Don't present phone/tablet-only as enough unless tested. Prefer teacher-managed classes with class codes and nicknames over personal student accounts | **Planning default**; test devices, classroom access, project privacy, and video access before enrollment |
| 5 | Timezone, schedule, language | English. Scheduled in `America/New_York` (watch daylight saving). Saturday 11:00 a.m. Eastern is a working preference only. Publish dates, course length, timezone, and skipped weeks together | **Planning default**; dates **Open** |
| 6 | Who teaches, how students get help | RoboZone instructors + approved mentors; lessons written for simulation and CAD, not copied from the in-person course. Optional group help session if staffing allows. Questions between sessions go to the team email with a guardian copied. At least two approved leaders per session, including a designated adult supervisor. No private tutoring or personal mentor messaging | **Planning default**; recruiting the adult supervisor is **Open** |
| 7 | Price, payments, refunds | Free. No checkout, billing, payment fields, or card collection. Tuition refunds don't apply; families withdraw by emailing. Donations stay on the HCB page, completely separate, and never affect admission or support | Free **Confirmed**; payment/refund setup **N/A** |
| 8 | Eligible regions | U.S.-based first cohort as the working pilot scope; international next, once regions, platform access, scheduling, guardian consent, and capacity are confirmed. Don't present U.S.-first as a permanent limit, and don't advertise worldwide enrollment early. Shipping/payment restrictions **N/A** | **Planning default** |
| 9 | Safety and privacy | Google Meet on an organization-controlled host account (after testing host controls). Links sent privately to approved families. First names or assigned display names; attendance kept private. No recording, AI transcription, or participant screenshots for publicity. Cameras optional where possible. No private DMs, texting, social-media contact, or unsupervised 1:1 calls. No breakout rooms unless each meets the same supervision rules. Guardian consent for participation and platforms; publishing a student's name, image, or work is a separate opt-in | **Planning default**; adult contact and incident-response procedure **Open** |
| 10 | Registration and data | Separate guardian-completed Google Form → restricted response sheet, tied to the right cohort. Collect only: student first name + last initial, grade, guardian name and email, region/timezone, confirmation of computer/internet access, required consents. **Not**: addresses, hardware choices, payment, required student email, logins, or uploads. Say whether submitting requests a place or confirms one (`afterRegistering`). Separate opt-in for future updates. PocketBase stays in-person only | **Planning default**; form not created (**Open**); retention/deletion policy **Open** |
| 11 | Online mentoring | Yes, within supervised group instruction and group help sessions: simulated circuits, code, CAD, debugging, project explanations. Orientation and a practice lesson required first. Not private tutoring | **Planning default** |

## Local branches

A separate **in-person** expansion model. The online simulation-only policy doesn't remove physical activities from approved local workshops.

| # | Question | Answer | Status |
| --- | --- | --- | --- |
| 1 | What counts as a branch | An approved local RoboZone group running recurring programs under agreed curriculum, branding, supervision, and reporting standards. A venue hosting one workshop is a host/partner, not a branch. Start with **one** branch pilot the core team can support | **Planning default** |
| 2 | Who can start one, approval | At least two committed organizers, a designated adult supervisor, and a suitable venue. Short proposal: team, audience, venue, supervision, equipment, budget, schedule. Written leadership approval before branch branding or recruiting. Review the pilot before continuing branch status | **Planning default** |
| 3 | What RoboZone provides | Curriculum materials, tested starter code, equipment guidance, mentor orientation, branding guidance, reporting templates, planning check-ins within the core team's capacity. **Not promised**: equipment, venue funding, shipping, wages, certification, or a complete starter package | **Planning default**; confirm material/branding permissions and sponsor requirements |
| 4 | Money and fiscal sponsorship | No branch automatically falls under RoboZone's Hack Club/HCB sponsorship. Confirm with leadership and HCB before fundraising, fees, accounts, or using a sponsor's tax identity. Agree budgets, receipts, and responsibilities first | **Open** (external approval) |
| 5 | Safety, supervision, insurance | Approved adult supervisor + at least two approved leaders per workshop. Guardian consent, emergency contacts, drop-off/pickup, venue permission, suitable activities, incident procedures. Apply real host/sponsor screening and training. Verify insurance per workshop; don't assume a sponsor's or host's policy covers it | **Planning default**; insurance **Open** |
| 6 | Impact reporting | Keep South Brunswick's historical totals intact. Track each branch and cohort separately: students, enrollments, attendance, workshops, instructional hours, mentors, projects. Don't double-count returning students. Don't publish network-wide unique totals unless duplicates can be removed; otherwise label as enrollments/participation. Instructional hours stay separate from planning and person-hours. Only completed, verified activity counts | **Planning default** |

## Hosting local workshops

Hosting near South Brunswick stays an **email inquiry**. Before confirming a workshop, write down: venue and date, audience, capacity, teaching and host responsibilities, supervision, equipment, money, consent, insurance checks, and how cancellations are communicated. Don't promise supplies, volunteers, or a host agreement before they exist. **Open.**
