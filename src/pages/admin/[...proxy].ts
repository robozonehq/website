import type { APIRoute } from "astro";

const proxyRequest = (request: Request) => {
  const proxied = Object.create(request);
  proxied.url = request.url.replace(/^\/admin/, '');

  return proxied;
};

export const ALL: APIRoute = async ({ request }) => {
  const proxy = proxyRequest(request);
  const response = await fetch(proxy);
  console.log(response);
  return new Response(response.body);
};
