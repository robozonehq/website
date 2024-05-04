import { defineConfig } from 'astro/config';
import proxyMiddleware from './plugins/proxy-middleware.mjs';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [
    proxyMiddleware("/api", {
      target: "http://149.28.43.245:8001/",
      changeOrigin: true,
    }),
  ],
});

