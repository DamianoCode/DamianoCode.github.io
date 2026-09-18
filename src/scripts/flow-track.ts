/**
 * Tor kroków w sekcji o agentach AI. Krok, na którym jest czytelnik, robi się szeroki i jasny,
 * a szyna wypełnia się do niego. Sterowanie: przewijanie, a na dużych ekranach także kursor.
 *
 * Wydajność: jeden odczyt geometrii na klatkę przewijania, style ustawiane tylko przy zmianie stanu,
 * nasłuch działa wyłącznie wtedy, gdy tor jest blisko ekranu.
 */

/** Ułamek wysokości ekranu, na którym „stoi” bieżący krok w układzie pionowym. */
const FOCUS = 0.55;
/** Układ poziomy: przebieg zaczyna się, gdy tor wjeżdża na tej wysokości ekranu… */
const ENTER = 0.85;
/** …i kończy po przewinięciu takiej części wysokości ekranu, gdy tor jest jeszcze dobrze widoczny. */
const RUN = 0.55;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function initFlowTrack(flow: HTMLElement) {
  const track = flow.querySelector<HTMLElement>('.track');
  const stations = [...flow.querySelectorAll<HTMLElement>('[data-station]')];
  if (!track || stations.length === 0) return;

  const horizontal = matchMedia('(min-width: 60rem)');

  let active = -1;
  let fills = stations.map(() => -1);
  let pinned: number | null = null;
  let frame = 0;
  let near = true;

  const apply = (float: number) => {
    const next = Math.min(stations.length - 1, Math.max(0, Math.floor(float)));
    stations.forEach((station, i) => {
      const fill = clamp01(float - i);
      if (Math.abs(fill - fills[i]) > 0.01) {
        fills[i] = fill;
        station.style.setProperty('--fill', fill.toFixed(3));
      }
      if (next !== active) {
        station.classList.toggle('is-active', i === next);
        station.classList.toggle('is-done', i < next);
      }
    });
    active = next;
  };

  const fromScroll = () => {
    const rect = flow.getBoundingClientRect();
    const progress = horizontal.matches
      ? (innerHeight * ENTER - rect.top) / (innerHeight * RUN)
      : (innerHeight * FOCUS - rect.top) / Math.max(rect.height, 1);
    apply(clamp01(progress) * stations.length);
  };

  // Przewijanie zawsze ma pierwszeństwo: zdejmuje wskazanie kursorem.
  const onScroll = () => {
    pinned = null;
    if (frame || !near) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fromScroll();
    });
  };

  // Na dużych ekranach kursor wskazuje krok, ale dopiero gdy naprawdę się poruszy.
  let pointerX = -1;
  let pointerY = -1;
  const onPointerMove = (event: PointerEvent) => {
    if (!horizontal.matches || event.pointerType !== 'mouse') return;
    if (Math.abs(event.clientX - pointerX) < 2 && Math.abs(event.clientY - pointerY) < 2) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    const station = (event.target as HTMLElement).closest('[data-station]') as HTMLElement | null;
    const index = station ? stations.indexOf(station) : -1;
    if (index < 0) return;
    pinned = index;
    apply(index + 0.999);
  };

  const onLeave = () => {
    if (pinned === null) return;
    pinned = null;
    fromScroll();
  };

  track.classList.add('is-live');
  fromScroll();

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  track.addEventListener('pointermove', onPointerMove, { passive: true });
  track.addEventListener('pointerleave', onLeave, { passive: true });

  new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting;
      if (near) onScroll();
    },
    { rootMargin: '100% 0px' },
  ).observe(flow);
}
