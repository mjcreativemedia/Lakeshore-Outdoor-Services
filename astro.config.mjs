import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const excludedPaths = new Set(['/og', '/thank-you', '/404']);

const normalizePath = (pathname) => (pathname !== '/' ? pathname.replace(/\/$/, '') : pathname);

export default defineConfig({
  site: 'https://lakeshoreoutdoor.com',
  output: 'static',
  integrations: [
    sitemap({
      entryLimit: 45000,
      filter: (page) => {
        const value = typeof page === 'string' ? page : page.url;
        if (!value) return true;
        const pathname = typeof value === 'string'
          ? new URL(value, 'https://lakeshoreoutdoor.com').pathname
          : value.pathname;
        return !excludedPaths.has(normalizePath(pathname));
      }
    })
  ]
});
