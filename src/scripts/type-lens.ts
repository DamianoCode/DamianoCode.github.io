/**
 * Soczewka typograficzna w hero: litery blisko kursora (albo miejsca przewinięcia na ekranach dotykowych)
 * robią się szerokie i grube, dalsze wąskie i lekkie.
 *
 * Wydajność:
 * - Każda litera ma jeden parametr `u` (0 = wąsko i lekko, 1 = szeroko i grubo), z którego wynikają obie osie
 *   kroju. `u` jest zaokrąglane do LEVELS poziomów, więc wszystkich wariantów kroju jest tylko LEVELS + 1.
 * - Nowy wariant jest dla przeglądarki kosztowny, dlatego wszystkie powstają z góry, razem z pomiarem
 *   ich szerokości: małymi porcjami w wolnych chwilach, od najgrubszych kroków do najdrobniejszych.
 *   Zanim wszystkie będą gotowe, animacja używa najbliższego gotowego wariantu.
 * - Pętla animacji niczego nie mierzy, a rozmiar napisu zmienia `transform: scale`, nie `font-size`.
 */

/** Tyle poziomów daje kroki ok. 1 jednostki szerokości i 6 jednostek grubości: poniżej progu widoczności. */
const LEVELS = 100;
const W_RANGE = [50, 150] as const;
const G_RANGE = [280, 860] as const;
/** Spoczynek: szerokość 100, grubość 640. Krzywa grubości jest dobrana tak, by oba punkty wypadły przy u = 0.5. */
const U_REST = 0.5;
const G_CURVE = Math.log((640 - G_RANGE[0]) / (G_RANGE[1] - G_RANGE[0])) / Math.log(U_REST);
const SPREAD = 0.17;
const SWEEP_MS = 1500;
const EASE = 0.16;
/** Wysokość linii napisu jako ułamek rozmiaru kroju (zgodna z `line-height` w CSS). */
const LINE_HEIGHT = 0.8;

type Char = {
  el: HTMLElement;
  /** Bieżąca, płynna wartość parametru. */
  u: number;
  /** Poziom, który jest aktualnie w stylu. */
  level: number;
  /** Szerokość litery przy 100px dla każdego poziomu (puste, dopóki poziom nie jest zmierzony). */
  advances: number[];
};

type Line = {
  box: HTMLElement;
  word: HTMLElement;
  chars: Char[];
  alignEnd: boolean;
  /** Szerokość w spoczynku przy 100px. */
  restWidth: number;
  fontSize: number;
  /** Rozmiar, dla którego trwa albo zakończyło się przygotowanie wariantów. */
  preparedSize: number;
  /** Dla każdego poziomu: najbliższy poziom, który już ma zmierzoną szerokość. */
  nearest: number[];
  /** Kończy się, gdy wszystkie warianty w bieżącym rozmiarze są gotowe. */
  ready: Promise<void>;
  boxLeft: number;
  boxWidth: number;
  boxHeight: number;
  scale: number;
  /** Położenie napisu na ekranie z poprzedniej klatki, do mapowania kursora na litery. */
  visualLeft: number;
  visualWidth: number;
};

const REST_LEVEL = Math.round(U_REST * LEVELS);
const VARIATIONS = Array.from({ length: LEVELS + 1 }, (_, level) => {
  const u = level / LEVELS;
  const w = W_RANGE[0] + (W_RANGE[1] - W_RANGE[0]) * u;
  const g = G_RANGE[0] + (G_RANGE[1] - G_RANGE[0]) * u ** G_CURVE;
  return `'wdth' ${w.toFixed(1)}, 'wght' ${g.toFixed(0)}`;
});

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const levelOf = (u: number) => Math.round(clamp01(u) * LEVELS);

/** Ukryty element o stylach napisu, w którym można mierzyć litery bez wpływu na stronę. */
function withProbe<T>(line: Line, fontSize: number, fill: (probe: HTMLElement) => () => T): T {
  const probe = line.word.cloneNode(false) as HTMLElement;
  probe.style.cssText = `position:absolute;left:0;top:0;visibility:hidden;transform:none;font-size:${fontSize}px`;
  const read = fill(probe);
  document.body.append(probe);
  const result = read();
  probe.remove();
  return result;
}

/** Szerokość napisu w spoczynku przy 100px. */
function measureRestWidth(line: Line) {
  return withProbe(line, 100, (probe) => {
    for (const c of line.chars) {
      const el = c.el.cloneNode(true) as HTMLElement;
      el.style.fontVariationSettings = VARIATIONS[REST_LEVEL];
      probe.append(el);
    }
    return () => probe.getBoundingClientRect().width;
  });
}

/** Poziomy od najgrubszych kroków do najdrobniejszych: spoczynek i skrajności są gotowe najwcześniej. */
const PREPARE_ORDER = [...new Set([REST_LEVEL, ...[50, 25, 12, 6, 3, 1].flatMap((stride) =>
  Array.from({ length: Math.floor(LEVELS / stride) + 1 }, (_, i) => i * stride),
)])];
/** Tyle liter w porcji mieści się w kilkunastu milisekundach nawet na słabszym telefonie. */
const LETTERS_PER_CHUNK = 24;

const idle = () =>
  new Promise<void>((resolve) =>
    'requestIdleCallback' in window ? requestIdleCallback(() => resolve(), { timeout: 250 }) : setTimeout(resolve, 16),
  );

function updateNearest(line: Line) {
  const measured = line.chars[0].advances;
  let last = -1;
  for (let level = 0; level <= LEVELS; level++) {
    if (measured[level] !== undefined) last = level;
    line.nearest[level] = last;
  }
  let next = -1;
  for (let level = LEVELS; level >= 0; level--) {
    if (measured[level] !== undefined) next = level;
    const prev = line.nearest[level];
    line.nearest[level] = prev === -1 || (next !== -1 && next - level < level - prev) ? next : prev;
  }
}

/**
 * Tworzy warianty liter w docelowym rozmiarze i mierzy ich szerokość, porcjami. Pierwsza porcja
 * (spoczynek i skrajności) wykonuje się od razu, reszta w wolnych chwilach przeglądarki.
 * Przerywa się, gdy w międzyczasie zmieni się rozmiar napisu.
 */
async function prepareVariants(line: Line, fontSize: number) {
  const perChunk = Math.max(1, Math.floor(LETTERS_PER_CHUNK / line.chars.length));
  for (let i = 0; i < PREPARE_ORDER.length; i += perChunk) {
    if (line.preparedSize !== fontSize) return;
    const levels = PREPARE_ORDER.slice(i, i + perChunk);
    withProbe(line, fontSize, (probe) => {
      const cells = line.chars.flatMap((c) =>
        levels.map((level) => {
          const el = c.el.cloneNode(true) as HTMLElement;
          el.style.fontVariationSettings = VARIATIONS[level];
          probe.append(el);
          return { c, level, el };
        }),
      );
      return () => {
        for (const { c, level, el } of cells) c.advances[level] = (el.getBoundingClientRect().width * 100) / fontSize;
      };
    });
    updateNearest(line);
    await idle();
  }
}

export function initTypeLens(root: HTMLElement, section: HTMLElement) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  const lines: Line[] = [...root.querySelectorAll<HTMLElement>('[data-line]')].map((box) => ({
    box,
    word: box.firstElementChild as HTMLElement,
    chars: [...box.querySelectorAll<HTMLElement>('.ch')].map((el) => ({
      el,
      u: U_REST,
      level: -1,
      advances: [],
    })),
    alignEnd: box.classList.contains('line-end'),
    restWidth: 0,
    fontSize: 0,
    preparedSize: 0,
    nearest: [],
    ready: Promise.resolve(),
    boxLeft: 0,
    boxWidth: 0,
    boxHeight: 0,
    scale: 0,
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

  const show = (line: Line, c: Char) => {
    const level = line.nearest[levelOf(c.u)];
    if (level !== c.level) {
      c.level = level;
      c.el.style.fontVariationSettings = VARIATIONS[level];
    }
  };

  /** Skaluje napis tak, by wypełnił szerokość, ale nie przekroczył wysokości linii. Bez odczytu układu. */
  const place = (line: Line) => {
    const width = line.chars.reduce((sum, c) => sum + c.advances[c.level], 0) * (line.fontSize / 100);
    const scale = Math.min(line.boxWidth / width, line.boxHeight / (LINE_HEIGHT * line.fontSize));
    if (Math.abs(scale - line.scale) > 0.0005) {
      line.scale = scale;
      line.word.style.transform = `scale(${scale.toFixed(4)})`;
    }
    line.visualWidth = width * scale;
    line.visualLeft = line.alignEnd ? line.boxLeft + line.boxWidth - line.visualWidth : line.boxLeft;
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
      line.restWidth ||= measureRestWidth(line);
      line.fontSize = Math.round(Math.min((rect.width / line.restWidth) * 100, rect.height / LINE_HEIGHT));
      line.word.style.fontSize = `${line.fontSize}px`;
      if (line.fontSize !== line.preparedSize) {
        line.preparedSize = line.fontSize;
        line.ready = prepareVariants(line, line.fontSize);
      }
      line.scale = 0;
      for (const c of line.chars) show(line, c);
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
        // Blisko soczewki: szeroko i grubo. Daleko: wąsko i lekko.
        const target =
          lensX === null ? U_REST : Math.exp(-(((k + 0.5) / n - x) ** 2) / (2 * SPREAD ** 2)) * amp;
        c.u += (target - c.u) * EASE;
        if (Math.abs(target - c.u) > 0.004) moving = true;
        else c.u = target;
        show(line, c);
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
        c.u = U_REST;
        show(line, c);
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

  document.fonts.ready.then(async () => {
    measureGeometry();
    bind();
    await Promise.all(lines.map((line) => line.ready));
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
