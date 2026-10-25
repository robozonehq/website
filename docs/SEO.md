# Search visibility

The site already sends every on-page signal search engines use for a brand name. What decides whether "RoboZone" searches show this site first is now mostly off the site: Google has to crawl it, trust that `robozone.world` is the organization's real home, and see other sites pointing to it.

No one can guarantee a #1 ranking. Similar names already belong to unrelated apps, games, and robotics businesses. Searches that add context ("RoboZone NJ", "RoboZone robotics", "RoboZone South Brunswick") are the realistic first wins. The plain name follows as links and mentions build up.

## Already on the site

| Signal | Where |
| --- | --- |
| Organization structured data (name, alternate names "Robo Zone" and "RoboZone NJ", logo, email, founders, founding place, topics) | `src/lib/seo.ts`, `brand` in `src/data/site.ts` |
| WebSite, WebPage/AboutPage, and breadcrumb structured data on every page; Course data on `/program` | `src/layouts/Layout.astro`, `src/pages/program.astro` |
| Titles that start with or contain "RoboZone" | each page in `src/pages` |
| Canonical URLs on `https://robozone.world` (or `SITE_URL`) | `src/layouts/Layout.astro` |
| `robots.txt`, `sitemap.xml` | `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts` |
| Favicons at 48px multiples, `favicon.ico` at the root, web manifest, Open Graph and Twitter cards | `public/`, `scripts/make-brand-images.mjs` |

## Owner steps, in order

1. **Go live on HTTPS** at `https://robozone.world` (see `DOMAIN-LAUNCH.md`).
2. **Send `www` to the bare domain with a 301**, so Google sees one site, not two. With Cloudflare: a Redirect Rule from `www.robozone.world/*` to `https://robozone.world/${1}`.
3. **301 the old domain.** Every path on `robozonenj.org` goes to the same path on `robozone.world` (config in `DOMAIN-LAUNCH.md`).
4. **Google Search Console** (the `robozone.world` property is verified):
   - Sitemaps → submit `https://robozone.world/sitemap.xml`.
   - URL Inspection → enter `https://robozone.world/` → Request indexing. Repeat for `/program` and `/about`.
   - Verify `robozonenj.org` too, then Settings → Change of address → move it to `robozone.world`. This passes the old domain's history to the new one, and only works after step 3.
5. **Bing Webmaster Tools**: Import from Google Search Console. Bing also feeds DuckDuckGo, Yahoo, and Ecosia.
6. **Earn links and mentions.** Each should use the exact name "RoboZone" and link to `https://robozone.world`:
   - HCB organization page (website field)
   - Code Ninjas South Brunswick, if they will list or mention the program
   - School, district, library, or club pages that list student organizations or summer programs
   - Social profiles (Instagram, LinkedIn, YouTube), with the same name, logo, and link
   - Local news or community calendars when a session is announced
7. **Keep the name identical everywhere**: "RoboZone", same logo, same email.
8. **Optional: Google Business Profile.** Only if there is a real address or service area to list. A profile with a made-up location can be suspended.

## After launch

- Check Search Console → Pages in about a week to confirm all six pages are indexed.
- Rich-result checks: paste a page URL into Google's Rich Results Test and the Schema Markup Validator.
- Results for a new domain usually take a few weeks to settle.
