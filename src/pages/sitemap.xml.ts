import type { APIRoute } from "astro";
import { site as siteData } from "../data/site";

const pages = ["/", "/program", "/about", "/get-involved", "/signup"];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(siteData.url);
  const urls = pages
    .map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
