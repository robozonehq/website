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
          target: "https://pocketbase:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/admin/, '')
        }
      }
    }
  }
});

