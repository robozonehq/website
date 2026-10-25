import type { TeamMember } from "../data/site.ts";

export interface Crumb {
  name: string;
  path: string;
}

export interface SeoInput {
  siteUrl: string;
  canonical: string;
  title: string;
  description: string;
  image: string;
  crumbs?: Crumb[];
  extra?: Record<string, unknown>[];
  pageType?: string;
}

export interface OrgFacts {
  name: string;
  alternateNames: string[];
  email: string;
  description: string;
  founded: number;
  slogan: string;
  locality: string;
  region: string;
  country: string;
  knowsAbout: string[];
  team: Pick<TeamMember, "name" | "role">[];
}

export const ids = (siteUrl: string) => ({
  org: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  logo: `${siteUrl}/#logo`,
});

export function organization(siteUrl: string, f: OrgFacts) {
  const id = ids(siteUrl);
  return {
    "@type": ["Organization", "EducationalOrganization"],
    "@id": id.org,
    name: f.name,
    alternateName: f.alternateNames,
    url: `${siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      "@id": id.logo,
      url: `${siteUrl}/images/logo.png`,
      contentUrl: `${siteUrl}/images/logo.png`,
      width: 512,
      height: 512,
      caption: f.name,
    },
    image: { "@id": id.logo },
    email: f.email,
    description: f.description,
    slogan: f.slogan,
    foundingDate: String(f.founded),
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: f.locality,
        addressRegion: f.region,
        addressCountry: f.country,
      },
    },
    founder: f.team.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
    knowsAbout: f.knowsAbout,
  };
}

export function website(siteUrl: string, name: string, alternateNames: string[], description: string) {
  const id = ids(siteUrl);
  return {
    "@type": "WebSite",
    "@id": id.website,
    url: `${siteUrl}/`,
    name,
    alternateName: alternateNames,
    description,
    inLanguage: "en",
    publisher: { "@id": id.org },
  };
}

export function breadcrumbs(siteUrl: string, canonical: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? `${siteUrl}/` : new URL(c.path, `${siteUrl}/`).href.replace(/\/$/, ""),
    })),
  };
}

export function graph(input: SeoInput, org: Record<string, unknown>, site: Record<string, unknown>) {
  const id = ids(input.siteUrl);
  const isHome = input.canonical.replace(/\/$/, "") === input.siteUrl;
  const crumbs = input.crumbs && input.crumbs.length > 1 ? breadcrumbs(input.siteUrl, input.canonical, input.crumbs) : null;
  const page = {
    "@type": input.pageType ?? "WebPage",
    "@id": `${input.canonical}#webpage`,
    url: input.canonical,
    name: input.title,
    description: input.description,
    inLanguage: "en",
    isPartOf: { "@id": id.website },
    primaryImageOfPage: { "@type": "ImageObject", url: input.image },
    ...(isHome ? { about: { "@id": id.org } } : {}),
    ...(crumbs ? { breadcrumb: { "@id": crumbs["@id"] } } : {}),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [org, site, page, ...(crumbs ? [crumbs] : []), ...(input.extra ?? [])],
  };
}
