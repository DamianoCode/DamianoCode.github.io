import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cvSchema, validatePdf } from '../src/lib/cv-validation.mjs';

const content = JSON.parse(readFileSync(new URL('../src/data/cv.json', import.meta.url), 'utf8'));

test('both published languages have valid data and actual PDFs', () => {
  const data = cvSchema.parse(content);
  for (const locale of ['pl', 'en']) {
    const file = new URL(`../public${data[locale].document.path}`, import.meta.url);
    assert.ok(validatePdf(readFileSync(file), locale) > 0);
  }
});

test('reject external, executable and traversal document paths', () => {
  for (const path of ['https://example.com/cv.pdf', '//example.com/cv.pdf', '/cv/../secret.pdf', '/cv/%2e%2e/secret.pdf', '/cv/test.html', '/cv/a.pdf?x=1']) {
    const data = structuredClone(content);
    data.pl.document.path = path;
    assert.equal(cvSchema.safeParse(data).success, false, path);
  }
});

test('reject invalid calendar dates, incomplete translations and blank content', () => {
  const invalidDate = structuredClone(content);
  invalidDate.en.document.updated = '2026-02-31';
  assert.equal(cvSchema.safeParse(invalidDate).success, false);
  assert.equal(cvSchema.safeParse({ pl: content.pl }).success, false);
  const blank = structuredClone(content);
  blank.en.summary = '  ';
  assert.equal(cvSchema.safeParse(blank).success, false);
});

test('reject HTML responses, truncated and oversized PDF files', () => {
  assert.throws(() => validatePdf(Buffer.from('<html>Sign in</html>'), 'pl'), /invalid PDF/);
  assert.throws(() => validatePdf(Buffer.from('%PDF-1.7\ntruncated'), 'pl'), /invalid PDF/);
  const oversized = Buffer.alloc(5 * 1024 * 1024 + 1);
  oversized.write('%PDF-1.7');
  oversized.write('%%EOF', oversized.length - 5);
  assert.throws(() => validatePdf(oversized, 'pl'), /exceeds/);
});
