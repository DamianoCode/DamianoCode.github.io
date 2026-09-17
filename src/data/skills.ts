import { projects, type ProjectId } from './projects';

/** Kolumny tabeli umiejętności: projekty i zbiorcza kolumna wcześniejszych repozytoriów. */
export type ColumnId = ProjectId | 'wczesniej';

export const columns: { id: ColumnId; short: string }[] = [
  ...projects.map(({ id, short }) => ({ id, short })),
  { id: 'wczesniej', short: 'Wcześniej' },
];

export interface Skill {
  name: string;
  note: string;
  usedIn: ColumnId[];
}

export const skills: Skill[] = [
  { name: 'TypeScript', note: 'domyślny język w nowych projektach', usedIn: ['placemates', 'widget', 'ecommerce'] },
  { name: 'React i Next.js', note: 'od Pages Routera po App Router i Server Actions', usedIn: ['placemates', 'ecommerce', 'wczesniej'] },
  { name: 'Tailwind, Sass, CSS', note: 'interfejsy od zera i na gotowych komponentach', usedIn: ['placemates', 'ecommerce', 'wczesniej'] },
  { name: 'PostgreSQL', note: 'z PostGIS, gdy dane leżą na mapie', usedIn: ['placemates', 'ecommerce'] },
  { name: 'Drizzle i Prisma', note: 'schematy, relacje, migracje', usedIn: ['placemates', 'ecommerce'] },
  { name: 'Formularze i walidacja', note: 'Zod, React Hook Form', usedIn: ['placemates', 'ecommerce'] },
  { name: 'Mapy i geodane', note: 'MapLibre, trasy, wyszukiwanie miejsc', usedIn: ['placemates'] },
  { name: 'C# i .NET', note: 'aplikacja desktopowa na Windows z autoaktualizacją', usedIn: ['widget'] },
  { name: 'Claude Code', note: 'codzienne narzędzie pracy, wtyczki, hooki, statusline', usedIn: ['claudius', 'widget'] },
  { name: 'Agenci AI', note: 'orkestracja, podagenci, niezależny przegląd zmian', usedIn: ['claudius'] },
  { name: 'Modele językowe', note: 'dobór modelu do zadania, kontekst, prompty i skille', usedIn: ['claudius', 'widget'] },
  { name: 'Vue', note: 'pierwsze aplikacje z API', usedIn: ['wczesniej'] },
  { name: 'PHP', note: 'CMS z sesjami i logowaniem', usedIn: ['wczesniej'] },
];

/** Narzędzia z profilu GitHub, których nie da się przypiąć do konkretnego repozytorium. */
export const alsoUsed = ['Git', 'Figma', 'MSSQL', 'Node.js'];
