import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lakeshoreoutdoor.com',
  output: 'static',
  integrations: [
    sitemap({ entryLimit: 45000 })
  ]
});
