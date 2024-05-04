import type { APIRoute } from "astro";

const proxyRequest = (request: Request) => {
  const proxyUrl = "http://149.28.43.245:8001";
  console.log(request.url);

  return new Request(
    proxyUrl.concat(request.url.replace(/(.*?)admin/, '')),
    request
  );
};

export const ALL: APIRoute = async ({ request }) => {
  const proxy = proxyRequest(request);
  console.log(proxy.url);
  const response = await fetch(proxy);
  console.log(response);
  return new Response(response.body);
};
