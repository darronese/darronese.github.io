<!--
a cursor buddy that trails just behind the pointer, picked with the buttonsin the bottom-left corner
every style shares the same behavior: it trails the pointer, an inverting lens appears over links, and it shrinks a little on click
what makes each style different lives in CURSORS below
-->
<script lang="ts">
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
  import { INTERACTIVE } from "$lib/utils";

  type Cursor = {
    id: string;
    label: string;
    // picture for its button in the corner (none: a plain arrow icon)
    icon?: string;
    // picture that trails the pointer (none: styled with css only)
    image?: string;
    // global css class of a one-off animation played where you click
    clickEffect?: string;
    // shown next to the buttons while it's picked, when the art's license asks for it
    credit?: { text: string; href: string };
    // just the system cursor, no buddy
    off?: boolean;
  };

  // to add a cursor: give it an entry here, plus a `.follower.<id>` style below.
  // sources:
  // - portal 2 icon: Valve's art, via https://www.nicepng.com/ourpic/u2q8a9w7a9y3u2t4_portal-2-logo-png/
  //   (background removed). the official logo it comes from is public domain on
  //   wikimedia commons: https://commons.wikimedia.org/wiki/File:Portal_2_Official_Logo.png
  // - millennium eye: Exnihilo Prints, CC BY-NC,
  //   https://www.printables.com/model/680077-millennium-eye
  const CURSORS: Cursor[] = [
    {
      id: "portal",
      label: "portal",
      icon: "/cursors/portal-2.png",
      clickEffect: "orange-portal",
    },
    {
      id: "eye",
      label: "millennium eye",
      icon: "/cursors/millennium-eye.png",
      image: "/cursors/millennium-eye.png",
      clickEffect: "eye-flash",
      credit: {
        text: "Exnihilo Prints (CC BY-NC)",
        href: "https://www.printables.com/model/680077-millennium-eye",
      },
    },
    { id: "normal", label: "normal", off: true },
  ];

  let selected = CURSORS[0];
  let enabled = false;
  let visible = false;
  let hovering = false;
  let pressed = false;

  let follower: HTMLDivElement;
  let lens: HTMLDivElement;
  let effects: HTMLDivElement;

  function choose(cursor: Cursor) {
    selected = cursor;
    try {
      localStorage.setItem("cursor-type", cursor.id);
    } catch {
      // storage can be blocked; the choice just won't be remembered
    }
  }

  // a one-off animation at the click point, removed once its css animation ends
  function spawnEffect(className: string, x: number, y: number) {
    const el = document.createElement("div");
    el.className = className;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.addEventListener("animationend", () => el.remove());
    effects.appendChild(el);
  }

  onMount(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    enabled = true;
    try {
      const saved = CURSORS.find((c) => c.id === localStorage.getItem("cursor-type"));
      if (saved) selected = saved;
    } catch {
      // keep the default
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // how much of the gap to the pointer it closes every 1/60s
    const follow = reducedMotion ? 1 : 0.3;
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let lastFrame = 0;

    function frame(now: number) {
      // scaled by the time since the last frame, so it trails the same on 60hz and 144hz screens
      const frames = lastFrame ? (now - lastFrame) / (1000 / 60) : 1;
      const k = 1 - Math.pow(1 - follow, frames);
      lastFrame = now;
      pos.x += (mouse.x - pos.x) * k;
      pos.y += (mouse.y - pos.y) * k;
      // `translate` instead of `transform` so the hover/click `scale` stays centered
      const translate = `calc(${pos.x}px - 50%) calc(${pos.y}px - 50%)`;
      follower.style.translate = translate;
      lens.style.translate = translate;
      // keep going until it catches up, then rest until the mouse moves again
      const moving = Math.abs(mouse.x - pos.x) + Math.abs(mouse.y - pos.y) > 0.5;
      raf = moving ? requestAnimationFrame(frame) : 0;
      if (!moving) lastFrame = 0;
    }

    function onMove(e: PointerEvent) {
      if (selected.off) return;
      // touchscreen laptops count as having a mouse too; only follow real mouse movement
      if (e.pointerType !== "mouse") return hide();
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // appear at the pointer instead of sliding in from where it was last seen
      if (!visible) {
        pos.x = mouse.x;
        pos.y = mouse.y;
      }
      visible = true;
      hovering = !!(e.target as Element).closest(INTERACTIVE);
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function onDown(e: PointerEvent) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      pressed = true;
      if (selected.clickEffect && !reducedMotion) {
        spawnEffect(selected.clickEffect, e.clientX, e.clientY);
      }
    }

    function hide() {
      visible = false;
      pressed = false;
    }

    // embeds like the spotify player swallow mouse events, so hide on the way in
    // instead of freezing at their edge
    function onOut(e: MouseEvent) {
      if (e.relatedTarget instanceof HTMLIFrameElement) hide();
    }

    // scrolling moves the page under a still mouse, so recheck what's under it
    function onScroll() {
      if (visible) hovering = !!document.elementFromPoint(mouse.x, mouse.y)?.closest(INTERACTIVE);
    }

    const onUp = () => (pressed = false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("mouseout", onOut);
    // capture, since scroll events from the page's scroll container don't bubble
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("mouseleave", hide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("blur", hide);
      document.removeEventListener("mouseleave", hide);
    };
  });
</script>

{#if enabled}
  <div class="fixed bottom-4 left-4 z-50 flex items-center gap-2 text-xs text-[#e5dcc5]">
    <div class="flex items-center gap-1 bg-[#2d2d2a]/90 rounded p-1" role="group" aria-label="cursor style">
      <span class="opacity-60 px-1">cursor</span>
      {#each CURSORS as cursor (cursor.id)}
        <button
          type="button"
          class="option w-7 h-7 flex items-center justify-center rounded"
          class:active={cursor === selected}
          title={cursor.label}
          aria-label="{cursor.label} cursor"
          aria-pressed={cursor === selected}
          on:click={() => choose(cursor)}
        >
          {#if cursor.icon}
            <img src={cursor.icon} alt="" class="w-5 h-5" draggable="false" />
          {:else}
            <Fa icon={faArrowPointer} />
          {/if}
        </button>
      {/each}
      <span class="px-1">{selected.label}</span>
    </div>
    {#if selected.credit}
      <a class="opacity-60 hover:underline" href={selected.credit.href} target="_blank" rel="noopener noreferrer">
        art: {selected.credit.text}
      </a>
    {/if}
  </div>
{/if}

<div bind:this={effects} aria-hidden="true"></div>
<!-- the lens sits on its own at the top level: inside a positioned wrapper its
     blend mode would only blend with the wrapper, not the page -->
<div
  bind:this={lens}
  class="lens"
  class:hidden={!enabled || selected.off}
  class:visible
  class:hovering
  class:pressed
  aria-hidden="true"
></div>
<div
  bind:this={follower}
  class="follower {selected.id}"
  class:hidden={!enabled || selected.off}
  class:visible
  class:hovering
  class:pressed
  aria-hidden="true"
>
  {#if selected.image}
    <img src={selected.image} alt="" draggable="false" />
  {/if}
</div>

<style>
  /* corner picker: the picked style is lit, the others dimmed */
  .option {
    opacity: 0.45;
    transition:
      opacity 150ms,
      background-color 150ms;
  }
  .option:hover {
    opacity: 0.8;
  }
  .option.active {
    opacity: 1;
    background-color: #4c4c47;
  }

  /* shared by every cursor */
  .follower,
  .lens {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    pointer-events: none;
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    opacity: 0;
    transition:
      opacity 200ms,
      width 200ms ease-out,
      height 200ms ease-out,
      background-color 200ms,
      filter 200ms,
      scale 120ms;
  }
  .visible {
    opacity: 1;
  }
  .pressed {
    scale: 0.85;
  }
  .follower img {
    width: 100%;
    height: 100%;
  }
  /* over links a lens appears that inverts what's under it */
  .lens {
    mix-blend-mode: difference;
  }
  .lens.hovering {
    width: 46px;
    height: 46px;
    background-color: #e5dcc5;
  }

  /* portal: blue ring with a bright streak swirling around the rim */
  .follower.portal {
    border: 2px solid #3aa0ff;
    box-shadow:
      0 0 8px 1px rgb(58 160 255 / 0.7),
      inset 0 0 6px rgb(58 160 255 / 0.5);
  }
  .follower.portal::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(transparent 0 55%, #d6ecff 78%, transparent 92%);
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2.5px));
    animation: swirl 1.4s linear infinite;
  }
  /* the ring grows to frame the lens */
  .follower.portal.hovering {
    width: 46px;
    height: 46px;
  }

  /* eye: sits beside the arrow so it never covers what you're clicking */
  .follower.eye {
    margin: 20px 0 0 20px;
    filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.5));
  }
  .follower.eye.hovering {
    scale: 1.2;
    filter: drop-shadow(0 0 6px rgb(255 210 120 / 0.9));
  }
  /* still shrink on click while hovering (this beats the hover scale above) */
  .follower.eye.hovering.pressed {
    scale: 1;
  }

  /* click effects */
  :global(.orange-portal),
  :global(.eye-flash) {
    position: fixed;
    z-index: 99;
    pointer-events: none;
    border-radius: 50%;
    translate: -50% -50%;
  }
  /* a tall orange oval, like the exit portal in the game */
  :global(.orange-portal) {
    width: 24px;
    height: 38px;
    border: 2px solid #ff9a2e;
    box-shadow:
      0 0 10px 2px rgb(255 154 46 / 0.7),
      inset 0 0 8px rgb(255 154 46 / 0.6);
    animation: portal-open 800ms ease-out forwards;
  }
  /* a golden ring of light spreading out from the click */
  :global(.eye-flash) {
    width: 60px;
    height: 60px;
    border: 2px solid #f6d77e;
    box-shadow: 0 0 12px 2px rgb(246 215 126 / 0.7);
    animation: eye-flash 500ms ease-out forwards;
  }

  @keyframes swirl {
    to {
      rotate: 360deg;
    }
  }
  @keyframes -global-portal-open {
    0% {
      scale: 0.1 0.4;
      opacity: 0;
    }
    20%,
    65% {
      scale: 1;
      opacity: 1;
    }
    100% {
      scale: 0.1 0.4;
      opacity: 0;
    }
  }
  @keyframes -global-eye-flash {
    from {
      scale: 0.2;
      opacity: 1;
    }
    to {
      scale: 1;
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .follower.portal::before {
      animation: none;
    }
  }
</style>
