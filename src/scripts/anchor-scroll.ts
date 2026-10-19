/**
 * Przewijanie do kotwic na tej samej stronie. Natywne `scroll-behavior: smooth` przy długich dystansach
 * przelatuje przez stos arkuszy tak szybko, że wygląda jak przeskok. Tu czas rośnie z dystansem, ruch rusza
 * i hamuje łagodnie, a bardzo daleką drogę skraca się do kilku ostatnich ekranów, żeby nie migały
 * wszystkie karty po kolei.
 *
 * Każdy ruch użytkownika (kółko, dotyk, klawisz) przerywa animację i oddaje mu stronę.
 * Przy ograniczonym ruchu cel jest ten sam, ale bez animacji. Link „Przejdź do treści” zostaje natywny.
 */

/** Najdłuższa przewijana droga, w wysokościach ekranu; resztę pokonuje się od razu na starcie. */
const MAX_TRAVEL = 4;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Mierzymy położenie w układzie, nie aktualne położenie przyklejonej karty pod następnymi arkuszami.
 * Wyłączenie sticky i jego przywrócenie odbywa się przed narysowaniem klatki.
 */
function targetY(target: Element) {
  if (target.id === 'top') return 0;
  const sticky: { element: HTMLElement; value: string; priority: string }[] = [];
  try {
    for (let element: Element | null = target; element; element = element.parentElement) {
      if (!(element instanceof HTMLElement) || getComputedStyle(element).position !== 'sticky') continue;
      sticky.push({
        element,
        value: element.style.getPropertyValue('position'),
        priority: element.style.getPropertyPriority('position'),
      });
      element.style.setProperty('position', 'static', 'important');
    }
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - margin;
    return Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight));
  } finally {
    for (const { element, value, priority } of sticky) {
      if (value) element.style.setProperty('position', value, priority);
      else element.style.removeProperty('position');
    }
  }
}

function hashTarget(hash: string) {
  try {
    return hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  } catch {
    return null;
  }
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

  // Natywne wejście z hashem (także z podstrony) oraz Wstecz/Dalej wymagają tej samej korekty sticky.
  const alignHash = () => {
    stop();
    frame = requestAnimationFrame(() => {
      frame = 0;
      const target = hashTarget(location.hash);
      if (target) window.scrollTo({ top: targetY(target), behavior: 'instant' });
    });
  };
  window.addEventListener('hashchange', alignHash);
  if (document.readyState === 'complete') alignHash();
  else window.addEventListener('load', alignHash, { once: true });

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    // Menu linkuje do „/#kontakt”, żeby działało też z podstron; liczą się tylko kotwice na bieżącej stronie.
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || link.matches('.skip')) return;
    if (link.origin !== location.origin || link.pathname !== location.pathname || link.search !== location.search) return;
    const hash = link.hash;
    const target = hashTarget(hash);
    if (!target) return;

    event.preventDefault();
    stop();

    const vh = window.innerHeight;
    const end = targetY(target);
    let from = window.scrollY;
    if (!reduced.matches && Math.abs(end - from) > MAX_TRAVEL * vh) {
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

    if (reduced.matches) {
      window.scrollTo({ top: end, behavior: 'instant' });
      return;
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
