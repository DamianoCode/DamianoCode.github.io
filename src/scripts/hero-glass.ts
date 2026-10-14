/**
 * Szklana soczewka w hero: kobaltowy arkusz nosi bladą siatkę kreślarską, a soczewka typograficzna
 * powiększa ją jak prawdziwe szkło, z cienkim rozszczepieniem barw tam, gdzie obraz najmocniej się wygina.
 *
 * Wydajność:
 * - Jeden prostokąt w WebGL2 i krótki shader. Klatka rysuje się tylko wtedy, gdy soczewka się rusza
 *   albo gaśnie; w spoczynku płótno stoi i nie zużywa nic.
 * - Gęstość pikseli jest ograniczona do 2, a poza ekranem nic się nie rysuje.
 * - Bez WebGL2 i przy ograniczonym ruchu zostaje ta sama siatka narysowana w CSS, bez soczewki.
 */

/** Oczko siatki i co które oczko pada mocniejsza linia, w pikselach CSS. */
const CELL = 24;
const MAJOR_EVERY = 4;
/** Powiększenie w środku soczewki: 1 / (1 - MAGNIFY), czyli około 1,5 raza. */
const MAGNIFY = 0.34;
/** Rozszczepienie barw jako ułamek powiększenia: czerwień wygina się mocniej, błękit słabiej. */
const DISPERSION = 0.07;
const EASE = 0.14;

const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform vec2 uLens;
uniform float uRadius;
uniform float uStrength;
uniform float uCell;
uniform vec2 uOrigin;
uniform float uDpr;
out vec4 outColor;

const vec3 COBALT = vec3(0.184, 0.271, 0.878);
const vec3 INK = vec3(0.957, 0.965, 1.0);

// Pokrycie piksela linią siatki o okresie period i grubości width (w pikselach urządzenia).
float grid(vec2 q, float period, float width) {
  vec2 d = abs(fract((q - uOrigin) / period + 0.5) - 0.5) * period;
  vec2 fw = max(fwidth(q), vec2(1e-3));
  vec2 c = clamp((width * 0.5 + fw * 0.5 - d) / fw, 0.0, 1.0);
  return max(c.x, c.y);
}

// Jasność siatki w punkcie obrazu q: drobne oczka i co czwarta mocniejsza linia.
float lines(vec2 q, float boost) {
  float minor = grid(q, uCell, uDpr);
  float major = grid(q, uCell * ${MAJOR_EVERY}.0, uDpr * 1.25);
  return max(minor * mix(0.05, 0.13, boost), major * mix(0.1, 0.24, boost));
}

void main() {
  // Płótno liczy od dołu, strona od góry.
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 v = p - uLens;
  float t = clamp(length(v) / uRadius, 0.0, 1.0);
  // Gładki spadek do zera na krawędzi: obraz pod soczewką przechodzi w otoczenie bez szwu.
  float f = (1.0 - t * t) * (1.0 - t * t) * uStrength;
  float m = ${MAGNIFY} * f;

  vec3 a = vec3(
    lines(uLens + v * (1.0 - m * (1.0 + ${DISPERSION})), f),
    lines(uLens + v * (1.0 - m), f),
    lines(uLens + v * (1.0 - m * (1.0 - ${DISPERSION})), f)
  );

  // Szkło odrobinę zbiera światło: wnętrze jest minimalnie jaśniejsze, krawędź ma cienki połysk.
  float rim = smoothstep(0.72, 0.97, t) * (1.0 - smoothstep(0.97, 1.0, t)) * uStrength;
  vec3 base = COBALT + (INK - COBALT) * (0.016 * f + 0.03 * rim);
  outColor = vec4(base + (INK - base) * a, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export type HeroGlass = {
  /** Położenie soczewki w pikselach okna; null wygasza szkło w miejscu, w którym stało. */
  setLens: (x: number | null, y: number) => void;
};

export function initHeroGlass(canvas: HTMLCanvasElement): HeroGlass | null {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u('uRes');
  const uLens = u('uLens');
  const uRadius = u('uRadius');
  const uStrength = u('uStrength');
  const uCell = u('uCell');
  const uOrigin = u('uOrigin');
  const uDpr = u('uDpr');

  const sheet = canvas.parentElement!;
  let dpr = 1;
  let width = 0;
  let height = 0;
  let radius = 0;
  let originX = 0;

  // Soczewka w pikselach CSS względem arkusza (przed pomniejszeniem przez animację przewijania).
  const lens = { x: 0, y: 0, strength: 0 };
  const target = { x: 0, y: 0, strength: 0 };
  let frame = 0;
  let visible = true;

  const draw = () => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform2f(uLens, lens.x * dpr, lens.y * dpr);
    gl.uniform1f(uRadius, radius * dpr);
    gl.uniform1f(uStrength, lens.strength);
    gl.uniform1f(uCell, CELL * dpr);
    gl.uniform2f(uOrigin, originX * dpr, 0);
    gl.uniform1f(uDpr, dpr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const tick = () => {
    frame = 0;
    // Pierwsze pojawienie się soczewki ustawia ją od razu na miejscu, potem płynie za celem.
    if (lens.strength < 0.01 && target.strength > 0) {
      lens.x = target.x;
      lens.y = target.y;
    }
    lens.x += (target.x - lens.x) * EASE;
    lens.y += (target.y - lens.y) * EASE;
    lens.strength += (target.strength - lens.strength) * EASE * 0.8;
    const moving =
      Math.abs(target.x - lens.x) > 0.3 ||
      Math.abs(target.y - lens.y) > 0.3 ||
      Math.abs(target.strength - lens.strength) > 0.003;
    if (!moving) Object.assign(lens, target);
    draw();
    if (moving && visible) frame = requestAnimationFrame(tick);
  };

  const wake = () => {
    if (!frame && visible) frame = requestAnimationFrame(tick);
  };

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    width = sheet.offsetWidth;
    height = sheet.offsetHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    radius = Math.min(Math.max(width * 0.16, 150), 320);
    // Mocniejsze linie siatki zaczynają się na linii treści, jak tytuły sekcji.
    const content = sheet.querySelector<HTMLElement>('.hero-inner');
    originX = content ? parseFloat(getComputedStyle(content).paddingLeft) || 0 : 0;
    draw();
  };

  // Prostokąt płótna na ekranie zmienia się przy przewijaniu (arkusz jest przypięty i maleje) i przy zmianie
  // rozmiaru. Odczytuje się go dopiero przy następnym ruchu soczewki, a nie w każdej jej klatce.
  let rect: DOMRect | null = null;
  const invalidate = () => {
    rect = null;
  };

  sheet.classList.add('has-glass');
  addEventListener('scroll', invalidate, { passive: true });
  new ResizeObserver(() => {
    resize();
    invalidate();
  }).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
  }).observe(canvas);
  canvas.addEventListener('webglcontextlost', () => sheet.classList.remove('has-glass'));

  return {
    setLens(x, y) {
      if (x === null) {
        if (target.strength === 0) return;
        target.strength = 0;
        return wake();
      }
      // Arkusz bywa pomniejszony przez animację przewijania, więc pozycję liczy się z prostokąta na ekranie.
      rect ??= canvas.getBoundingClientRect();
      const nx = ((x - rect.left) / rect.width) * width;
      const ny = ((y - rect.top) / rect.height) * height;
      if (target.strength === 1 && Math.abs(nx - target.x) < 0.5 && Math.abs(ny - target.y) < 0.5) return;
      target.x = nx;
      target.y = ny;
      target.strength = 1;
      wake();
    },
  };
}
