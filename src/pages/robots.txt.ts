import type { APIRoute } from "astro";
import { site as siteData } from "../data/site";

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(siteData.url);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", base).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
