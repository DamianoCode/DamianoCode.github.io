// Dane osobowe i teksty SEO. Źródło: publiczny profil github.com/DamianoCode.

export const profile = {
  name: 'Damian',
  surname: 'Ułaś',
  fullName: 'Damian Ułaś',
  /** Nick z GitHuba, pokazywany przy znaku w nagłówku. */
  handle: 'DamianoCode',
  role: 'Fullstack developer',
  city: 'Zamość',
  email: 'damianulas@gmail.com',
  github: 'https://github.com/DamianoCode',
  linkedin: 'https://www.linkedin.com/in/damian-ulas/',
  /** Formy współpracy, pokazywane w hero i w Kontakcie. */
  availability: 'projekty, B2B albo etat',
  remote: 'zdalnie',
};

/** Tematy maili, wspólne dla wszystkich przycisków na stronie: odbiorca od razu wie, w jakiej sprawie piszesz. */
export const subjects = {
  job: 'Praca: fullstack developer',
  project: 'Projekt albo wdrożenie agentów AI',
  cv: 'Prośba o CV',
};

export const mailto = (subject?: string) =>
  `mailto:${profile.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const seo = {
  title: 'Damian Ułaś, fullstack developer: Next.js i agenci AI',
  description:
    'Damian Ułaś, fullstack developer z Zamościa. Buduję aplikacje w Next.js, TypeScript i PostgreSQL oraz narzędzia do pracy z agentami AI i Claude Code.',
  knowsAbout: [
    'Fullstack development',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'C#',
    '.NET',
    'Claude Code',
    'AI agents',
    'Large language models',
  ],
};

/**
 * Sekcja „Po godzinach”. `lines` to stały podział hasła na linie: najechanie zmienia szerokość liter,
 * ale nigdy liczby linii, więc kafel nie zmienia wysokości. `fit` to szerokość najdłuższej linii w em
 * przy szerokości 150% i grubości 700 (stan po najechaniu), zmierzona w przeglądarce. `id` wybiera
 * kolory kafla i rysunek w jego rogu.
 */
export const interests = [
  {
    id: 'rower',
    word: 'Rower',
    lines: ['Rower'],
    fit: 5.43,
    text: 'Po dniu przy komputerze wsiadam na rower. Na trasie najlepiej układają mi się pomysły, które przy biurku stały w miejscu.',
  },
  {
    id: 'gry',
    word: 'Gry',
    lines: ['Gry'],
    fit: 3.03,
    text: 'Gram od lat i patrzę na gry trochę jak programista: jak zbudowano mechanikę i dlaczego interfejs po prostu działa.',
  },
  {
    id: 'gielda',
    word: 'Giełda i krypto',
    lines: ['Giełda i', 'krypto'],
    fit: 5.85,
    text: 'Śledzę giełdę i rynek kryptowalut. Uczą cierpliwości i tego, żeby decyzje opierać na danych, a nie na emocjach.',
  },
  {
    id: 'anime',
    word: 'Anime, manga, komiksy',
    lines: ['Anime,', 'manga,', 'komiksy'],
    fit: 6.74,
    text: 'Lubię historie opowiadane obrazem. Kadrowanie w mangach i komiksach to przy okazji niezła lekcja projektowania.',
  },
  {
    id: 'f1',
    word: 'Ferrari',
    lines: ['Ferrari'],
    fit: 6.31,
    text: 'W F1 kibicuję Ferrari, więc „we are checking” słyszę w każdy weekend wyścigowy. U siebie sprawdzam wcześniej, zanim decyzja trafi na tor.',
  },
] as const;

export type InterestId = (typeof interests)[number]['id'];
