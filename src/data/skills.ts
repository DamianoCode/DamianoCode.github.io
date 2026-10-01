import { projects, type ProjectId } from './projects';

/** Kolumny tabeli umiejętności: projekty i zbiorcza kolumna wcześniejszych repozytoriów. */
export type ColumnId = ProjectId | 'wczesniej';

export const columns: { id: ColumnId; short: string }[] = [
  ...projects.map(({ id, short }) => ({ id, short })),
  { id: 'wczesniej', short: 'Wcześniej' },
];

export type SkillGroup = 'Interfejs' | 'Dane i backend' | 'Agenci AI' | 'Pierwsze projekty';

export interface Skill {
  group: SkillGroup;
  name: string;
  note: string;
  usedIn: ColumnId[];
}

export const skills: Skill[] = [
  { group: 'Interfejs', name: 'TypeScript', note: 'domyślny język w nowych projektach', usedIn: ['placemates', 'korepetytor', 'widget', 'ecommerce'] },
  { group: 'Interfejs', name: 'React i Next.js', note: 'od Pages Routera po App Router i Server Actions', usedIn: ['placemates', 'korepetytor', 'ecommerce', 'wczesniej'] },
  { group: 'Interfejs', name: 'Tailwind, Sass, CSS', note: 'interfejsy od zera i na gotowych komponentach', usedIn: ['placemates', 'korepetytor', 'ecommerce', 'wczesniej'] },
  { group: 'Dane i backend', name: 'PostgreSQL', note: 'z PostGIS, gdy dane leżą na mapie', usedIn: ['placemates', 'korepetytor', 'ecommerce'] },
  { group: 'Dane i backend', name: 'Drizzle i Prisma', note: 'schematy, relacje, migracje', usedIn: ['placemates', 'korepetytor', 'ecommerce'] },
  { group: 'Interfejs', name: 'Formularze i walidacja', note: 'Zod, React Hook Form', usedIn: ['placemates', 'korepetytor', 'ecommerce'] },
  { group: 'Interfejs', name: 'Mapy i geodane', note: 'MapLibre, trasy, wyszukiwanie miejsc', usedIn: ['placemates'] },
  { group: 'Dane i backend', name: 'C# i .NET', note: 'aplikacja desktopowa na Windows z autoaktualizacją', usedIn: ['widget'] },
  { group: 'Agenci AI', name: 'Claude Code', note: 'codzienne narzędzie pracy, wtyczki, hooki, statusline', usedIn: ['claudius', 'widget'] },
  { group: 'Agenci AI', name: 'Agenci AI', note: 'orkestracja, podagenci, niezależny przegląd zmian', usedIn: ['claudius'] },
  { group: 'Agenci AI', name: 'Modele językowe', note: 'dobór modelu do zadania, kontekst, prompty i skille', usedIn: ['claudius', 'widget'] },
  { group: 'Pierwsze projekty', name: 'Vue', note: 'pierwsze aplikacje z API', usedIn: ['wczesniej'] },
  { group: 'Pierwsze projekty', name: 'PHP', note: 'CMS z sesjami i logowaniem', usedIn: ['wczesniej'] },
];

/** Kolejność grup w tabeli. */
export const skillGroups: SkillGroup[] = ['Interfejs', 'Dane i backend', 'Agenci AI', 'Pierwsze projekty'];

/** Narzędzia z profilu GitHub, których nie da się przypiąć do konkretnego repozytorium. */
export const alsoUsed = ['Git', 'Figma', 'MSSQL', 'Node.js'];
