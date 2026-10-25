# Domain launch: robozone.world

The organization stays **RoboZone**. `robozone.world` is its intended primary web address; it is not a separate organization and not evidence of international operations.

Nothing below has been done to live systems. This repo change only prepares the site. **No domain was bought, no DNS or email changed, nothing deployed.**

## What the code does now

| Item | Setting | Current value |
| --- | --- | --- |
| Canonical site address | `site` in `astro.config.mjs` (env `SITE_URL`) | `https://robozone.world` by default |
| Canonical URLs, Open Graph URLs/image, sitemap, robots.txt, structured data | Derived from the setting above | Follow it automatically |
| Internal links | Relative (`/program`, `/signup#online`) | Work on any host |
| Contact email | `site.email` in `src/data/site.ts` | **`team@robozonenj.org`** (unchanged: a new web domain doesn't create a mailbox) |
| Sign-up form endpoint | `PUBLIC_POCKETBASE_URL`, default in `SignupForm.astro` | `https://robozonenj.org/admin` (unchanged) |
| Donation links | `links.donate` | HCB, unchanged |
| Dev toolbar | `devToolbar.enabled: false` | Never shipped in builds anyway (verified: 0 references in `dist/`) |

**Until robozone.world works over HTTPS**, build production with the old domain so canonicals and share previews point at a working site:

```sh
SITE_URL=https://robozonenj.org npm run build
```

For Docker, pass it as a build arg/env in `Dockerfile.web` (`ENV SITE_URL=...` before `RUN npm run build`) or in the compose build config.

## Going live with a GoDaddy domain (owner, Oct 2026)

The owner controls DNS and hosting and is registering `robozone.world` through GoDaddy. GoDaddy is the **registrar**; the site still needs a server (or static host) behind it.

1. **Make sure the origin is up first.** The old domain's server was returning Cloudflare 522 (origin unreachable). Pointing a new domain at the same server won't help until `docker compose up` is running and port 80 answers.
2. **Pick one way to handle DNS and HTTPS:**
   - **Cloudflare (matches the old domain):** add `robozone.world` to Cloudflare, then in GoDaddy → Domain → DNS → Nameservers, switch to the two Cloudflare nameservers it gives you. In Cloudflare, add `A @ → <server IP>` (proxied) and `CNAME www → robozone.world` (proxied). Cloudflare provides the certificate. nginx here only listens on port 80, so use SSL mode **Flexible** for now, or add an origin certificate and port 443 to nginx and use **Full (strict)**.
   - **GoDaddy DNS only:** in GoDaddy DNS records, set `A @ → <server IP>` and `CNAME www → @`. Then HTTPS must come from the server: add a certificate (for example certbot) and a `listen 443 ssl` block to `nginx/nginx.conf`.
3. **Static option (no server change needed for content):** every page is prerendered, so `dist/client/` can be served by any static host. Keep PocketBase reachable at `robozonenj.org/admin/` for future in-person sign-ups.
4. Deploy a build with the default `SITE_URL` (`https://robozone.world`). Don't switch on redirects from the old domain until the checks in step 3 below pass.
5. DNS changes can take minutes to a few hours to propagate.

## Launch steps (in order)

1. **Hosting.** The repo deploys with Docker Compose: nginx (port 80) → Astro Node server (4321) and PocketBase (8080, proxied at `/admin/`). Cloudflare sits in front of `robozonenj.org`, and the origin was returning **522** on 2026-10-23. Fix the origin first; a new domain won't fix a down server.
2. **Domain + DNS.** Register `robozone.world` (owner decision), point it at the same origin (or Cloudflare), and get a valid HTTPS certificate.
3. **Verify** `https://robozone.world/`, `/program`, `/signup`, `/sitemap.xml`, `/og-image.jpg`, and `/images/logo.png` all load over HTTPS.
4. **Build** with the default `SITE_URL` (or set `SITE_URL=https://robozone.world` explicitly) and deploy.
5. **Then** turn on redirects from the old domain (below).
6. **Email (later, owner decision).** Keep `team@robozonenj.org` for now (confirmed Oct 2026). When specific `@robozone.world` addresses exist and receive mail, change `site.email` once; every mailto link and visible address updates together. Adding a domain in GoDaddy doesn't create mailboxes, and changing the new domain's MX records must not touch `robozonenj.org`'s Google Workspace MX.
7. Update the canonical domain in Google Search Console (if used), HCB's website field, social profiles, and printed materials.

## Integrations that depend on the domain

| Integration | Today | Notes |
| --- | --- | --- |
| PocketBase sign-ups | Browser posts to `https://robozonenj.org/admin/api/collections/signups/records` | PocketBase 0.22 allows all CORS origins by default (`--origins` default `*`), so a page on robozone.world can keep using the old endpoint. **Keep `robozonenj.org/admin/` reachable and exclude it from redirects** until the endpoint moves. Optionally later: serve PocketBase at `https://robozone.world/admin` (same nginx config handles any host) and set `PUBLIC_POCKETBASE_URL` to it. Don't loosen collection rules. |
| PocketBase admin UI | `robozonenj.org/admin/_/` | Same as above. |
| PocketBase email template | May reference `https://robozonenj.org/images/logo.png` | Keep `/images/logo.png` served on the old host, or update the template. |
| Auth / cookies | None in the site | No callbacks or cookies to update. |
| HCB | `hcb.hackclub.com/...` | Unchanged; don't rewrite. |

## Redirect map (activate only after step 3 passes)

301 every path on `robozonenj.org` and `www.robozonenj.org` to the same path and query on `https://robozone.world`, **except** `/admin/` (PocketBase) while the form still uses it.

| Old | New |
| --- | --- |
| `/` | `/` |
| `/program`, `/about`, `/get-involved`, `/signup` | Same path |
| `/?page=about`, `/?page=support` | Same query; the homepage script then forwards to `/about` and `/get-involved#support` |
| `/images/*`, `/og-image.jpg` | Same path |
| `/admin/*` | **Not redirected** |

Example nginx server block for the old host (not active in `nginx/nginx.conf`):

```nginx
server {
  listen 80;
  server_name robozonenj.org www.robozonenj.org;

  # PocketBase API/admin stays here until the sign-up endpoint moves.
  location /admin/ {
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    rewrite ^/admin(.*)$ $1 break;
    proxy_pass http://pocketbase:8080;
  }

  location / {
    return 301 https://robozone.world$request_uri;
  }
}
```

If Cloudflare handles redirects instead, use a single redirect rule with "preserve query string" on, and exclude `/admin/*`.
