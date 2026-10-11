<!--
Scroll-linked ambient background. Each section has its own palette of soft
color "glows"; as you scroll between sections the colors and glow positions
blend continuously, so there is never a hard cut between backgrounds.
-->
<script lang="ts">
  import { onDestroy } from "svelte";

  export let scrollContainer: HTMLElement | undefined;
  export let ids: string[];

  type Glow = { rgb: [number, number, number]; alpha: number; x: number; y: number };
  type Palette = { base: [number, number, number]; glows: [Glow, Glow, Glow] };

  // one palette per section, in the same order as `ids`.
  // colors come from the site palette: #c14953, #848fa5, #e5dcc5, #772a30
  const palettes: Palette[] = [
    // home: warm red glow top-left
    {
      base: [38, 38, 38],
      glows: [
        { rgb: [193, 73, 83], alpha: 0.22, x: 18, y: 22 },
        { rgb: [132, 143, 165], alpha: 0.1, x: 82, y: 72 },
        { rgb: [229, 220, 197], alpha: 0.04, x: 60, y: 8 },
      ],
    },
    // about: cool slate blue takes over
    {
      base: [33, 35, 40],
      glows: [
        { rgb: [193, 73, 83], alpha: 0.1, x: 12, y: 82 },
        { rgb: [132, 143, 165], alpha: 0.22, x: 76, y: 28 },
        { rgb: [229, 220, 197], alpha: 0.05, x: 45, y: 55 },
      ],
    },
    // projects: warm cream, like paper
    {
      base: [40, 38, 35],
      glows: [
        { rgb: [193, 73, 83], alpha: 0.08, x: 62, y: 92 },
        { rgb: [132, 143, 165], alpha: 0.14, x: 88, y: 18 },
        { rgb: [229, 220, 197], alpha: 0.1, x: 22, y: 50 },
      ],
    },
    // music: dark, deep red like a dim stage
    {
      base: [26, 23, 26],
      glows: [
        { rgb: [119, 42, 48], alpha: 0.38, x: 70, y: 74 },
        { rgb: [132, 143, 165], alpha: 0.08, x: 18, y: 18 },
        { rgb: [193, 73, 83], alpha: 0.14, x: 35, y: 45 },
      ],
    },
  ];

  // flatten a palette into numbers so two palettes can be blended in one loop
  const flatten = (p: Palette) => [
    ...p.base,
    ...p.glows.flatMap((g) => [...g.rgb, g.alpha, g.x, g.y]),
  ];
  const flat = palettes.map(flatten);

  let root: HTMLDivElement;
  let current = flat[0].slice();
  let target = flat[0].slice();
  let raf = 0;
  let detach: (() => void) | undefined;

  const smoothstep = (t: number) => t * t * (3 - 2 * t);

  // where are we between two sections? returns a fractional section index
  function sectionPosition(container: HTMLElement) {
    const tops = ids.map((id) => document.getElementById(id)?.offsetTop ?? 0);
    const y = container.scrollTop;
    for (let i = 0; i < tops.length - 1; i++) {
      if (y < tops[i + 1]) {
        const span = tops[i + 1] - tops[i] || 1;
        return i + Math.max(0, (y - tops[i]) / span);
      }
    }
    return tops.length - 1;
  }

  function updateTarget(container: HTMLElement) {
    const pos = sectionPosition(container);
    const i = Math.min(Math.floor(pos), flat.length - 1);
    const j = Math.min(i + 1, flat.length - 1);
    const t = smoothstep(pos - i);
    target = flat[i].map((v, k) => v + (flat[j][k] - v) * t);
    if (!raf) raf = requestAnimationFrame(tick);
  }

  // the base color plus each glow's color and position, as an inline style
  function styleFor(v: number[]) {
    let css = `background-color: rgb(${v[0]} ${v[1]} ${v[2]});`;
    for (let n = 0; n < 3; n++) {
      const [r, g, b, a, x, y] = v.slice(3 + n * 6, 9 + n * 6);
      css += ` --g${n}: rgb(${r} ${g} ${b} / ${a}); --x${n}: ${x}vw; --y${n}: ${y}vh;`;
    }
    return css;
  }

  function apply() {
    root.style.cssText = styleFor(current);
  }

  // ease the displayed colors toward the scroll target so even fast
  // nav-button jumps glide instead of popping
  function tick() {
    let moving = false;
    current = current.map((v, k) => {
      const d = target[k] - v;
      if (Math.abs(d) > 0.001) moving = true;
      return v + d * 0.08;
    });
    apply();
    raf = moving ? requestAnimationFrame(tick) : 0;
  }

  // the container is bound by the parent after this component mounts
  $: if (scrollContainer && root && !detach) {
    const container = scrollContainer;
    const onScroll = () => updateTarget(container);
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    detach = () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }

  onDestroy(() => {
    detach?.();
    // onDestroy also runs during prerendering, where there is no window
    if (raf) cancelAnimationFrame(raf);
  });
</script>

<!-- start on the home palette so the prerendered page already has its glows -->
<div bind:this={root} class="ambient fixed inset-0 pointer-events-none z-0" style={styleFor(flat[0])} aria-hidden="true">
  <div class="glow" style="--i: 0; background: radial-gradient(circle, var(--g0), transparent 65%); --x: var(--x0); --y: var(--y0);"></div>
  <div class="glow" style="--i: 1; background: radial-gradient(circle, var(--g1), transparent 65%); --x: var(--x1); --y: var(--y1);"></div>
  <div class="glow" style="--i: 2; background: radial-gradient(circle, var(--g2), transparent 65%); --x: var(--x2); --y: var(--y2);"></div>
  <div class="vignette"></div>
</div>

<style>
  .ambient {
    overflow: hidden;
  }
  .glow {
    position: absolute;
    left: 0;
    top: 0;
    width: 90vmax;
    height: 90vmax;
    transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%));
    will-change: transform, translate;
    /* slow idle drift on top of the scroll-driven position so it feels alive */
    animation: drift 22s ease-in-out infinite alternate;
    animation-delay: calc(var(--i) * -7s);
  }
  @keyframes drift {
    from {
      translate: -3vw -2vh;
    }
    to {
      translate: 3vw 2vh;
    }
  }
  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / 0.35));
  }
  @media (prefers-reduced-motion: reduce) {
    .glow {
      animation: none;
    }
  }
</style>
