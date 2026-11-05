import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import content from './cv.json';
import type { Locale } from '../i18n';
import { cvSchema, validatePdf } from '../lib/cv-validation.mjs';

const validated = cvSchema.parse(content);

// Build-time only: no Drive credentials or requests in the published site.
export const cvPath = (locale: Locale) => locale === 'pl' ? '/cv' : '/en/cv';

export function getCv(locale: Locale) {
  const cv = validated[locale];
  const document = cv.document;
  const bytes = readFileSync(resolve('public', document.path.slice(1)));
  return { ...cv, document: { ...document, bytes: validatePdf(bytes, locale) } };
}

export const cvReady = (['pl', 'en'] as const).every((locale) => getCv(locale).summary.length > 0);
