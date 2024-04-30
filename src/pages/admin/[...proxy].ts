import type { APIRoute } from "astro";

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL("http://149.28.43.245:8001");
  const requestUrl = new URL(request.url);

  return new URL(requestUrl.pathname.replace(/^\/admin/, ''), proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request);
  const response = await fetch(proxyUrl.href);
  return new Response(response.body);
};
