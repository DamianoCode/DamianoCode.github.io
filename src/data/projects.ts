// Projekty z publicznych repozytoriów github.com/DamianoCode.

export type ProjectId = 'placemates' | 'widget' | 'claudius' | 'ecommerce';

export interface Project {
  id: ProjectId;
  name: string;
  /** Krótka nazwa do nagłówka kolumny w tabeli umiejętności. */
  short: string;
  year: string;
  summary: string;
  detail: string;
  stack: string[];
  links: { href: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: 'placemates',
    name: 'PlaceMates',
    short: 'PlaceMates',
    year: '2026',
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
    id: 'widget',
    name: 'Widżet Claude Code',
    short: 'Widżet',
    year: '2026',
    summary: 'Sygnalizator przy krawędzi ekranu Windows, który mówi, która sesja Claude Code czeka na Ciebie.',
    detail:
      'Czerwone światło: sesja czeka na zgodę albo odpowiedź. Żółte: sesja pracuje. Zielone: jest nowy wynik. Obok widać limit 5-godzinny i tygodniowy z prognozą do resetu oraz zajętość kontekstu każdej sesji. Aktualizuje się sam, paczkami różnicowymi.',
    stack: ['C#', '.NET 10', 'WPF', 'Velopack', 'rozszerzenie VS Code w TypeScript'],
    links: [
      { href: 'https://github.com/DamianoCode/claude-widget/releases/latest', label: 'Pobierz instalator' },
      { href: 'https://github.com/DamianoCode/claude-widget', label: 'Kod' },
    ],
  },
  {
    id: 'claudius',
    name: 'Claudius',
    short: 'Claudius',
    year: '2026',
    summary: 'Wtyczka do Claude Code, która dobiera sposób pracy do ryzyka zmiany.',
    detail:
      'Drobną poprawkę wprowadza od razu. Większą zmianę najpierw klasyfikuje, zamraża kontrakt i rozdziela między czterech podagentów na różnych modelach, a na końcu zleca niezależny przegląd. Chroni przed poprawnym zbudowaniem złej rzeczy i przed naprawianiem błędu, którego nikt nie zlokalizował.',
    stack: ['Claude Code', 'podagenci', 'hooki', 'Node.js'],
    links: [{ href: 'https://github.com/DamianoCode/claudius', label: 'Kod' }],
  },
  {
    id: 'ecommerce',
    name: 'Panel sklepu internetowego',
    short: 'E-commerce',
    year: '2023–2026',
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
