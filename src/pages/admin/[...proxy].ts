import type { APIRoute } from "astro";

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL("http://localhost:8001");
  const requestUrl = new URL(request.url);

  return new URL(requestUrl.pathname.replace(/^\/admin/, ''), proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request);
  console.log(proxyUrl.href);
  const response = await fetch(proxyUrl.href);
  console.log(response);
  return new Response(response.body);
};
