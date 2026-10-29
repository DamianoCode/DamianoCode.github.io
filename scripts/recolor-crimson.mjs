// Przesuwa czerwienie w grafice do karminu strony (#BE2337), zostawiając jasność, fakturę i cieniowanie.
// Ilustracje i awatar powstały w cieplejszej, czystszej czerwieni (odcień ok. 26° w OKLCH) niż karmin (20.8°);
// obok karminowego arkusza Kontakt różnica była widoczna gołym okiem.
//
// Użycie: node scripts/recolor-crimson.mjs <wejście> <wyjście.webp> [szerokość] [jakość]
// Działa na kopiach do strony; oryginały (i awatar na profilach) zostają bez zmian.
import sharp from 'sharp';

const [input, output, width, quality = '88'] = process.argv.slice(2);
if (!input || !output) {
  console.error('Użycie: node scripts/recolor-crimson.mjs <wejście> <wyjście.webp> [szerokość] [jakość]');
  process.exit(1);
}

// Karmin strony w OKLCH.
const TARGET = { L: 0.522, C: 0.188, h: 20.8 };

const toLinear = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function rgbToOklch(r, g, b) {
  const [lr, lg, lb] = [r, g, b].map((v) => toLinear(v / 255));
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

function oklchToRgb(L, C, h) {
  const A = C * Math.cos((h * Math.PI) / 180);
  const B = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

// Zmniejsza nasycenie, aż kolor zmieści się w sRGB (bez przesuwania odcienia).
function inGamut(L, C, h) {
  for (let c = C; c >= 0; c -= 0.004) {
    const rgb = oklchToRgb(L, c, h);
    if (rgb.every((v) => v >= -0.0005 && v <= 1.0005)) return rgb.map((v) => Math.round(toGamma(Math.min(1, Math.max(0, v))) * 255));
  }
  return oklchToRgb(L, 0, h).map((v) => Math.round(toGamma(Math.min(1, Math.max(0, v))) * 255));
}

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// Waga czerwieni: nasycone piksele w okolicy czerwieni dostają pełną zmianę, krawędzie z czernią i papierem
// przechodzą płynnie, żeby nie zostały obwódki.
const hueDistance = (h) => Math.min(Math.abs(h - 24), 360 - Math.abs(h - 24));
const redWeight = ({ C, h }) => smoothstep(0.04, 0.11, C) * (1 - smoothstep(16, 28, hueDistance(h)));

// Przemalowanie na pełnej rozdzielczości, zmniejszenie dopiero potem: wszystkie warianty z srcset dostają to samo
// przesunięcie (w zmniejszonym obrazie krawędzie mieszają się z czernią i średnia czerwieni wychodzi inna).
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// Średnia jasność i nasycenie czerwieni w tym obrazie: przesunięcie zachowuje różnice między światłem a cieniem.
let sumL = 0;
let sumC = 0;
let count = 0;
const pixels = info.width * info.height;
const lch = new Array(pixels);
for (let p = 0; p < pixels; p++) {
  const i = p * 4;
  const c = rgbToOklch(data[i], data[i + 1], data[i + 2]);
  lch[p] = c;
  if (data[i + 3] > 200 && redWeight(c) > 0.95) {
    sumL += c.L;
    sumC += c.C;
    count++;
  }
}
if (!count) {
  console.error(`${input}: brak czerwieni do przesunięcia`);
  process.exit(1);
}
const meanL = sumL / count;
const meanC = sumC / count;
const shiftL = TARGET.L - meanL;
const scaleC = TARGET.C / meanC;

for (let p = 0; p < pixels; p++) {
  const c = lch[p];
  const w = redWeight(c);
  if (w === 0) continue;
  const i = p * 4;
  const [r, g, b] = inGamut(Math.min(0.98, Math.max(0.02, c.L + shiftL)), c.C * scaleC, TARGET.h);
  data[i] = Math.round(data[i] + (r - data[i]) * w);
  data[i + 1] = Math.round(data[i + 1] + (g - data[i + 1]) * w);
  data[i + 2] = Math.round(data[i + 2] + (b - data[i + 2]) * w);
}

let out = sharp(data, { raw: info });
if (width) out = out.resize({ width: Number(width) });
await out
  .webp({ quality: Number(quality), alphaQuality: 100, effort: 6 })
  .toFile(output);
console.log(
  `${output}: ${count} px czerwieni, jasność ${meanL.toFixed(3)} → ${TARGET.L}, nasycenie ${meanC.toFixed(3)} → ${TARGET.C}, odcień → ${TARGET.h}°`,
);
