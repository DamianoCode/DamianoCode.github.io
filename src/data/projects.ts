// Projekty z publicznych repozytoriów github.com/DamianoCode.

export type ProjectId = 'placemates' | 'korepetytor' | 'widget' | 'claudius' | 'ecommerce';

/**
 * Waga projektu na stronie: główny ze zrzutem, szeroki ze zrzutami z laptopa i telefonu,
 * narzędzia do pracy z agentami, mniejszy wpis nad archiwum.
 */
export type ProjectTier = 'lead' | 'wide' | 'tool' | 'minor';

export interface Project {
  id: ProjectId;
  tier: ProjectTier;
  name: string;
  /** Krótka nazwa do nagłówka kolumny w tabeli umiejętności. */
  short: string;
  year: string;
  /** Rodzaj projektu, pokazywany obok roku. */
  kind: string;
  /** Projekt w budowie: krótka informacja obok roku. */
  status?: string;
  summary: string;
  detail: string;
  stack: string[];
  links: { href: string; label: string }[];
  /** Stany produktu pokazane jako legenda (widżet: światła sygnalizatora). */
  states?: { tone: 'red' | 'amber' | 'green'; label: string; text: string }[];
}

export const projects: Project[] = [
  {
    id: 'placemates',
    tier: 'lead',
    name: 'PlaceMates',
    short: 'PlaceMates',
    year: '2026',
    kind: 'Aplikacja webowa i PWA',
    summary: 'Wspólna mapa dla paczki znajomych: miejsca, w które naprawdę chodzicie, i wasze oceny.',
    detail:
      'Każda kategoria ma własny sposób oceniania: kawiarnię ocenia się za kawę, klimat i ceny, a punkt widokowy za widok i podejście. Do tego wspólne listy, planer wypadów z trasami i powiadomienia push. Ta sama kawiarnia oceniona w trzech grupach trafia do jednego rankingu. Działa jako PWA.',
    stack: ['Next.js 16', 'React 19', 'Supabase', 'PostGIS', 'Drizzle', 'MapLibre', 'Tailwind'],
    links: [
      { href: 'https://placemates.pl', label: 'placemates.pl' },
      { href: 'https://github.com/DamianoCode/PlaceMates', label: 'Kod' },
    ],
  },
  {
    id: 'korepetytor',
    tier: 'wide',
    name: 'Asystent korepetytora',
    short: 'Korepetytor',
    year: '2026',
    kind: 'Aplikacja webowa i PWA',
    status: 'w budowie',
    summary: 'Aplikacja, która zastępuje korepetytorowi angielskiego segregator: uczniowie, terminarz, plany lekcji i sprawdziany.',
    detail:
      'Stałe terminy same tworzą lekcje na 8 tygodni do przodu, a lekcję przenosi się przeciągnięciem w widoku tygodnia. Notatka po lekcji zajmuje pół minuty: niezrobione punkty planu przechodzą na kolejne zajęcia. Sprawdzian jednym kliknięciem wstawia powtórkę na początek planu i oznacza tematy na mapie. Działa w przeglądarce i jako PWA na telefonie. Repozytorium jest prywatne, a aplikację rozwijam dalej.',
    stack: ['Next.js 16', 'React 19', 'PostgreSQL', 'Drizzle', 'Better Auth', 'dnd-kit', 'Zod', 'Vitest', 'Tailwind'],
    links: [],
  },
  {
    id: 'widget',
    tier: 'tool',
    name: 'Widżet Claude Code',
    short: 'Widżet',
    year: '2026',
    kind: 'Aplikacja na Windows',
    summary: 'Sygnalizator przy krawędzi ekranu Windows, który mówi, która sesja Claude Code czeka na Ciebie.',
    detail:
      'Obok świateł widać limit 5-godzinny i tygodniowy z prognozą do resetu oraz zajętość kontekstu każdej sesji. Aktualizuje się sam, paczkami różnicowymi.',
    states: [
      { tone: 'red', label: 'Czeka na Ciebie', text: 'zgoda albo odpowiedź' },
      { tone: 'amber', label: 'Pracuje', text: 'sesja jest w trakcie' },
      { tone: 'green', label: 'Gotowe', text: 'jest nowy wynik' },
    ],
    stack: ['C#', '.NET 10', 'WPF', 'Velopack', 'rozszerzenie VS Code w TypeScript'],
    links: [
      { href: 'https://github.com/DamianoCode/claude-widget/releases/latest', label: 'Pobierz instalator' },
      { href: 'https://github.com/DamianoCode/claude-widget', label: 'Kod' },
    ],
  },
  {
    id: 'claudius',
    tier: 'tool',
    name: 'Claudius',
    short: 'Claudius',
    year: '2026',
    kind: 'Wtyczka do Claude Code',
    summary: 'Wtyczka do Claude Code, która dobiera sposób pracy do ryzyka zmiany.',
    detail:
      'Drobną poprawkę wprowadza od razu. Większą zmianę najpierw klasyfikuje, zamraża kontrakt i rozdziela między czterech podagentów na różnych modelach, a na końcu zleca niezależny przegląd. Chroni przed poprawnym zbudowaniem złej rzeczy i przed naprawianiem błędu, którego nikt nie zlokalizował.',
    stack: ['Claude Code', 'podagenci', 'hooki', 'Node.js'],
    links: [{ href: 'https://github.com/DamianoCode/claudius', label: 'Kod' }],
  },
  {
    id: 'ecommerce',
    tier: 'minor',
    name: 'Panel sklepu internetowego',
    short: 'E-commerce',
    year: '2023-2026',
    kind: 'Panel administracyjny',
    summary: 'Panel administracyjny, z którego jeden właściciel prowadzi kilka sklepów.',
    detail:
      'Produkty, kategorie, kolory, rozmiary, banery i zamówienia, każde z własną tabelą i formularzem. Logowanie przez Clerk, zdjęcia w Cloudinary, API dla sklepu po stronie klienta.',
    stack: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'Clerk', 'Zod', 'TanStack Table'],
    links: [{ href: 'https://github.com/DamianoCode/ecommerce-admin', label: 'Kod' }],
  },
];

export interface ArchiveItem {
  name: string;
  year: string;
  what: string;
  href: string;
}

/** Wcześniejsze repozytoria, od najnowszych. */
export const archive: ArchiveItem[] = [
  { name: 'next-blog', year: '2022', what: 'blog w Next.js', href: 'https://github.com/DamianoCode/next-blog' },
  { name: 'react-todo-list', year: '2022', what: 'lista zadań w React', href: 'https://github.com/DamianoCode/react-todo-list' },
  { name: 'crud-app', year: '2021', what: 'aplikacja CRUD w Vue', href: 'https://github.com/DamianoCode/crud-app' },
  { name: 'simple-cms', year: '2021', what: 'prosty CMS w PHP z logowaniem', href: 'https://github.com/DamianoCode/simple-cms' },
  { name: 'weather-app-vue', year: '2021', what: 'pogoda w Vue', href: 'https://github.com/DamianoCode/weather-app-vue' },
  { name: 'landing-page', year: '2021', what: 'landing page w HTML i Sass', href: 'https://github.com/DamianoCode/landing-page' },
];
