/**
 * Dwa języki strony. Polski leży pod `/`, angielski pod `/en`. Astro (konfiguracja `i18n` w astro.config.mjs)
 * ustawia `Astro.currentLocale` z adresu, więc każdy komponent sam wie, w jakim języku się renderuje.
 * Treści w danych i komponentach mają postać `{ pl, en }`; wersja angielska nie może z czasem zostać w tyle,
 * bo brak tłumaczenia to błąd typu.
 */
export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

/** Wartość w każdym z języków. */
export type Localized<T = string> = Record<Locale, T>;

/** Język strony, na której renderuje się komponent. */
export const localeOf = (astro: { currentLocale?: string | undefined }): Locale =>
  astro.currentLocale === 'en' ? 'en' : 'pl';

/** Strona główna w danym języku; kotwice sekcji dopisuje się do niej (`${home(locale)}#projekty`). */
export const home = (locale: Locale) => (locale === 'pl' ? '/' : '/en');

/** Atrybut `lang`, `og:locale` i format dat dla języka. */
export const languageTag: Localized = { pl: 'pl-PL', en: 'en-US' };
export const ogLocale: Localized = { pl: 'pl_PL', en: 'en_US' };

/** Wybiera wersję językową z obiektu `{ pl, en }`. */
export const pick = <T>(value: Localized<T>, locale: Locale): T => value[locale];
