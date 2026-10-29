// Dane osobowe i teksty SEO. Źródło: publiczny profil github.com/DamianoCode.

import type { Locale, Localized } from '../i18n';

const base = {
  name: 'Damian',
  surname: 'Ułaś',
  fullName: 'Damian Ułaś',
  /** Podpis marki przy znaku w nagłówku: nick małymi literami, jak klawisze d i c w znaku. */
  wordmark: 'damianocode',
  city: 'Zamość',
  email: 'damianulas@gmail.com',
  github: 'https://github.com/DamianoCode',
  linkedin: 'https://www.linkedin.com/in/damian-ulas/',
};

const text: Localized<{ role: string; availability: string; remote: string }> = {
  pl: {
    role: 'Fullstack developer',
    /** Formy współpracy, pokazywane w hero i w Kontakcie. */
    availability: 'projekty, B2B albo etat',
    remote: 'zdalnie',
  },
  en: {
    role: 'Fullstack developer',
    availability: 'projects, B2B or full-time',
    remote: 'remote',
  },
};

export const getProfile = (locale: Locale) => ({ ...base, ...text[locale] });

/** Tematy maili, wspólne dla wszystkich przycisków na stronie: odbiorca od razu wie, w jakiej sprawie piszesz. */
const subjects: Localized<{ job: string; project: string; cv: string; tutorDemo: string }> = {
  pl: {
    job: 'Praca: fullstack developer',
    project: 'Projekt albo wdrożenie agentów AI',
    cv: 'Prośba o CV',
    tutorDemo: 'Asystent korepetytora: pokaz',
  },
  en: {
    job: 'Job: fullstack developer',
    project: 'Project or AI agent rollout',
    cv: 'CV request',
    tutorDemo: 'Tutor assistant: demo',
  },
};

export const getSubjects = (locale: Locale) => subjects[locale];

export const mailto = (subject?: string) =>
  `mailto:${base.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

const seoText: Localized<{ title: string; description: string }> = {
  pl: {
    title: 'Damian Ułaś, fullstack developer: Next.js i agenci AI',
    description:
      'Damian Ułaś, fullstack developer z Zamościa. Buduję aplikacje w Next.js, TypeScript i PostgreSQL oraz narzędzia do pracy z agentami AI i Claude Code.',
  },
  en: {
    title: 'Damian Ułaś, fullstack developer: Next.js and AI agents',
    description:
      'Damian Ułaś, a fullstack developer from Zamość, Poland. I build apps in Next.js, TypeScript and PostgreSQL, and tools for working with AI agents and Claude Code.',
  },
};

export const getSeo = (locale: Locale) => ({
  ...seoText[locale],
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
});

export type InterestId = 'rower' | 'gry' | 'gielda' | 'anime' | 'f1';

/**
 * Sekcja „Po godzinach”. `lines` to stały podział hasła na linie: najechanie zmienia szerokość liter,
 * ale nigdy liczby linii, więc kafel nie zmienia wysokości. `fit` to szerokość najdłuższej linii w em
 * przy szerokości 150% i grubości 700 (stan po najechaniu), zmierzona w przeglądarce; każdy język ma własną.
 * `id` wybiera kolory kafla i rysunek w jego rogu.
 */
const interests: { id: InterestId; text: Localized<{ word: string; lines: string[]; fit: number; text: string }> }[] = [
  {
    id: 'rower',
    text: {
      pl: {
        word: 'Rower',
        lines: ['Rower'],
        fit: 5.43,
        text: 'Po dniu przy komputerze wsiadam na rower. Na trasie najlepiej układają mi się pomysły, które przy biurku stały w miejscu.',
      },
      en: {
        word: 'Cycling',
        lines: ['Cycling'],
        fit: 5.84,
        text: 'After a day at the computer I get on the bike. Ideas that were stuck at the desk fall into place out on the road.',
      },
    },
  },
  {
    id: 'gry',
    text: {
      pl: {
        word: 'Gry',
        lines: ['Gry'],
        fit: 3.03,
        text: 'Gram od lat i patrzę na gry trochę jak programista: jak zbudowano mechanikę i dlaczego interfejs po prostu działa.',
      },
      en: {
        word: 'Games',
        lines: ['Games'],
        fit: 5.66,
        text: 'I have played for years and look at games a bit like a programmer: how the mechanics are built and why the interface just works.',
      },
    },
  },
  {
    id: 'gielda',
    text: {
      pl: {
        word: 'Giełda i krypto',
        lines: ['Giełda i', 'krypto'],
        fit: 5.85,
        text: 'Śledzę giełdę i rynek kryptowalut. Uczą cierpliwości i tego, żeby decyzje opierać na danych, a nie na emocjach.',
      },
      en: {
        word: 'Stocks & crypto',
        lines: ['Stocks &', 'crypto'],
        fit: 7.47,
        text: 'I follow the stock market and crypto. They teach patience and basing decisions on data, not emotions.',
      },
    },
  },
  {
    id: 'anime',
    text: {
      pl: {
        word: 'Anime, manga, komiksy',
        lines: ['Anime,', 'manga,', 'komiksy'],
        fit: 6.74,
        text: 'Lubię historie opowiadane obrazem. Kadrowanie w mangach i komiksach to przy okazji niezła lekcja projektowania.',
      },
      en: {
        word: 'Anime, manga, comics',
        lines: ['Anime,', 'manga,', 'comics'],
        fit: 6.03,
        text: 'I like stories told in pictures. Panel layout in manga and comics is also a decent lesson in design.',
      },
    },
  },
  {
    id: 'f1',
    text: {
      pl: {
        word: 'Ferrari',
        lines: ['Ferrari'],
        fit: 6.31,
        text: 'W F1 kibicuję Ferrari, więc „we are checking” słyszę w każdy weekend wyścigowy. U siebie sprawdzam wcześniej, zanim decyzja trafi na tor.',
      },
      en: {
        word: 'Ferrari',
        lines: ['Ferrari'],
        fit: 6.31,
        text: 'In F1 I support Ferrari, so I hear “we are checking” every race weekend. In my own work I check earlier, before a decision reaches the track.',
      },
    },
  },
];

export const getInterests = (locale: Locale) => interests.map(({ id, text }) => ({ id, ...text[locale] }));
