<!--
  Horizontal carousel shared by the projects and music sections.
  The track is moved with a transform instead of native scrolling, so every way of
  navigating (drag, swipe, trackpad, arrows, dots, keys, goTo() from the parent)
  ends in the same animated snap onto an item.

  Usage: each direct child of the default slot is one item.
    <Carousel bind:this={c} bind:activeIndex labels={names} ariaLabel="projects">
      {#each items as item}<div class="shrink-0 w-64">...</div>{/each}
    </Carousel>
-->
<script lang="ts">
import { onMount } from 'svelte';
import { animate } from 'animejs';
import Fa from 'svelte-fa';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// one label per item, used for the dots and screen readers
export let labels: string[];
export let ariaLabel: string;
export let activeIndex = 0;
// classes for the flex row holding the items (gap etc.)
export let trackClass = 'gap-6';

let viewport: HTMLDivElement;
let track: HTMLDivElement;
let reducedMotion = false;
const pos = { x: 0 };
let slide: ReturnType<typeof animate> | null = null;

function render() {
  track.style.transform = `translate3d(${pos.x}px, 0, 0)`;
}

// x offset that centers item i in the viewport
function targetX(i: number) {
  const item = track.children[i] as HTMLElement;
  return -(item.offsetLeft - (viewport.clientWidth - item.offsetWidth) / 2);
}

export function goTo(i: number, instant = false) {
  if (!track || labels.length === 0) return;
  activeIndex = Math.max(0, Math.min(labels.length - 1, i));
  slide?.pause();
  if (instant || reducedMotion) {
    pos.x = targetX(activeIndex);
    render();
    return;
  }
  slide = animate(pos, {
    x: targetX(activeIndex),
    duration: 650,
    ease: 'outBack(1.1)',
    onUpdate: render,
  });
}

// drag / swipe
const DRAG_THRESHOLD = 6;
let pointerId: number | null = null;
let startX = 0;
let startY = 0;
let startPos = 0;
let lastX = 0;
let lastTime = 0;
let velocity = 0;
let dragging = false;
let suppressClick = false;

function onPointerDown(e: PointerEvent) {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  pointerId = e.pointerId;
  startX = lastX = e.clientX;
  startY = e.clientY;
  lastTime = e.timeStamp;
  velocity = 0;
  slide?.pause();
  startPos = pos.x;
  dragging = false;
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerId !== pointerId) return;
  const dx = e.clientX - startX;
  if (!dragging) {
    if (Math.abs(dx) < DRAG_THRESHOLD || Math.abs(dx) < Math.abs(e.clientY - startY)) return;
    // only capture once it's clearly a horizontal drag, so plain clicks on items still work
    dragging = true;
    viewport.setPointerCapture(e.pointerId);
  }
  const dt = e.timeStamp - lastTime;
  if (dt > 0) velocity = (e.clientX - lastX) / dt;
  lastX = e.clientX;
  lastTime = e.timeStamp;

  // rubber-band past the first and last item
  const min = targetX(labels.length - 1);
  const max = targetX(0);
  let next = startPos + dx;
  if (next > max) next = max + (next - max) * 0.3;
  if (next < min) next = min + (next - min) * 0.3;
  pos.x = next;
  render();
}

function onPointerUp(e: PointerEvent) {
  if (e.pointerId !== pointerId) return;
  pointerId = null;
  if (!dragging) {
    // a tap that interrupted a slide should still land on an item
    goTo(activeIndex);
    return;
  }
  dragging = false;
  suppressClick = true;
  const dx = e.clientX - startX;
  const item = track.children[activeIndex] as HTMLElement;
  // a quick flick moves one item; a long drag moves as many items as it covered
  const step = item.offsetWidth;
  const moved = Math.round(-dx / step);
  if (moved !== 0) goTo(activeIndex + moved);
  else if (velocity < -0.4 || dx < -step / 4) goTo(activeIndex + 1);
  else if (velocity > 0.4 || dx > step / 4) goTo(activeIndex - 1);
  else goTo(activeIndex);
}

// a drag that ends over a link or button shouldn't also click it
function onClickCapture(e: MouseEvent) {
  if (suppressClick) {
    e.preventDefault();
    e.stopPropagation();
    suppressClick = false;
  }
}

// trackpad sideways swipes / shift+wheel move one item per gesture
let wheelLocked = false;
function onWheel(e: WheelEvent) {
  const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
  if (dx === 0) return;
  e.preventDefault();
  if (wheelLocked || Math.abs(dx) < 4) return;
  wheelLocked = true;
  goTo(activeIndex + Math.sign(dx));
  setTimeout(() => (wheelLocked = false), 450);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeIndex + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeIndex - 1); }
}

onMount(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  goTo(activeIndex, true);
  const onResize = () => goTo(activeIndex, true);
  window.addEventListener('resize', onResize);
  // wheel needs a non-passive listener to stop the page from scrolling sideways
  viewport.addEventListener('wheel', onWheel, { passive: false });
  return () => {
    slide?.pause();
    window.removeEventListener('resize', onResize);
    viewport.removeEventListener('wheel', onWheel);
  };
});
</script>

<div class="w-full flex flex-col items-center gap-4">
  <!-- focusable so keyboard users can move it with the arrow keys -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
  <div
    bind:this={viewport}
    class="carousel-viewport w-full overflow-hidden py-6 cursor-grab active:cursor-grabbing select-none"
    role="region"
    aria-roledescription="carousel"
    aria-label={ariaLabel}
    tabindex="0"
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
    on:pointercancel={onPointerUp}
    on:keydown={onKeydown}
    on:click|capture={onClickCapture}
  >
    <div bind:this={track} class="relative flex will-change-transform {trackClass}">
      <slot />
    </div>
  </div>

  {#if labels.length > 1}
    <div class="flex items-center gap-4">
      <button
        type="button"
        class="btn btn-circle btn-sm bg-[#4c4c47] hover:bg-[#c14953] border-none"
        aria-label="previous"
        disabled={activeIndex === 0}
        on:click={() => goTo(activeIndex - 1)}
      ><Fa icon={faChevronLeft}/></button>
      <!-- too many dots to fit on a phone; arrows and swiping still work there -->
      <div class="gap-2 {labels.length > 8 ? 'hidden sm:flex' : 'flex'}">
        {#each labels as label, i}
          <button
            type="button"
            class="h-2 rounded-full transition-all duration-300"
            class:w-6={i === activeIndex}
            class:w-2={i !== activeIndex}
            class:bg-[#c14953]={i === activeIndex}
            class:bg-[#4c4c47]={i !== activeIndex}
            aria-label="go to {label}"
            aria-current={i === activeIndex ? 'true' : undefined}
            on:click={() => goTo(i)}
          ></button>
        {/each}
      </div>
      <button
        type="button"
        class="btn btn-circle btn-sm bg-[#4c4c47] hover:bg-[#c14953] border-none"
        aria-label="next"
        disabled={activeIndex === labels.length - 1}
        on:click={() => goTo(activeIndex + 1)}
      ><Fa icon={faChevronRight}/></button>
    </div>
  {/if}
</div>

<style>
  .carousel-viewport {
    /* vertical swipes still scroll the page; horizontal ones drive the carousel */
    touch-action: pan-y;
    mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  }
  .carousel-viewport :global(img) {
    -webkit-user-drag: none;
  }
</style>
