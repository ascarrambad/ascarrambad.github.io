import { readFile } from "node:fs/promises";

export const prerender = true;

export async function GET(): Promise<Response> {
  const portrait = await readFile("sources/v1/assets/profile.jpg");

  return new Response(portrait, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
