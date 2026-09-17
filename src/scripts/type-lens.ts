/**
 * Soczewka typograficzna w hero: litery blisko kursora (albo miejsca przewinięcia na ekranach dotykowych)
 * robią się szerokie i grube, dalsze wąskie i lekkie.
 *
 * Wydajność: pętla animacji niczego nie mierzy. Szerokości liter są mierzone raz, dla siatki wartości osi,
 * a w każdej klatce interpolowane. Rozmiar napisu zmienia `transform: scale`, więc strona nie przelicza
 * układu od nowa, a litera zmienia kształt tylko wtedy, gdy wartość osi przeskoczy o cały krok.
 */

const W = { min: 50, max: 150, rest: 100, step: 2.5 };
const G = { min: 280, max: 860, rest: 640, step: 20 };
const W_SAMPLES = [50, 75, 100, 125, 150];
const G_SAMPLES = [280, 570, 860];
const SPREAD = 0.17;
const SWEEP_MS = 1500;
const EASE = 0.16;
/** Wysokość linii napisu jako ułamek rozmiaru kroju (zgodna z `line-height` w CSS). */
const LINE_HEIGHT = 0.8;

type Char = {
  el: HTMLElement;
  /** Bieżąca (płynna) wartość osi. */
  w: number;
  g: number;
  /** Wartość zaokrócona do kroku, która jest aktualnie w stylu. */
  shownW: number;
  shownG: number;
  /** Szerokość litery przy 100px dla każdej pary (W_SAMPLES × G_SAMPLES). */
  advances: number[];
};

type Line = {
  box: HTMLElement;
  word: HTMLElement;
  chars: Char[];
  alignEnd: boolean;
  fontSize: number;
  boxLeft: number;
  boxWidth: number;
  boxHeight: number;
  scale: number;
  /** Położenie napisu na ekranie z poprzedniej klatki, do mapowania kursora na litery. */
  visualLeft: number;
  visualWidth: number;
};

const variation = (w: number, g: number) => `'wdth' ${w}, 'wght' ${g}`;
const quantize = (value: number, step: number) => Math.round(value / step) * step;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Interpolacja dwuliniowa szerokości litery z siatki pomiarów. */
function advanceAt(c: Char, w: number, g: number) {
  const wi = Math.min(W_SAMPLES.length - 2, Math.floor((w - W_SAMPLES[0]) / 25));
  const gi = Math.min(G_SAMPLES.length - 2, Math.floor((g - G_SAMPLES[0]) / 290));
  const tw = clamp01((w - W_SAMPLES[wi]) / 25);
  const tg = clamp01((g - G_SAMPLES[gi]) / 290);
  const at = (i: number, j: number) => c.advances[i * G_SAMPLES.length + j];
  const low = at(wi, gi) + (at(wi + 1, gi) - at(wi, gi)) * tw;
  const high = at(wi, gi + 1) + (at(wi + 1, gi + 1) - at(wi, gi + 1)) * tw;
  return low + (high - low) * tg;
}

/** Jeden odczyt układu dla wszystkich liter i wartości osi. */
function measureAdvances(lines: Line[]) {
  const probe = lines[0].word.cloneNode(false) as HTMLElement;
  probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;font-size:100px;transform:none';
  const cells: { c: Char; el: HTMLElement }[] = [];

  for (const line of lines) {
    for (const c of line.chars) {
      for (const w of W_SAMPLES) {
        for (const g of G_SAMPLES) {
          const el = c.el.cloneNode(true) as HTMLElement;
          el.style.fontVariationSettings = variation(w, g);
          probe.append(el);
          cells.push({ c, el });
        }
      }
    }
  }

  document.body.append(probe);
  for (const { c, el } of cells) c.advances.push(el.getBoundingClientRect().width);
  probe.remove();
}

export function initTypeLens(root: HTMLElement, section: HTMLElement) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  const lines: Line[] = [...root.querySelectorAll<HTMLElement>('[data-line]')].map((box) => ({
    box,
    word: box.firstElementChild as HTMLElement,
    chars: [...box.querySelectorAll<HTMLElement>('.ch')].map((el) => ({
      el,
      w: W.rest,
      g: G.rest,
      shownW: W.rest,
      shownG: G.rest,
      advances: [],
    })),
    alignEnd: box.classList.contains('line-end'),
    fontSize: 0,
    boxLeft: 0,
    boxWidth: 0,
    boxHeight: 0,
    scale: 1,
    visualLeft: 0,
    visualWidth: 0,
  }));

  let rootTop = 0;
  let rootHeight = 1;
  let sectionTop = 0;
  let sectionHeight = 1;
  let visible = true;

  // Pozycja soczewki: x w pikselach okna, y jako 0–1 wysokości napisu. null = spoczynek.
  let lensX: number | null = null;
  let lensY = 0.5;
  let sweepStart = 0;
  let frame = 0;

  const wordWidth = (line: Line) =>
    line.chars.reduce((sum, c) => sum + advanceAt(c, c.shownW, c.shownG), 0) * (line.fontSize / 100);

  /** Skaluje napis tak, by wypełnił szerokość, ale nie przekroczył wysokości linii. Bez odczytu układu. */
  const place = (line: Line) => {
    const width = wordWidth(line);
    const scale = Math.min(line.boxWidth / width, line.boxHeight / (LINE_HEIGHT * line.fontSize));
    if (Math.abs(scale - line.scale) > 0.0005) {
      line.scale = scale;
      line.word.style.transform = `scale(${scale.toFixed(4)})`;
    }
    line.visualWidth = width * scale;
    line.visualLeft = line.alignEnd ? line.boxLeft + line.boxWidth - line.visualWidth : line.boxLeft;
  };

  const show = (c: Char) => {
    const w = quantize(c.w, W.step);
    const g = quantize(c.g, G.step);
    if (w !== c.shownW || g !== c.shownG) {
      c.shownW = w;
      c.shownG = g;
      c.el.style.fontVariationSettings = variation(w, g);
    }
  };

  /** Odczyt geometrii tylko przy starcie i zmianie rozmiaru. */
  const measureGeometry = () => {
    const rootRect = root.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    rootTop = rootRect.top + scrollY;
    rootHeight = Math.max(rootRect.height, 1);
    sectionTop = sectionRect.top + scrollY;
    sectionHeight = Math.max(sectionRect.height, 1);

    for (const line of lines) {
      const rect = line.box.getBoundingClientRect();
      line.boxLeft = rect.left;
      line.boxWidth = rect.width;
      line.boxHeight = rect.height;
      // Rozmiar bazowy dopasowany do stanu spoczynku; ruch soczewki zmienia już tylko skalę.
      const restWidth = line.chars.reduce((sum, c) => sum + advanceAt(c, W.rest, G.rest), 0);
      line.fontSize = Math.min((rect.width / restWidth) * 100, rect.height / LINE_HEIGHT);
      line.word.style.fontSize = `${line.fontSize.toFixed(2)}px`;
      line.scale = 0;
      place(line);
    }
  };

  const tick = (now: number) => {
    frame = 0;
    if (sweepStart) {
      const t = (now - sweepStart) / SWEEP_MS;
      if (t >= 1) {
        sweepStart = 0;
        lensX = null;
      } else {
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        const first = lines[0];
        lensX = first.boxLeft + first.boxWidth * (-0.15 + 1.3 * eased);
        lensY = 0.5;
      }
    }

    let moving = sweepStart !== 0;

    lines.forEach((line, li) => {
      const lineY = (li + 0.5) / lines.length;
      const amp = 0.35 + 0.65 * Math.max(0, 1 - Math.abs(lensY - lineY) * 1.3);
      const x = lensX === null ? 0 : (lensX - line.visualLeft) / Math.max(line.visualWidth, 1);
      const n = line.chars.length;

      line.chars.forEach((c, k) => {
        let tw = W.rest;
        let tg = G.rest;
        if (lensX !== null) {
          // Blisko soczewki: szeroko i grubo. Daleko: wąsko i lekko.
          const influence = Math.exp(-(((k + 0.5) / n - x) ** 2) / (2 * SPREAD ** 2)) * amp;
          tw = W.min + (W.max - W.min) * influence;
          tg = G.min + (G.max - G.min) * influence;
        }
        c.w += (tw - c.w) * EASE;
        c.g += (tg - c.g) * EASE;
        if (Math.abs(tw - c.w) > 0.5 || Math.abs(tg - c.g) > 2) moving = true;
        else {
          c.w = tw;
          c.g = tg;
        }
        show(c);
      });

      place(line);
    });

    if (moving && visible) frame = requestAnimationFrame(tick);
  };

  const wake = () => {
    if (!frame && visible) frame = requestAnimationFrame(tick);
  };

  const release = () => {
    lensX = null;
    wake();
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    sweepStart = 0;
    lensX = e.clientX;
    lensY = clamp01((e.clientY + scrollY - rootTop) / rootHeight);
    wake();
  };

  // Na ekranach dotykowych soczewkę przesuwa przewijanie przez hero.
  const onScroll = () => {
    const progress = (scrollY - sectionTop) / (sectionHeight * 0.6);
    if (progress <= 0.02 || progress >= 1) return release();
    const first = lines[0];
    sweepStart = 0;
    lensX = first.boxLeft + first.boxWidth * (-0.1 + 1.2 * progress);
    lensY = progress;
    wake();
  };

  const settle = () => {
    lensX = null;
    sweepStart = 0;
    for (const line of lines) {
      for (const c of line.chars) {
        c.w = W.rest;
        c.g = G.rest;
        show(c);
      }
      place(line);
    }
  };

  const bind = () => {
    section.removeEventListener('pointermove', onPointerMove);
    section.removeEventListener('pointerleave', release);
    removeEventListener('scroll', onScroll);
    if (reduce.matches) return settle();
    if (finePointer.matches) {
      section.addEventListener('pointermove', onPointerMove, { passive: true });
      section.addEventListener('pointerleave', release, { passive: true });
    } else {
      addEventListener('scroll', onScroll, { passive: true });
    }
  };

  document.fonts.ready.then(() => {
    measureAdvances(lines);
    measureGeometry();
    bind();
    if (!reduce.matches) {
      // Jedno wejście: soczewka przejeżdża przez napis, potem wszystko wraca do spoczynku.
      sweepStart = performance.now();
      wake();
    }

    reduce.addEventListener('change', bind);
    finePointer.addEventListener('change', bind);
    new ResizeObserver(() => measureGeometry()).observe(root);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && (sweepStart || lensX !== null)) wake();
    }).observe(root);
  });
}
