import type { APIRoute } from "astro";

const proxyRequest = (request: Request) => {
  const proxyUrl = "http://localhost:8001";
  console.log(request.url);
  const proxied = Object.create(request);
  proxied.url = new Request(
    //proxyUrl.concat(request.url.replace(/(.*?)admin/, '')),
    request.url,
    request
  );

  return proxied;
};

export const ALL: APIRoute = async ({ request }) => {
  const proxy = proxyRequest(request);
  const response = await fetch(proxy);
  console.log(response);
  return new Response(response.body);
};
