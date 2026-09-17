// Renderuje public/og.png i public/apple-touch-icon.png z plików HTML w tym folderze.
// Wymaga Chrome. Ścieżkę można nadpisać zmienną CHROME_PATH.
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const chrome =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const here = fileURLToPath(new URL('.', import.meta.url));
const pub = resolve(here, '../public');

const shots = [
  { src: 'og.html', out: 'og.png', size: '1200,630' },
  { src: 'icon.html', out: 'apple-touch-icon.png', size: '180,180' },
];

for (const shot of shots) {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--virtual-time-budget=3000',
    `--window-size=${shot.size}`,
    `--screenshot=${resolve(pub, shot.out)}`,
    pathToFileURL(resolve(here, shot.src)).href,
  ]);
  console.log(`public/${shot.out}`);
}
