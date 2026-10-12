"""
Buduje pliki logo z konturów kroju Anybody (font zmienny z node_modules), żeby znak i strona miały ten sam krój.

Znak: dwa arkusze, jak stos sekcji na stronie głównej. Tylny, jaśniejszy, jest odsunięty w głąb,
przedni kobaltowy niesie literę D. Logotyp z soczewką: „Damian / Ułaś” w dwóch liniach, jak w hero,
z literami o różnej szerokości i grubości (soczewka zatrzymana na „i” oraz „a”).

Wymaga Pythona 3 i fontTools:  pip install fonttools brotli
Uruchomienie z katalogu repozytorium:  python scripts/brand/logo.py
Zapisuje: public/favicon.svg, public/brand/*.svg, src/data/brand.ts
"""

from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
FONTS = ROOT / 'node_modules/@fontsource-variable/anybody/files'

COBALT = '#2f45e0'
COBALT_LIGHT = '#8d9cff'
INK = '#16223a'
SNOW = '#f4f6ff'

CAP = 1350  # wysokość wersalików w jednostkach fontu (2000 upm)

_instances = {}


def _font(ext, wdth, wght):
    key = (ext, wdth, wght)
    if key not in _instances:
        name = f"anybody-latin{'-ext' if ext else ''}-standard-normal.woff2"
        _instances[key] = instantiateVariableFont(TTFont(FONTS / name), {'wdth': wdth, 'wght': wght})
    return _instances[key]


def _glyph(ch, wdth, wght):
    for ext in (False, True):
        font = _font(ext, wdth, wght)
        cmap = font.getBestCmap()
        if ord(ch) in cmap:
            glyphs = font.getGlyphSet()
            return glyphs[cmap[ord(ch)]], glyphs
    raise KeyError(ch)


def _num(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def text_path(chars, x, baseline, scale, tracking=0):
    """Kontury liter jako jedna ścieżka SVG. chars: [(znak, wdth, wght)]. Zwraca (d, lewa, prawa krawędź)."""
    d = []
    left = right = None
    for ch, wdth, wght in chars:
        if ch == ' ':
            x += 520 * wdth / 100 * scale
            continue
        glyph, glyphs = _glyph(ch, wdth, wght)
        pen = SVGPathPen(glyphs, _num)
        glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        d.append(pen.getCommands())
        bounds = BoundsPen(glyphs)
        glyph.draw(bounds)
        x0, _, x1, _ = bounds.bounds
        left = x + x0 * scale if left is None else left
        right = x + x1 * scale
        x += (glyph.width + tracking) * scale
    return ''.join(d), left, right


def svg(width, height, body, label):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {_num(width)} {_num(height)}" role="img" '
        f'aria-label="{label}">{body}</svg>\n'
    )


# ---------- Znak ----------
# Siatka 100 x 100. Tylny arkusz wystaje nad przedni o 12,5 jednostki: w 16 px to wciąż 2 piksele.
SIZE = 100
BACK = dict(x=8, y=0, width=84, height=80, rx=18)
FRONT = dict(x=0, y=12.5, width=100, height=87.5, rx=21)


def _letter():
    scale = 0.033  # D zajmuje ok. 51% szerokości arkusza
    _, left, right = text_path([('D', 120, 860)], 0, 0, scale)
    x = (SIZE - (right - left)) / 2 - left
    cy = FRONT['y'] + FRONT['height'] / 2
    d, _, _ = text_path([('D', 120, 860)], x, cy + CAP * scale / 2, scale)
    return d


LETTER = _letter()


def _rect(r, fill, extra=''):
    return f'<rect x="{_num(r["x"])}" y="{_num(r["y"])}" width="{_num(r["width"])}" height="{_num(r["height"])}" rx="{_num(r["rx"])}" fill="{fill}"{extra}/>'


def mark(back=COBALT_LIGHT, front=COBALT, letter=SNOW):
    body = _rect(BACK, back) + _rect(FRONT, front) + f'<path d="{LETTER}" fill="{letter}"/>'
    return svg(SIZE, SIZE, body, 'Damian Ułaś')


def mark_mono(color=INK):
    """Jeden kolor: przerwa między arkuszami i litera są wycięte maską."""
    gap = 4.5
    cut = dict(x=-gap, y=FRONT['y'] - gap, width=SIZE + 2 * gap, height=FRONT['height'] + 2 * gap, rx=FRONT['rx'] + gap)
    body = (
        '<defs>'
        f'<mask id="gap">{_rect(dict(x=0, y=0, width=SIZE, height=SIZE, rx=0), "#fff")}{_rect(cut, "#000")}</mask>'
        f'<mask id="letter">{_rect(dict(x=0, y=0, width=SIZE, height=SIZE, rx=0), "#fff")}<path d="{LETTER}" fill="#000"/></mask>'
        '</defs>'
        + _rect(BACK, color, ' mask="url(#gap)"')
        + _rect(FRONT, color, ' mask="url(#letter)"')
    )
    return svg(SIZE, SIZE, body, 'Damian Ułaś')


# ---------- Logotyp z soczewką ----------
LENS_DAMIAN = [('D', 78, 620), ('a', 86, 660), ('m', 124, 780), ('i', 150, 860), ('a', 122, 770), ('n', 84, 650)]
LENS_ULAS = [('U', 80, 640), ('ł', 104, 720), ('a', 150, 860), ('ś', 116, 760)]


def wordmark_lens(color=INK):
    s = 0.05
    _, a1, b1 = text_path(LENS_DAMIAN, 0, 0, s, -10)
    _, _, b2 = text_path(LENS_ULAS, 0, 0, s, -10)
    width = b1 - a1
    line1, _, _ = text_path(LENS_DAMIAN, -a1, CAP * s, s, -10)
    line2, _, _ = text_path(LENS_ULAS, width - b2, (CAP + 1720) * s, s, -10)
    return svg(width, (CAP + 1740) * s, f'<path d="{line1}{line2}" fill="{color}"/>', 'Damian Ułaś')


# ---------- Znak z napisem (jak w nagłówku strony) ----------
def lockup(color=INK):
    s = 0.03
    height = 100
    mark_size = 100
    gap = 26
    baseline = height / 2 + CAP * s / 2
    _, left, _ = text_path([(c, 115, 800) for c in 'Damian Ułaś'], 0, 0, s)
    d, _, right = text_path([(c, 115, 800) for c in 'Damian Ułaś'], mark_size + gap - left, baseline, s)
    body = (
        _rect(BACK, COBALT_LIGHT) + _rect(FRONT, COBALT) + f'<path d="{LETTER}" fill="{SNOW}"/>'
        + f'<path d="{d}" fill="{color}"/>'
    )
    return svg(right, height, body, 'Damian Ułaś')


def write(rel, content):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding='utf-8', newline='\n')
    print(rel)


if __name__ == '__main__':
    write('public/favicon.svg', mark())
    write('public/brand/mark.svg', mark())
    write('public/brand/mark-inverse.svg', mark(back=COBALT_LIGHT, front=SNOW, letter=COBALT))
    write('public/brand/mark-mono.svg', mark_mono())
    write('public/brand/logo-lens.svg', wordmark_lens())
    write('public/brand/logo-lens-snow.svg', wordmark_lens(SNOW))
    write('public/brand/lockup.svg', lockup())
    write(
        'src/data/brand.ts',
        '// Plik generowany przez scripts/brand/logo.py. Geometria znaku: stos dwóch arkuszy z literą D.\n\n'
        'export const brandMark = {\n'
        f"  viewBox: '0 0 {SIZE} {SIZE}',\n"
        f'  back: {{ x: {_num(BACK["x"])}, y: {_num(BACK["y"])}, width: {_num(BACK["width"])}, height: {_num(BACK["height"])}, rx: {_num(BACK["rx"])} }},\n'
        f'  front: {{ x: {_num(FRONT["x"])}, y: {_num(FRONT["y"])}, width: {_num(FRONT["width"])}, height: {_num(FRONT["height"])}, rx: {_num(FRONT["rx"])} }},\n'
        f"  letter: '{LETTER}',\n"
        '} as const;\n',
    )
