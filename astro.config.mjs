import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robots from "@astrojs/robots";

export default defineConfig({
  site: "https://lakeshoreoutdoor.com",
  output: "static",
  integrations: [
    sitemap(),
    robots({
      host: "https://lakeshoreoutdoor.com",
      sitemap: "https://lakeshoreoutdoor.com/sitemap-index.xml",
      policy: [{ userAgent: "*", allow: "/" }]
    })
  ]
});
