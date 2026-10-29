// Renderuje public/og.jpg i public/og-en.jpg z pliku og.html w tym folderze. Favicony i apple-touch-icon pochodzą z gotowego pakietu znaku.
// Wymaga Chrome. Ścieżkę można nadpisać zmienną CHROME_PATH.
// Nocna scena to pełny rysunek, więc PNG ważyłby ponad megabajt: zrzut idzie przez sharp do JPEG.
import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import sharp from 'sharp';

const chrome =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const here = fileURLToPath(new URL('.', import.meta.url));
const pub = resolve(here, '../public');

const shots = [
  { src: 'og.html', out: 'og.jpg', size: '1200,630' },
  { src: 'og.html', query: '?lang=en', out: 'og-en.jpg', size: '1200,630' },
];

for (const shot of shots) {
  const raw = resolve(pub, `${shot.out}.png`);
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--virtual-time-budget=3000',
    `--window-size=${shot.size}`,
    `--screenshot=${raw}`,
    pathToFileURL(resolve(here, shot.src)).href + (shot.query ?? ''),
  ]);
  await sharp(raw).jpeg({ quality: 86, mozjpeg: true }).toFile(resolve(pub, shot.out));
  rmSync(raw);
  console.log(`public/${shot.out}`);
}
