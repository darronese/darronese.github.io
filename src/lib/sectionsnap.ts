import { animate } from 'animejs';

// how long scrolling must be idle (ms) before we decide where to snap.
// long enough to let trackpad/phone momentum finish.
const IDLE_MS = 140;
// snap to the next section once it fills this much of the screen
const COMMIT = 0.45;
// snap back if we overshot a section top by less than this much of the screen
const OVERSHOOT = 0.12;

// Snaps a scroll container onto section tops with an anime.js animation.
// Unlike CSS scroll-snap, tall sections can still be scrolled through freely:
// it only snaps once scrolling stops and a section top is close enough.
export function createSectionSnap(container: HTMLElement, ids: string[]) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // auto-snapping fights free scrolling on phones, so only do it at tailwind's sm and up
  const smallScreen = window.matchMedia('(max-width: 639px)');
  const pos = { y: container.scrollTop };
  let anim: ReturnType<typeof animate> | null = null;
  let autoScrolling = false;
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  let lastTop = container.scrollTop;
  let direction = 0;
  let touching = false;

  const tops = () =>
    ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .map((el) => el.offsetTop);

  function stop() {
    anim?.pause();
    anim = null;
    autoScrolling = false;
  }

  function scrollTo(y: number, duration: number, ease: string) {
    stop();
    const max = container.scrollHeight - container.clientHeight;
    const target = Math.max(0, Math.min(max, y));
    if (Math.abs(target - container.scrollTop) < 2) return;
    if (reducedMotion) {
      container.scrollTop = target;
      return;
    }
    autoScrolling = true;
    pos.y = container.scrollTop;
    anim = animate(pos, {
      y: target,
      duration,
      ease,
      onUpdate: () => {
        container.scrollTop = pos.y;
      },
      onComplete: () => {
        autoScrolling = false;
        lastTop = container.scrollTop;
      },
    });
  }

  function snap() {
    if (touching || autoScrolling || smallScreen.matches) return;
    const top = container.scrollTop;
    const vh = container.clientHeight;
    const all = tops();

    let target: number | undefined;
    if (direction > 0) {
      // heading down: commit to the next section once enough of it is showing,
      // otherwise settle back if we only just slid past a section top
      target = all.find((t) => t > top && t - top <= vh * COMMIT)
        ?? all.find((t) => t < top && top - t <= vh * OVERSHOOT);
    } else if (direction < 0) {
      target = [...all].reverse().find((t) => t < top && top - t <= vh * COMMIT)
        ?? all.find((t) => t > top && t - top <= vh * OVERSHOOT);
    }
    if (target !== undefined) scrollTo(target, 650, 'outQuart');
  }

  function onScroll() {
    if (autoScrolling) return;
    const top = container.scrollTop;
    if (top !== lastTop) direction = Math.sign(top - lastTop);
    lastTop = top;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(snap, IDLE_MS);
  }

  // any new input from the user wins over an in-flight snap
  const interrupt = () => {
    if (autoScrolling) stop();
  };
  const onTouchStart = () => {
    touching = true;
    interrupt();
  };
  const onTouchEnd = () => {
    touching = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(snap, IDLE_MS);
  };

  container.addEventListener('scroll', onScroll, { passive: true });
  container.addEventListener('wheel', interrupt, { passive: true });
  container.addEventListener('touchstart', onTouchStart, { passive: true });
  container.addEventListener('touchend', onTouchEnd, { passive: true });
  // a cancelled touch (e.g. the OS grabbing the gesture) never sends touchend
  container.addEventListener('touchcancel', onTouchEnd, { passive: true });
  window.addEventListener('keydown', interrupt);

  return {
    // used by the nav buttons
    scrollToSection(id: string) {
      const el = document.getElementById(id);
      if (el) scrollTo(el.offsetTop, 900, 'inOutCubic');
    },
    destroy() {
      stop();
      clearTimeout(idleTimer);
      container.removeEventListener('scroll', onScroll);
      container.removeEventListener('wheel', interrupt);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('keydown', interrupt);
    },
  };
}
