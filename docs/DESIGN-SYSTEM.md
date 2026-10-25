# RoboZone design system

A short guide for whoever maintains the site next. Tokens live in [`src/styles/tokens.css`](../src/styles/tokens.css); shared styles in [`src/styles/global.css`](../src/styles/global.css); everything else is scoped inside components.

## Design decisions (2026 redesign)

**Direction: a tidy workbench.** A warm paper background, graphite text, and RoboZone's own blues and yellow, with real workshop photos doing most of the visual work. One dark section (student work) gives the page a change of pace.

**Identity kept, not replaced.** The site uses the padded gradient RZ mark (`src/assets/brand/logo-padded.png`) everywhere: header, footer, favicons, touch icon, and social image. Its letters are drawn in Signwood Italic, so Signwood stays as the wordmark beside it (and only there). The logo's hard black offset shadow survives as the primary button's "press" shadow. The logo's sky-blue gradient (`#27a9ff` → `#69b3e8`) is too light for text, so a deeper blue (`#0b5fbf`, close to the team shirts) does that job. To change the logo, replace that file and run `node scripts/make-brand-images.mjs`.

**Audience order on the home page:** what RoboZone is → what it has done (impact) → ways to learn and where each stands → how we teach → what students build → people → get involved → questions. RoboZone is the organization; the in-person course is one program; online classes and branches are possible future formats. Course-specific facts (grades, venue, eight workshops) stay inside the in-person course's sections.

**Planning information looks different from things that exist.** Established offerings use solid frames and a solid top rule; ideas being explored use dashed borders and no primary buttons. Primary (blue, offset-shadow) buttons are reserved for actions that really exist, like a registration that's open.

**Honesty rules built into components.** Availability comes from one setting, so a finished session can't keep a "Sign up" button. Historical figures are labeled "Since 2024" and kept apart from per-course facts. Documented student work is labeled differently from course activities.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#f6f4ef` | Page background (warm paper) |
| `--color-surface` | `#ffffff` | Cards, form, diagram board |
| `--color-surface-sunken` | `#eeebe3` | Alternate section background |
| `--color-text` | `#1b1f23` | Body and headings (15:1 on bg) |
| `--color-text-muted` | `#4a5058` | Secondary text (7.4:1 on bg) |
| `--color-border` / `--color-border-strong` | `#dad5ca` / `#8a8478` | Dividers / form controls (3.4:1 on bg) |
| `--brand-blue` | `#0b5fbf` | Links, primary buttons, focus ring (6.2:1 with white) |
| `--brand-sky` / `--brand-sky-end` | `#27a9ff` / `#69b3e8` | The logo gradient (`--brand-gradient`). Decoration, the arm demo, and dark-section links (7.0:1) only |
| `--brand-yellow` | `#ffd253` | Annotation markers, solder pads, step numbers. Never text on light backgrounds |
| `--color-dark-bg` / `--color-dark-text` | `#15181b` / `#f3f1ec` | Dark section (15.8:1) |
| `--color-error` / `--color-success` | `#b3261e` / `#1e6b3a` | Form states, always paired with text and an icon |

Every text/background pair used on the site was checked against WCAG AA. Check new pairs before using them; a bright color is not automatically readable as small text.

**Type.** DM Sans Variable for everything (headings 700, body 400). DM Mono 400/500 for annotation labels, figure captions, and fact labels. Signwood Italic for the wordmark only. Sizes are fluid: body 16→18px, h2 28→44px, hero h1 36→68px.

**Space and shape.** 4px spacing scale (`--space-1` … `--space-9`), sections use `--section-y`. Content width 1200px, gutters 16→32px. Radius 4/8/12px. Shadows are quiet; the only hard shadow is the primary button's.

**Motion.** 160ms transitions on hover/press only. `prefers-reduced-motion` sets duration to 0 and turns off smooth scrolling and the spinner animation. No scroll effects. The one larger motion is the servo-arm demo on the homepage: it moves only in response to the visitor (plus a one-time unfold under a second long when it first scrolls into view), eases to a stop, and jumps straight to each pose with no easing or intro when reduced motion is on.

## Recurring motifs (use sparingly)

1. **Annotation label** (`.annot`): small mono uppercase text with a yellow square marker, like a tag on a parts bin. Use it for section labels, figure captions, and stage labels. Not for decoration or fake specs.
2. **Circuit trace** (`LearningJourney.astro`): a blue line joining yellow "solder pads" through the four course stages. Used once per page.

The breadboard dot grid appears only behind the circuit diagram and the closing call-to-action panel.

## Components

| Component | What it does |
| --- | --- |
| `Layout.astro` | Page shell: meta/OG tags, canonical URL, fonts, skip link, header, footer |
| `Header.astro` | Sticky header. Below 52rem: menu button with `aria-expanded`, Escape to close. Without JS the links show as a second row |
| `Footer.astro` | Mission, area, email, links, fiscal-sponsor line |
| `Logo.astro` | RZ mark + Signwood wordmark (`tone="dark"` on dark backgrounds) |
| `.btn--primary` / `.btn--secondary` / `.link-arrow` | The three action levels. One primary action per view |
| `ProgramStatus.astro` | One offering's maturity and availability as text ("Established / Next session not scheduled"). Marker: filled square = established, dashed outline = being explored, half-filled = in development. The marker is never the only cue |
| `WaysToLearn.astro` | The three ways to learn. The established course gets a solid panel with facts; ideas being explored sit on dashed "planning" panels. `variant="index"` is the compact overview on /program |
| `InPersonAvailability.astro` | Neutral availability block for the in-person course: open session facts + register, announced session, or "not scheduled" + inquiry |
| `OnlinePlan.astro` | The confirmed online-workshop facts (free, 60 minutes weekly, simulation + CAD, computer only), from `onlineWorkshops` in `site.ts`. Used on /program and /signup so they can't disagree |
| `InquiryList.astro` | Labeled email inquiries (local sessions, online classes, mentoring, hosting/branch). Always followed by "a question, not a registration" |
| `CourseFacts.astro` | In-person course facts only. Uses an announced session's details when one exists |
| `LearningJourney.astro` | The four stages; `detailed` adds the full topic lists |
| `CircuitDiagram.astro` | Accurate LED circuit schematic. Keep it electrically correct if edited |
| `StudentWork.astro` | Documented project photo + the four course builds |
| `Photo.astro` | Framed responsive image (AVIF/WebP), `aspect`/`aspectSm` crops, `position` focal point, annotation caption |
| `WorkshopPhoto.astro` | A photo from the `src/data/photos.ts` registry, labeled with its session |
| `TeamGrid.astro` | Portraits with name and role (`bios` adds bios) |
| `Faq.astro` | Native `<details>` accordion from `faq` in `site.ts` |
| `NextStep.astro` | Closing call to action: a scoped "Register for …" only when a session is open, otherwise "Program updates" |
| `SignupForm.astro` | PocketBase sign-up form. See README for testing |
| `ServoArm.astro` | Homepage interactive: a two-servo arm on a workbench whose gripper eases toward the cursor (anywhere on the page, while the arm is on screen) or a tap, with the matching Arduino `servo.write()` calls updating live. Keyboard: arrow keys and Space. Geometry lives in `src/lib/servo-arm.ts` (tested) |

## Adding photos

1. Put the file in `src/assets/photos/` named `<year>-<season>-<what-it-shows>.jpg`, about 2400px on the long edge, sRGB.
2. Add an entry to `src/data/photos.ts` with the session, alt text (what's visible, no names), a short caption, and a `position` aimed at the subject.
3. Place it with `<WorkshopPhoto photo="key" />`. The label shows the session automatically ("In-person workshop · Summer 2025").

Don't use in-person photos to illustrate online classes or branches. Only publish photos of students with families' agreement.

## Team portraits

Portraits are pre-cropped to one framing by `scripts/make-portraits.mjs`: every face box is 46% of the frame width, every head top sits 8.5% from the top, and each crop is centered between the eyes. Source photos live in `src/assets/team/originals/`. To add someone: measure the face box and eye positions (Apple Vision or any face detector) and the top of the hair, add a row to the script, and run `node scripts/make-portraits.mjs`.
