import { defineMiddleware } from 'astro:middleware';

/**
 * Polska typografia: jednoliterowe słowa (a, i, o, u, w, z) nie zostają na końcu wiersza. Spacja po nich
 * staje się twardą spacją. Strona jest statyczna, więc to działa raz, przy budowaniu, na każdej stronie
 * (także we wpisach z Markdowna). Zmienia tylko tekst między znacznikami, nigdy atrybuty, skrypty ani kod.
 */
const skipped = /(<(script|style|pre|code|textarea)\b[\s\S]*?<\/\2>)|>([^<]+)</g;
const orphan = /(?<=^|[\s(„"])([aiouwzAIOUWZ]) +/g;

const tieOrphans = (html: string) =>
  html.replace(skipped, (match, block, _tag, text) =>
    block ? match : `>${text.replace(orphan, '$1 ')}<`,
  );

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  return new Response(tieOrphans(html), { status: response.status, headers: response.headers });
});
