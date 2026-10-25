import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/client/", import.meta.url));

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const files = await walk(root);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const pages = new Map();

const routeFor = (file) => {
  const rel = "/" + relative(root, file).replace(/\\/g, "/");
  if (rel.endsWith("/index.html")) return rel.slice(0, -"index.html".length).replace(/(.)\/$/, "$1");
  return rel.replace(/\.html$/, "");
};

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(routeFor(file), { file, html, ids });
}

const problems = [];

for (const [route, { html }] of pages) {
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) problems.push(`${route}: expected 1 <h1>, found ${h1s}`);

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) problems.push(`${route}: <img> without alt: ${m[0].slice(0, 80)}…`);
  }

  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href.startsWith("/_astro/") || href.startsWith("/fonts/") || /\.(png|ico|jpg|svg|woff2?|ttf|css|xml|txt|webmanifest)$/.test(href)) {
      const asset = join(root, href.split("#")[0].split("?")[0]);
      if (!(await exists(asset)) && !href.startsWith("/sitemap")) problems.push(`${route}: missing asset ${href}`);
      continue;
    }
    const [path, hash] = href.split("#");
    const targetRoute = path === "" ? route : path.replace(/(.)\/$/, "$1");
    const target = pages.get(targetRoute);
    if (!target) {
      problems.push(`${route}: link to missing page ${href}`);
      continue;
    }
    if (hash && !target.ids.has(hash)) problems.push(`${route}: link to missing anchor ${href}`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`✓ ${pages.size} pages checked: internal links, anchors, image alt text, one <h1> each.`);
