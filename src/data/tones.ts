import type { ProjectId } from './projects';

/**
 * Akcent każdego produktu, wzięty z jego zrzutów. Wraca poza kartą tylko jako znacznik: kolumna w tabeli
 * umiejętności i krawędź arkusza w stosie nad Kontaktem.
 */
export const projectTone: Record<ProjectId, string> = {
  placemates: '#e8834a',
  korepetytor: '#d4533d',
  widget: '#e3a21a',
  claudius: 'var(--cobalt)',
  ecommerce: '#7d8aa5',
};
