/**
 * Przewijanie do kotwic na tej samej stronie. Natywne `scroll-behavior: smooth` przy długich dystansach
 * przelatuje przez stos arkuszy tak szybko, że wygląda jak przeskok. Tu czas rośnie z dystansem, ruch rusza
 * i hamuje łagodnie, a bardzo daleką drogę skraca się do kilku ostatnich ekranów, żeby nie migały
 * wszystkie karty po kolei.
 *
 * Każdy ruch użytkownika (kółko, dotyk, klawisz) przerywa animację i oddaje mu stronę.
 * Przy ograniczonym ruchu i dla linku „Przejdź do treści” zostaje zwykły skok przeglądarki.
 */

/** Najdłuższa przewijana droga, w wysokościach ekranu; resztę pokonuje się od razu na starcie. */
const MAX_TRAVEL = 4;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Docelowa pozycja liczona tak jak przy natywnym skoku (z `scroll-margin`). Wyjątek: `#top` to nagłówek
 * w przyklejonym hero, który przeglądarka widzi „na miejscu” także w połowie strony, więc liczy się tu jako zero.
 */
function targetY(target: Element) {
  if (target.id === 'top') return 0;
  const start = window.scrollY;
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
  const y = window.scrollY;
  window.scrollTo({ top: start, behavior: 'instant' });
  return y;
}

export function initAnchorScroll() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };
  for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) {
    window.addEventListener(type, stop, { passive: true });
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    // Menu linkuje do „/#kontakt”, żeby działało też z podstron; liczą się tylko kotwice na bieżącej stronie.
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || link.matches('.skip') || reduced.matches) return;
    if (link.origin !== location.origin || link.pathname !== location.pathname || link.search !== location.search) return;
    const hash = link.hash;
    const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (!target) return;

    event.preventDefault();
    stop();

    const vh = window.innerHeight;
    const end = targetY(target);
    let from = window.scrollY;
    if (Math.abs(end - from) > MAX_TRAVEL * vh) {
      from = end + Math.sign(from - end) * MAX_TRAVEL * vh;
      window.scrollTo({ top: from, behavior: 'instant' });
    }
    const distance = end - from;
    const duration = Math.min(1100, 320 + 180 * Math.sqrt(Math.abs(distance) / vh));
    const startTime = performance.now();

    // Adres jak po zwykłym kliknięciu kotwicy, ale bez drugiego, natywnego skoku.
    if (location.hash !== hash) history.pushState(null, '', hash);
    // Z klawiatury (Enter daje kliknięcie z detail 0) fokus idzie za treścią, żeby Tab ruszał od celu.
    if (event.detail === 0) {
      if (!target.matches('a[href], button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      window.scrollTo({ top: from + distance * easeInOutCubic(t), behavior: 'instant' });
      if (t < 1) {
        frame = requestAnimationFrame(step);
        return;
      }
      frame = 0;
    };
    frame = requestAnimationFrame(step);
  });
}
