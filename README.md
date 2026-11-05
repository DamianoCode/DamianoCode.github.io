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
  Blog jest tylko po polsku. CV ma wersje `/cv` i `/en/cv`. Nowe dopasowane słowo (tytuł sekcji, hasło kafla) wymaga zmierzenia `fit` w obu językach.
- **Projekty, umiejętności, sekcja AI, teksty SEO:** `src/data/projects.ts`, `skills.ts`, `ai.ts`, `profile.ts`. Tabela umiejętności buduje się z pola `usedIn`.
- **Blog:** plik `.md` w `src/content/blog/` = wpis (wzór: `jak-pisac-wpisy.md`, ma `draft: true`). Wpisy trafiają do `/rss.xml` i sitemapy.
- **CV:** treść PL/EN edytuj w `src/data/cv.json`. PDF-y znajdują się w `public/cv/damian-ulas-cv-pl.pdf` i `public/cv/damian-ulas-cv-en.pdf`; podmieniaj je pod tymi samymi nazwami. Zaktualizuj `document.updated` (data dokumentu, `YYYY-MM-DD`) i odpowiadającą treść HTML w obu językach. Rozmiar pliku oblicza się automatycznie. Projekty są pobierane ze wspólnych danych portfolio.
  `src/data/cv.ts` i schemat w `src/lib/cv-validation.mjs` sprawdzają kompletność obu języków, lokalne ścieżki, istnienie PDF-ów, ich nagłówek, zakończenie, limit 5 MB i poprawną datę kalendarzową. Błąd przerywa build zamiast publikować niedziałający link. Uruchom `npm run test:cv`, `npm run check` i `npm run build`, a potem sprawdź otwieranie i pobieranie obu dokumentów. CV automatycznie trafia do sitemapy.
  Źródłem pierwszych PDF-ów są dokumenty PL/EN z Dysku Google z 2026-10-29. Publikujemy wyłącznie gotowe PDF-y i dane strony, bez DOCX-ów, notatek weryfikacyjnych ani danych dostępowych. Pliki są publiczne, zawierają kontakt z oryginałów (w tym telefon) i nie wymagają dostępu do Dysku Google. Przed podmianą przejrzyj treść i metadane PDF-u; kontrola formatu przy buildzie nie jest skanerem bezpieczeństwa.
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
