import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { cvReady } from './src/data/cv.ts';

// Docelowy adres strony: potrzebny do linków kanonicznych, sitemapy, RSS i obrazka udostępniania.
// Ustaw SITE_URL przy buildzie albo zmień domyślną wartość.
const site = process.env.SITE_URL ?? 'https://damianocode.github.io';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  // Polski pod /, angielski pod /en. Astro ustawia z adresu Astro.currentLocale (src/i18n).
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // CV w przygotowaniu ma noindex, więc trafia do mapy dopiero, gdy ma treść.
      filter: (page) => cvReady || !page.includes('/cv'),
      // Data builda: strona jest statyczna, więc publikacja = ostatnia zmiana.
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
      // Wersje językowe strony głównej wskazują na siebie nawzajem (hreflang w sitemapie).
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-US' } },
    }),
  ],
});
