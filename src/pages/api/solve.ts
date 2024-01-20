import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  return new Response(undefined, {
    status: 204,
    headers: { "Content-type": "application/json" },
  });
};
