// Dane do strony /cv. Dopóki listy są puste, strona pokazuje komunikat „w przygotowaniu”
// i nie jest indeksowana przez wyszukiwarki.

export interface CvEntry {
  /** Np. „2023 – obecnie”. */
  period: string;
  title: string;
  place: string;
  description?: string;
}

export const cv = {
  /** Ścieżka do pliku w public/, np. '/cv-damian-ulas.pdf'. */
  pdf: null as string | null,
  experience: [] as CvEntry[],
  education: [] as CvEntry[],
};

export const cvReady = cv.experience.length > 0 || cv.pdf !== null;
