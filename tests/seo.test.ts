import { test } from "node:test";
import assert from "node:assert/strict";
import { breadcrumbs, graph, organization, website } from "../src/lib/seo.ts";

const siteUrl = "https://robozone.world";
const facts = {
  name: "RoboZone",
  alternateNames: ["Robo Zone", "RoboZone NJ"],
  email: "team@robozonenj.org",
  description: "Student-led robotics education.",
  founded: 2024,
  slogan: "Build a circuit. Write the code. See it work.",
  locality: "South Brunswick",
  region: "NJ",
  country: "US",
  knowsAbout: ["Robotics education"],
  team: [{ name: "Samuel Asefa", role: "Co-Founder & Co-President" }],
};

test("the organization and website share one name and link to each other", () => {
  const org = organization(siteUrl, facts);
  const site = website(siteUrl, "RoboZone", facts.alternateNames, facts.description);
  assert.equal(org.name, "RoboZone");
  assert.equal(site.name, "RoboZone");
  assert.deepEqual(site.publisher, { "@id": org["@id"] });
  assert.equal(org.logo.url, "https://robozone.world/images/logo.png");
  assert.ok(org.logo.width >= 112 && org.logo.height >= 112);
});

test("the home page is about the organization and has no breadcrumb", () => {
  const g = graph(
    { siteUrl, canonical: "https://robozone.world/", title: "RoboZone", description: "d", image: "i" },
    organization(siteUrl, facts),
    website(siteUrl, "RoboZone", facts.alternateNames, facts.description),
  );
  const page = g["@graph"].find((n) => (n as { "@type": string })["@type"] === "WebPage") as Record<string, unknown>;
  assert.deepEqual(page.about, { "@id": "https://robozone.world/#organization" });
  assert.equal(g["@graph"].some((n) => (n as { "@type": string })["@type"] === "BreadcrumbList"), false);
});

test("inner pages get a breadcrumb with clean URLs", () => {
  const b = breadcrumbs(siteUrl, "https://robozone.world/program", [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/program" },
  ]);
  assert.deepEqual(
    b.itemListElement.map((i) => i.item),
    ["https://robozone.world/", "https://robozone.world/program"],
  );
});
