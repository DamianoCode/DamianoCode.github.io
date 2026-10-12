/**
 * Tor kroków Claudiusa w karcie projektu. Zmiana „przechodzi” przez kolejne kroki sama: bieżący krok robi się
 * szeroki i jasny, a jego szyna wypełnia się w rytmie kroku. Po ostatnim kroku chwila przerwy i od nowa.
 * Kursor myszy nad krokiem zatrzymuje przebieg na tym kroku; dotyk go nie zatrzymuje, bo na telefonie palec
 * ląduje na torze przy zwykłym przewijaniu.
 *
 * Działa tylko, gdy tor jest na ekranie. Przy ograniczonym ruchu skrypt nic nie robi: wszystkie kroki są czytelne.
 */

/** Czas jednego kroku; ta sama wartość steruje wypełnieniem szyny w CSS (`--step`). */
const STEP_MS = 1500;
/** Przerwa po ostatnim kroku, zanim szyny się opróżnią. */
const HOLD_MS = 2800;
/** Chwila na opróżnienie szyn przed kolejnym przebiegiem; zgrana z przejściem `--drain` w CSS. */
const DRAIN_MS = 700;

export function initFlowTrack(flow: HTMLElement) {
  const track = flow.querySelector<HTMLElement>('.track');
  const stations = [...flow.querySelectorAll<HTMLElement>('[data-station]')];
  if (!track || stations.length === 0) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let active = -1;
  let timer = 0;
  let visible = false;
  let pinned = false;
  let started = false;

  const set = (index: number) => {
    active = index;
    stations.forEach((station, i) => {
      station.classList.toggle('is-active', i === index);
      station.classList.toggle('is-done', i < index);
    });
  };

  const schedule = () => {
    clearTimeout(timer);
    if (!visible || pinned) return;
    const last = active === stations.length - 1;
    // Po ostatnim kroku wszystkie szyny wracają razem do zera, zanim zmiana ruszy od pierwszego kroku.
    const delay = last ? HOLD_MS : active < 0 ? DRAIN_MS : STEP_MS;
    timer = window.setTimeout(() => {
      set(last ? -1 : active + 1);
      schedule();
    }, delay);
  };

  track.style.setProperty('--step', `${STEP_MS}ms`);
  track.style.setProperty('--drain', `${DRAIN_MS}ms`);
  track.classList.add('is-live');

  track.addEventListener('pointerover', (event) => {
    if (event.pointerType !== 'mouse') return;
    const station = (event.target as HTMLElement).closest<HTMLElement>('[data-station]');
    const index = station ? stations.indexOf(station) : -1;
    if (index < 0 || (pinned && index === active)) return;
    pinned = true;
    clearTimeout(timer);
    track.classList.add('is-pinned');
    set(index);
  });
  track.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'mouse' || !pinned) return;
    pinned = false;
    track.classList.remove('is-pinned');
    schedule();
  });

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !started) {
        started = true;
        set(0);
      }
      if (visible) schedule();
      else clearTimeout(timer);
    },
    { threshold: 0.4 },
  ).observe(flow);
}
