import { defineConfig } from "astro/config";

import node from "@astrojs/node";

export default defineConfig({
  site: process.env.SITE_URL || "https://robozone.world",
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
  devToolbar: { enabled: false },
});
