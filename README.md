# Portfolio, Damian Ułaś

Strona na Astro. Treść pochodzi z publicznego profilu github.com/DamianoCode.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statyczne pliki w dist/
npm run images   # renderuje public/og.jpg (wymaga Chrome)
```

## Treść

- **Dwa języki:** polski pod `/`, angielski pod `/en` (strona główna). Każdy tekst ma wersję `pl` i `en`:
  w danych (`src/data/*.ts`) i w obiekcie `copy` na początku komponentu. Brak tłumaczenia to błąd typu w `astro check`.
  Blog i CV są tylko po polsku. Nowe dopasowane słowo (tytuł sekcji, hasło kafla) wymaga zmierzenia `fit` w obu językach.
- **Projekty, umiejętności, sekcja AI, teksty SEO:** `src/data/projects.ts`, `skills.ts`, `ai.ts`, `profile.ts`. Tabela umiejętności buduje się z pola `usedIn`.
- **Blog:** plik `.md` w `src/content/blog/` = wpis (wzór: `jak-pisac-wpisy.md`, ma `draft: true`). Wpisy trafiają do `/rss.xml` i sitemapy.
- **CV:** uzupełnij `src/data/cv.ts` (doświadczenie, edukacja, opcjonalnie PDF w `public/`). Dopóki jest puste, `/cv` pokazuje komunikat i ma `noindex`.
  Gdy CV będzie gotowe, usuń filtr `/cv` z `astro.config.mjs`, żeby trafiło do sitemapy.
- **Menu i stopka:** „Blog” i RSS pokazują się dopiero po pierwszym opublikowanym wpisie, a „CV” dopiero, gdy `cv.ts` ma treść.
- **Typografia:** `src/middleware.ts` przy budowaniu wstawia twardą spację po jednoliterowych słowach (a, i, o, u, w, z), więc nie zostają na końcu wiersza. W tekstach nie trzeba wpisywać `&nbsp;`.

## Logo

Znak to klawiatura, na której karminowe są tylko klawisze d i c (damianocode). Podpis „damianocode” obok znaku
to tekst złożony krojem Anybody (szerokość 62%, grubość 850), nie osobny plik.

- `public/brand/znak-klawiatura.svg`: znak w kolorze, na jasne tło. `-jasny.svg`: na ciemne tło.
  `-jednobarwny.svg`: sama sylwetka. `znak-klawiatura.png`: duży eksport 1200 × 800.
- `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`: uproszczona klawiatura (6 klawiszy, bez liter)
  na ciemnym kwadracie, czytelna od 16 px.
- `src/data/brand.ts`: te same ścieżki co w `znak-klawiatura.svg`, dla komponentu `BrandMark`.
  Zmiana znaku zaczyna się w SVG, a potem trzeba przepisać ścieżki do `brand.ts`.

Awatar (rysunek w słuchawkach) jest na profilach (GitHub, LinkedIn), a na stronie tylko jako podpis w Kontakcie (`src/assets/brand/awatar.webp`).

```bash
npm run images   # odświeża public/og.jpg z scripts/og.html i nocnej sceny scripts/assets/noc.webp (wymaga Chrome)
# czerwień w nowej grafice do karminu strony (#BE2337), np. awatar 512 px:
node scripts/recolor-crimson.mjs awatar.png src/assets/brand/awatar.webp 512 90
```

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
