import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    server: {
      proxy: {
        "/admin": {
          target: "http://149.28.43.245:8001",
          rewrite: (path) => path.replace(/^\/admin/, '')
        }
      }
    }
  }
});

