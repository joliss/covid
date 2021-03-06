'use strict'

let locations = require('../../../locations')

class SitemapController {
  async sitemap({ view, params, response }) {
    const mainPriority = 1.0
    let urls = locations.locators
      .slice()
      .sort((a, b) => a.path.localeCompare(b.path))
      .map((loc) => `
        <url>
          <loc>https://www.corona-cases.org${loc.path}</loc>
          <changefreq>daily</changefreq>
          <priority>${mainPriority}</priority>
        </url>
      `).join('')
    let sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.corona-cases.org/</loc>
          <changefreq>daily</changefreq>
          <priority>${mainPriority}</priority>
        </url>
        ${urls}
      </urlset>
    `
    // Not valid XML unless we strip leading space
    sitemap = sitemap.replace(/\s+</g, '<')
    response.header('Content-Type', 'application/xml')
    response.send(sitemap)
  }
}

module.exports = SitemapController
