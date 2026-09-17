# Portfolio, Damian Ułaś

Strona na Astro. Treść pochodzi z publicznego profilu github.com/DamianoCode.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statyczne pliki w dist/
npm run images   # renderuje public/og.png i apple-touch-icon.png (wymaga Chrome)
```

## Treść

- **Projekty, umiejętności, sekcja AI, teksty SEO:** `src/data/projects.ts`. Tabela umiejętności buduje się z pola `usedIn`.
- **Blog:** plik `.md` w `src/content/blog/` = wpis (wzór: `jak-pisac-wpisy.md`, ma `draft: true`). Wpisy trafiają do `/rss.xml` i sitemapy.
- **CV:** uzupełnij `src/data/cv.ts` (doświadczenie, edukacja, opcjonalnie PDF w `public/`). Dopóki jest puste, `/cv` pokazuje komunikat i ma `noindex`.
  Gdy CV będzie gotowe, usuń filtr `/cv` z `astro.config.mjs`, żeby trafiło do sitemapy.

## Publikacja

Każdy push na `main` buduje stronę i publikuje ją na https://damianocode.github.io (`.github/workflows/deploy.yml`).

Przejście na własną domenę:

1. Dodaj plik `public/CNAME` z samą domeną, np. `damianulas.pl`.
2. Zmień `SITE_URL` w workflow (i domyślną wartość w `astro.config.mjs`).
3. U rejestratora ustaw rekordy DNS dla GitHub Pages, a w ustawieniach repozytorium (Settings → Pages) włącz „Enforce HTTPS”.

## SEO

- Adres strony: zmienna `SITE_URL` przy buildzie (domyślnie `https://damianocode.github.io`). Od niej zależą canonical, sitemapa, robots.txt, RSS i obrazek udostępniania.
- Każda strona ma tytuł, opis, canonical, Open Graph i dane strukturalne schema.org (Person, WebSite, ProfilePage, BlogPosting).
- Po publikacji dodaj stronę do Google Search Console i zgłoś `sitemap-index.xml`.
- Wygląd obrazka udostępniania: `scripts/og.html`.
