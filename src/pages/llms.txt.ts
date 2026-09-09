import type { APIRoute } from "astro";
import { renderLlmsTxt } from "@/data/llms";

// Served as a file rather than a page: the audience is a fetch, not a browser.
export const GET: APIRoute = () =>
  new Response(renderLlmsTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
