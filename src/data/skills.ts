import type { Locale, Localized } from '../i18n';
import { getProjects, type ProjectId } from './projects';

/** Kolumny tabeli umiejętności: projekty i zbiorcza kolumna wcześniejszych repozytoriów. */
export type ColumnId = ProjectId | 'wczesniej';

export const getColumns = (locale: Locale): { id: ColumnId; short: string }[] => [
  ...getProjects(locale).map(({ id, short }) => ({ id, short })),
  { id: 'wczesniej', short: locale === 'pl' ? 'Wcześniej' : 'Earlier' },
];

export type SkillGroup = 'ui' | 'data' | 'ai' | 'early';

/** Kolejność grup w tabeli i ich nazwy. */
const groupNames: Localized<Record<SkillGroup, string>> = {
  pl: { ui: 'Interfejs', data: 'Dane i backend', ai: 'Agenci AI', early: 'Pierwsze projekty' },
  en: { ui: 'Interface', data: 'Data and backend', ai: 'AI agents', early: 'First projects' },
};
export const skillGroups: SkillGroup[] = ['ui', 'data', 'ai', 'early'];
export const getGroupName = (group: SkillGroup, locale: Locale) => groupNames[locale][group];

export interface Skill {
  group: SkillGroup;
  name: string;
  note: string;
  usedIn: ColumnId[];
}

const skills: (Omit<Skill, 'name' | 'note'> & { name: Localized; note: Localized })[] = [
  {
    group: 'ui',
    name: { pl: 'TypeScript', en: 'TypeScript' },
    note: { pl: 'domyślny język w nowych projektach, walidacja w Zod', en: 'the default language in new projects, validation with Zod' },
    usedIn: ['placemates', 'korepetytor', 'widget', 'ecommerce'],
  },
  {
    group: 'ui',
    name: { pl: 'React i Next.js', en: 'React and Next.js' },
    note: { pl: 'od Pages Routera po App Router i Server Actions', en: 'from the Pages Router to the App Router and Server Actions' },
    usedIn: ['placemates', 'korepetytor', 'ecommerce', 'wczesniej'],
  },
  {
    group: 'ui',
    name: { pl: 'Tailwind, Sass, CSS', en: 'Tailwind, Sass, CSS' },
    note: { pl: 'interfejsy od zera i na gotowych komponentach', en: 'interfaces from scratch and on ready-made components' },
    usedIn: ['placemates', 'korepetytor', 'ecommerce', 'wczesniej'],
  },
  {
    group: 'ui',
    name: { pl: 'Mapy i geodane', en: 'Maps and geodata' },
    note: { pl: 'MapLibre, trasy, wyszukiwanie miejsc', en: 'MapLibre, routes, place search' },
    usedIn: ['placemates'],
  },
  {
    group: 'data',
    name: { pl: 'PostgreSQL', en: 'PostgreSQL' },
    note: { pl: 'z PostGIS, gdy dane leżą na mapie', en: 'with PostGIS when the data lives on a map' },
    usedIn: ['placemates', 'korepetytor', 'ecommerce'],
  },
  {
    group: 'data',
    name: { pl: 'Drizzle i Prisma', en: 'Drizzle and Prisma' },
    note: { pl: 'schematy, relacje, migracje', en: 'schemas, relations, migrations' },
    usedIn: ['placemates', 'korepetytor', 'ecommerce'],
  },
  {
    group: 'data',
    name: { pl: 'Node.js', en: 'Node.js' },
    note: { pl: 'skrypty i hooki wtyczki do Claude Code', en: 'scripts and hooks for a Claude Code plugin' },
    usedIn: ['claudius'],
  },
  {
    group: 'data',
    name: { pl: 'C# i .NET', en: 'C# and .NET' },
    note: { pl: 'aplikacja desktopowa na Windows z autoaktualizacją', en: 'a Windows desktop app that updates itself' },
    usedIn: ['widget'],
  },
  {
    group: 'ai',
    name: { pl: 'Claude Code', en: 'Claude Code' },
    note: { pl: 'codzienne narzędzie pracy, wtyczki, hooki, statusline', en: 'an everyday work tool, plugins, hooks, statusline' },
    usedIn: ['claudius', 'widget'],
  },
  {
    group: 'ai',
    name: { pl: 'Agenci i modele językowe', en: 'Agents and language models' },
    note: {
      pl: 'podział pracy między agentów, niezależny przegląd, dobór modelu do zadania',
      en: 'splitting work between agents, independent review, picking the model for the task',
    },
    usedIn: ['claudius', 'widget'],
  },
  {
    group: 'early',
    name: { pl: 'Vue i PHP', en: 'Vue and PHP' },
    note: { pl: 'pierwsze aplikacje z API, CMS z logowaniem', en: 'first apps with an API, a CMS with sign-in' },
    usedIn: ['wczesniej'],
  },
];

export const getSkills = (locale: Locale): Skill[] =>
  skills.map((s) => ({ ...s, name: s.name[locale], note: s.note[locale] }));

/** Narzędzia z profilu GitHub, których nie da się przypiąć do konkretnego repozytorium. */
export const alsoUsed = ['Git', 'Figma', 'MSSQL'];
