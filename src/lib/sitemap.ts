const DEFAULT_SITE_URL = "https://firstfruitsca.org";

type SitemapEntry = {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
};

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/academics", changefreq: "monthly", priority: "0.8" },
  { path: "/admissions", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

function normalizeOrigin(value: string | undefined | null) {
  if (!value) return "";
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteOrigin(request?: Request) {
  const configured = normalizeOrigin(
    process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL,
  );
  if (configured) return configured;

  const host = request?.headers.get("x-forwarded-host") || request?.headers.get("host");
  if (host) {
    const protocol = request?.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    return `${protocol}://${host}`;
  }

  return DEFAULT_SITE_URL;
}

export function buildSitemapXml(origin: string) {
  const urls = entries
    .map((entry) =>
      [
        `  <url>`,
        `    <loc>${origin}${entry.path}</loc>`,
        entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
        entry.priority ? `    <priority>${entry.priority}</priority>` : null,
        `  </url>`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
  ].join("\n");
}

export function buildSitemapResponse(request?: Request) {
  return new Response(buildSitemapXml(getSiteOrigin(request)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}