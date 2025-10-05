import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const EXCLUDED_SITEMAP_ROUTES = new Set([
  '/og/',
  '/thank-you/',
  '/404/'
]);

export default defineConfig({
  site: 'https://lakeshoreoutdoor.com',
  output: 'static',
  integrations: [
    sitemap({
      entryLimit: 45000,
      filter: (page) => !EXCLUDED_SITEMAP_ROUTES.has(page.endsWith('/') ? page : `${page}/`)
    })
  ]
});
