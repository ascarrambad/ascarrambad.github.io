import { readFile } from "node:fs/promises";

export const prerender = true;

export async function GET(): Promise<Response> {
  const cv = await readFile("sources/matteoriva_cv_v14.pdf");

  return new Response(cv, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="matteo-riva-cv.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
