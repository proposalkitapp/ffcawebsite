import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import { buildSitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/api/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => buildSitemapResponse(getRequest()),
    },
  },
});