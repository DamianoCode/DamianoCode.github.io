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
  integrations: [
    sitemap({
      // CV w przygotowaniu ma noindex, więc trafia do mapy dopiero, gdy ma treść.
      filter: (page) => cvReady || !page.includes('/cv'),
      // Data builda: strona jest statyczna, więc publikacja = ostatnia zmiana.
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
});
