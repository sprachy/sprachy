import { sprachdex } from "$lib/sprachdex"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async ({ locals }) => {
  const baseUrl = locals.env.FRONTEND_BASE_URL

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }
  return {
    headers,
    body: `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    >
    <url>
      <loc>${baseUrl}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  ${sprachdex.publishedPatterns
        .map(pattern =>
          `
  <url>
    <loc>${baseUrl}/pattern/${pattern.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
        )
        .join('')}
    </urlset>`,
  }
}