/**
 * Tor kroków w sekcji o agentach AI. Krok, na którym jest czytelnik, robi się szeroki i jasny,
 * a szyna wypełnia się do niego. Sterowanie: przewijanie, a na dużych ekranach także kursor.
 *
 * Wydajność: jeden odczyt geometrii na klatkę przewijania, style ustawiane tylko przy zmianie stanu,
 * nasłuch działa wyłącznie wtedy, gdy tor jest blisko ekranu.
 */

/** Ułamek wysokości ekranu, na którym „stoi” bieżący krok w układzie pionowym. */
const FOCUS = 0.55;
/** Na jakiej części ekranu rozgrywa się cały przebieg w układzie poziomym. */
const RUN = 0.9;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function initFlowTrack(flow: HTMLElement) {
  const track = flow.querySelector<HTMLElement>('.track');
  const stations = [...flow.querySelectorAll<HTMLElement>('[data-station]')];
  if (!track || stations.length === 0) return;

  const horizontal = matchMedia('(min-width: 60rem)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

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
      ? (innerHeight - rect.top) / (innerHeight * RUN)
      : (innerHeight * FOCUS - rect.top) / Math.max(rect.height, 1);
    apply(clamp01(progress) * stations.length);
  };

  const onScroll = () => {
    if (frame || pinned !== null || !near) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fromScroll();
    });
  };

  // Na dużych ekranach kursor wskazuje krok od razu, bez czekania na przewinięcie.
  const onEnter = (event: PointerEvent) => {
    if (!horizontal.matches || !finePointer.matches) return;
    const index = stations.indexOf(event.currentTarget as HTMLElement);
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
  for (const station of stations) {
    station.addEventListener('pointerenter', onEnter);
    station.addEventListener('pointerleave', onLeave);
  }

  new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting;
      if (near) onScroll();
    },
    { rootMargin: '100% 0px' },
  ).observe(flow);
}
