// Projekty z publicznych repozytoriów github.com/DamianoCode.

import type { Locale, Localized } from '../i18n';
import { getSubjects, mailto } from './profile';

export type ProjectId = 'placemates' | 'korepetytor' | 'widget' | 'claudius' | 'ecommerce';

/**
 * Waga projektu na stronie: główny ze zrzutem, szeroki ze zrzutami z laptopa i telefonu,
 * narzędzia do pracy z agentami, mniejszy wpis nad archiwum.
 */
export type ProjectTier = 'lead' | 'wide' | 'tool' | 'minor';

export interface ProjectLink {
  href: string;
  label: string;
  /** Link do repozytorium: dostaje dopisek z nazwą projektu dla czytnika ekranu i trafia do danych strukturalnych. */
  code?: boolean;
}

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
  links: ProjectLink[];
  /** Stany produktu pokazane jako legenda (widżet: światła sygnalizatora). */
  states?: { tone: 'red' | 'amber' | 'green'; label: string; text: string }[];
}

const codeLabel: Localized = { pl: 'Kod', en: 'Code' };
const code = (href: string, locale: Locale): ProjectLink => ({ href, label: codeLabel[locale], code: true });

/** Projekty w danym języku; nazwy własne, lata i technologie są wspólne tam, gdzie się nie tłumaczą. */
const build = (locale: Locale): Project[] => {
  const pl = locale === 'pl';
  return [
    {
      id: 'placemates',
      tier: 'lead',
      name: 'PlaceMates',
      short: 'PlaceMates',
      year: '2026',
      kind: pl ? 'Aplikacja webowa i PWA' : 'Web app and PWA',
      summary: pl
        ? 'Wspólna mapa dla paczki znajomych: miejsca, w które naprawdę chodzicie, i wasze oceny.'
        : 'A shared map for a group of friends: the places you actually go to, and your ratings.',
      detail: pl
        ? 'Każda kategoria ma własny sposób oceniania: kawiarnię ocenia się za kawę, klimat i ceny, a punkt widokowy za widok i podejście. Do tego wspólne listy, planer wypadów z trasami i powiadomienia push. Ta sama kawiarnia oceniona w trzech grupach trafia do jednego rankingu. Działa jako PWA.'
        : 'Every category has its own way of rating: a café is rated for coffee, atmosphere and prices, a viewpoint for the view and the climb. On top of that, shared lists, a trip planner with routes and push notifications. The same café rated in three groups lands in a single ranking. Works as a PWA.',
      stack: ['Next.js 16', 'React 19', 'Supabase', 'PostGIS', 'Drizzle', 'MapLibre', 'Tailwind'],
      links: [
        { href: 'https://placemates.pl', label: 'placemates.pl' },
        code('https://github.com/DamianoCode/PlaceMates', locale),
      ],
    },
    {
      id: 'korepetytor',
      tier: 'wide',
      name: pl ? 'Asystent korepetytora' : 'Tutor assistant',
      short: pl ? 'Korepetytor' : 'Tutor',
      year: '2026',
      kind: pl ? 'Aplikacja webowa i PWA' : 'Web app and PWA',
      status: pl ? 'w budowie' : 'in progress',
      summary: pl
        ? 'Aplikacja, która zastępuje korepetytorowi angielskiego segregator: uczniowie, terminarz, plany lekcji i sprawdziany.'
        : 'An app that replaces an English tutor’s binder: students, schedule, lesson plans and tests.',
      detail: pl
        ? 'Stałe terminy same tworzą lekcje na 8 tygodni do przodu, a lekcję przenosi się przeciągnięciem w widoku tygodnia. Notatka po lekcji zajmuje pół minuty: niezrobione punkty planu przechodzą na kolejne zajęcia. Sprawdzian jednym kliknięciem wstawia powtórkę na początek planu i oznacza tematy na mapie. Działa w przeglądarce i jako PWA na telefonie. Repozytorium jest prywatne, a aplikację rozwijam dalej.'
        : 'Recurring slots create lessons 8 weeks ahead, and a lesson moves with a drag in the week view. A note after the lesson takes half a minute: unfinished plan items carry over to the next one. A test adds a review to the start of the plan with one click and marks the topics on the map. Runs in the browser and as a PWA on the phone. The repository is private and I keep developing the app.',
      stack: ['Next.js 16', 'React 19', 'PostgreSQL', 'Drizzle', 'Better Auth', 'dnd-kit', 'Zod', 'Vitest', 'Tailwind'],
      // Repozytorium jest prywatne, więc zamiast kodu: prośba o pokaz.
      links: [{ href: mailto(getSubjects(locale).tutorDemo), label: pl ? 'Poproś o pokaz' : 'Ask for a demo' }],
    },
    {
      id: 'widget',
      tier: 'tool',
      name: pl ? 'Widżet Claude Code' : 'Claude Code widget',
      short: pl ? 'Widżet' : 'Widget',
      year: '2026',
      kind: pl ? 'Aplikacja na Windows' : 'Windows app',
      summary: pl
        ? 'Sygnalizator przy krawędzi ekranu Windows, który mówi, która sesja Claude Code czeka na Ciebie.'
        : 'A signal light at the edge of the Windows screen that tells you which Claude Code session is waiting for you.',
      detail: pl
        ? 'Obok świateł widać limit 5-godzinny i tygodniowy z prognozą do resetu oraz zajętość kontekstu każdej sesji. Aktualizuje się sam, paczkami różnicowymi.'
        : 'Next to the lights you see the 5-hour and weekly limits with a forecast until reset, and how full the context of each session is. It updates itself with delta packages.',
      states: pl
        ? [
            { tone: 'red', label: 'Czeka na Ciebie', text: 'zgoda albo odpowiedź' },
            { tone: 'amber', label: 'Pracuje', text: 'sesja jest w trakcie' },
            { tone: 'green', label: 'Gotowe', text: 'jest nowy wynik' },
          ]
        : [
            { tone: 'red', label: 'Waiting for you', text: 'an approval or an answer' },
            { tone: 'amber', label: 'Working', text: 'the session is running' },
            { tone: 'green', label: 'Done', text: 'there is a new result' },
          ],
      stack: ['C#', '.NET 10', 'WPF', 'Velopack', pl ? 'rozszerzenie VS Code w TypeScript' : 'VS Code extension in TypeScript'],
      links: [
        {
          href: 'https://github.com/DamianoCode/claude-widget/releases/latest',
          label: pl ? 'Pobierz instalator' : 'Download the installer',
        },
        code('https://github.com/DamianoCode/claude-widget', locale),
      ],
    },
    {
      id: 'claudius',
      tier: 'tool',
      name: 'Claudius',
      short: 'Claudius',
      year: '2026',
      kind: pl ? 'Wtyczka do Claude Code' : 'Claude Code plugin',
      summary: pl
        ? 'Wtyczka do Claude Code, która dobiera sposób pracy do ryzyka zmiany.'
        : 'A Claude Code plugin that matches the way of working to the risk of a change.',
      detail: pl
        ? 'Drobną poprawkę wprowadza od razu. Większą zmianę najpierw klasyfikuje, spisuje, co ma powstać, i rozdziela pracę między czterech agentów na różnych modelach, a na końcu zleca niezależny przegląd. Chroni przed poprawnym zbudowaniem złej rzeczy i przed naprawianiem błędu, którego nikt nie zlokalizował.'
        : 'A small fix goes in straight away. A bigger change is classified first, written down as what should be built and split between four agents on different models, with an independent review at the end. It guards against correctly building the wrong thing and against fixing a bug nobody has located.',
      stack: ['Claude Code', pl ? 'podagenci' : 'subagents', pl ? 'hooki' : 'hooks', 'Node.js'],
      links: [code('https://github.com/DamianoCode/claudius', locale)],
    },
    {
      id: 'ecommerce',
      tier: 'minor',
      name: pl ? 'Panel sklepu internetowego' : 'Online store admin panel',
      short: 'E-commerce',
      year: '2023-2026',
      kind: pl ? 'Panel administracyjny' : 'Admin panel',
      summary: pl
        ? 'Panel administracyjny, z którego jeden właściciel prowadzi kilka sklepów.'
        : 'An admin panel from which one owner runs several stores.',
      detail: pl
        ? 'Produkty, kategorie, kolory, rozmiary, banery i zamówienia, każde z własną tabelą i formularzem. Logowanie przez Clerk, zdjęcia w Cloudinary, API dla sklepu po stronie klienta.'
        : 'Products, categories, colors, sizes, banners and orders, each with its own table and form. Sign-in through Clerk, images in Cloudinary, an API for the customer-facing store.',
      stack: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'Clerk', 'Zod', 'TanStack Table'],
      links: [code('https://github.com/DamianoCode/ecommerce-admin', locale)],
    },
  ];
};

const byLocale: Localized<Project[]> = { pl: build('pl'), en: build('en') };

export const getProjects = (locale: Locale) => byLocale[locale];

export interface ArchiveItem {
  name: string;
  year: string;
  what: string;
  href: string;
}

const archive: (Omit<ArchiveItem, 'what'> & { what: Localized })[] = [
  { name: 'next-blog', year: '2022', what: { pl: 'blog w Next.js', en: 'a blog in Next.js' }, href: 'https://github.com/DamianoCode/next-blog' },
  { name: 'react-todo-list', year: '2022', what: { pl: 'lista zadań w React', en: 'a to-do list in React' }, href: 'https://github.com/DamianoCode/react-todo-list' },
  { name: 'crud-app', year: '2021', what: { pl: 'aplikacja CRUD w Vue', en: 'a CRUD app in Vue' }, href: 'https://github.com/DamianoCode/crud-app' },
  { name: 'simple-cms', year: '2021', what: { pl: 'prosty CMS w PHP z logowaniem', en: 'a simple PHP CMS with sign-in' }, href: 'https://github.com/DamianoCode/simple-cms' },
  { name: 'weather-app-vue', year: '2021', what: { pl: 'pogoda w Vue', en: 'a weather app in Vue' }, href: 'https://github.com/DamianoCode/weather-app-vue' },
  { name: 'landing-page', year: '2021', what: { pl: 'landing page w HTML i Sass', en: 'a landing page in HTML and Sass' }, href: 'https://github.com/DamianoCode/landing-page' },
];

/** Wcześniejsze repozytoria, od najnowszych. */
export const getArchive = (locale: Locale): ArchiveItem[] => archive.map((a) => ({ ...a, what: a.what[locale] }));
