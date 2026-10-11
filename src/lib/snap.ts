const PIECES = 'h1, p, dt, img, svg, iframe, .btn, .badge, .chat-bubble, .chat-header, .chat-footer, .rounded-box, li';

// pieces start crumbling at random times within STAGGER_MS, each taking DISSOLVE_MS
const STAGGER_MS = 1400;
const DISSOLVE_MS = 1100;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  start: number;
  life: number;
};

// matches "transparent" and alpha-0 colors like rgba(0, 0, 0, 0) or oklch(… / 0),
// but not opaque ones that just end in a 0, like rgb(255, 210, 0)
const isTransparent = (color: string) =>
  color === 'transparent' || /^rgba\(.*,\s*0\)$/.test(color) || /\/\s*0\)$/.test(color);

function onScreen(rect: DOMRect) {
  return rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
}

// where a piece is actually drawn. headings and paragraphs are full-width
// boxes with padding, so for plain text use the boxes around the letters
function drawnRects(el: Element): DOMRect[] {
  const hasBackground = !isTransparent(getComputedStyle(el).backgroundColor);
  if (el.matches('img, svg, iframe') || hasBackground) return [el.getBoundingClientRect()];
  const range = document.createRange();
  range.selectNodeContents(el);
  return Array.from(range.getClientRects());
}

// the dust color at a spot in a piece (fx, fy are 0..1 across it):
// real pixels for images, the piece's own colors for everything else.
// null means nothing is drawn there, so no dust
function dustColors(el: Element): (fx: number, fy: number) => string | null {
  // (the browser only lets us read pixels of images from our own site)
  if (el instanceof HTMLImageElement && el.src.startsWith(location.origin)) {
    const size = 16;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(el, 0, 0, size, size);
    const pixels = ctx.getImageData(0, 0, size, size).data;
    return (fx, fy) => {
      const i = (Math.floor(fy * size) * size + Math.floor(fx * size)) * 4;
      // see-through pixels (or an image that hasn't loaded yet) make no dust
      if (pixels[i + 3] < 128) return null;
      return `rgb(${pixels[i]} ${pixels[i + 1]} ${pixels[i + 2]})`;
    };
  }
  const style = getComputedStyle(el);
  const colors = [style.color, style.backgroundColor].filter((c) => !isTransparent(c));
  if (!colors.length) return () => null;
  return () => colors[Math.floor(Math.random() * colors.length)];
}

// fade a piece out, and return the dust it leaves behind
function crumble(el: Element, rects: DOMRect[], withDust: boolean): Particle[] {
  const delay = Math.random() * STAGGER_MS;
  el.animate(
    [
      { opacity: 1, filter: 'blur(0)', translate: '0 0' },
      { opacity: 0, filter: 'blur(3px)', translate: '12px -6px' },
    ],
    { duration: DISSOLVE_MS, delay: delay + 150, easing: 'ease-in', fill: 'forwards' }
  );
  if (!withDust) return [];

  const colorAt = dustColors(el);
  const particles: Particle[] = [];
  for (const rect of rects) {
    // more dust for bigger pieces, capped so a big photo doesn't hog it all
    const count = Math.min(800, Math.round((rect.width * rect.height) / 25));
    for (let i = 0; i < count; i++) {
      const fx = Math.random();
      const fy = Math.random();
      const color = colorAt(fx, fy);
      if (!color) continue;
      particles.push({
        x: rect.left + fx * rect.width,
        y: rect.top + fy * rect.height,
        vx: 30 + Math.random() * 90,
        vy: -35 + Math.random() * 30,
        size: 1 + Math.random() * 2,
        color,
        // crumbles from left to right across the piece
        start: delay + fx * DISSOLVE_MS * 0.7 + Math.random() * 200,
        life: 1100 + Math.random() * 1100,
      });
    }
  }
  return particles;
}

// draw the dust drifting away on a full-screen canvas, then call onDone
function blowAway(particles: Particle[], onDone: () => void) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position: fixed; inset: 0; width: 100%; height: 100%; z-index: 98; pointer-events: none;';
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);

  // run until the last speck is gone, and at least until every piece has faded
  let end = STAGGER_MS + DISSOLVE_MS;
  for (const p of particles) end = Math.max(end, p.start + p.life);
  const begin = performance.now();

  function frame(now: number) {
    const t = now - begin;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of particles) {
      const age = t - p.start;
      if (age < 0 || age > p.life) continue;
      const s = age / 1000;
      ctx.globalAlpha = 1 - age / p.life;
      ctx.fillStyle = p.color;
      // drifts right and floats up a little as it goes, like ash on a breeze
      ctx.fillRect(p.x + p.vx * s, p.y + p.vy * s - 20 * s * s, p.size, p.size);
    }
    if (t < end) {
      requestAnimationFrame(frame);
    } else {
      canvas.remove();
      setTimeout(onDone, 600);
    }
  }
  requestAnimationFrame(frame);
}

export function snap(root: HTMLElement, onDone: () => void) {
  const withDust = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const all = Array.from(root.querySelectorAll(PIECES));
  const innermost = all.filter((el) => !el.querySelector(PIECES));

  const particles: Particle[] = [];
  for (const el of innermost) {
    const rects = drawnRects(el).filter(onScreen);
    // a coin flip for each piece on screen: about half of everything goes
    if (rects.length && Math.random() < 0.5) {
      particles.push(...crumble(el, rects, withDust));
    }
  }
  blowAway(particles, onDone);
}
