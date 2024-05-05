import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async ({ url, request }, next) => {
  if (!url.pathname.startsWith("/admin")) return next();
  return fetch("http://149.28.43.245:8001/_");
  /*return fetch(new Request(
    "http://149.28.43.245:8001".concat(url.pathname.replace(/\/admin/, '')),
    request
  ));*/
});
