import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const entry = z.object({ period: text, title: text, place: text, description: text.optional() });
const cv = z.object({
  document: z.object({ path: z.string().regex(/^\/cv\/[a-z0-9-]+\.pdf$/), updated: z.iso.date() }),
  summary: text,
  experience: z.array(entry.extend({ description: text })).min(1),
  skills: z.array(z.object({ title: text, description: text })).min(1),
  education: z.array(entry).min(1),
  languages: text,
});
export const cvSchema = z.object({ pl: cv, en: cv });

/** Basic format validation; document safety still requires a review before publication. */
export function validatePdf(bytes, locale) {
  if (bytes.subarray(0, 5).toString() !== '%PDF-' || !bytes.subarray(-1024).includes('%%EOF')) {
    throw new Error(`CV (${locale}): invalid PDF file.`);
  }
  if (bytes.length > 5 * 1024 * 1024) throw new Error(`CV (${locale}): PDF exceeds 5 MB.`);
  return bytes.length;
}
