<!--
a hidden infinity stone 
clicking it flies it into the gauntlet in the corner (the element with id="gauntlet-hud") and marks it collected.
-->
<script lang="ts">
  import { onMount } from "svelte";
  import { STONES, collected, collect, type StoneId } from "$lib/stones";

  export let id: StoneId;
  let className = "";
  export { className as class };

  const stone = STONES.find((s) => s.id === id)!;
  let button: HTMLButtonElement;
  let flying = false;
  // the prerendered page can't know which stones you've found, so stones only
  // appear once the page is running in your browser
  let mounted = false;
  onMount(() => (mounted = true));

  function pickUp() {
    if (flying) return;
    const target = document.getElementById("gauntlet-hud")?.getBoundingClientRect();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!target || reducedMotion) {
      collect(id);
      return;
    }
    flying = true;
    // fly a copy, so the page layout doesn't shift while it travels
    const from = button.getBoundingClientRect();
    const copy = button.cloneNode(true) as HTMLElement;
    copy.style.cssText = `position: fixed; left: ${from.left}px; top: ${from.top}px; width: ${from.width}px; height: ${from.height}px; margin: 0; z-index: 101; pointer-events: none;`;
    document.body.appendChild(copy);
    const dx = target.left + target.width / 2 - (from.left + from.width / 2);
    const dy = target.top + target.height / 2 - (from.top + from.height / 2);
    copy
      .animate(
        [
          { translate: "0 0", scale: 1 },
          // a little hop up first, so it arcs instead of sliding
          { translate: `${dx * 0.3}px ${dy * 0.3 - 60}px`, scale: 1.8, offset: 0.3 },
          { translate: `${dx}px ${dy}px`, scale: 0.6 },
        ],
        { duration: 750, easing: "ease-in-out" }
      )
      .finished.finally(() => {
        copy.remove();
        collect(id);
      });
  }
</script>

{#if mounted && !$collected.includes(id)}
  <button
    bind:this={button}
    type="button"
    class="stone {className}"
    class:invisible={flying}
    style="--stone: {stone.color}"
    aria-label="{stone.name} (a hidden collectible)"
    title="?"
    on:click|stopPropagation={pickUp}
  >
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <polygon points="10,1 18,6 18,14 10,19 2,14 2,6" fill="var(--stone)" />
      <polygon points="10,5 14,8 14,12 10,15 6,12 6,8" fill="rgb(255 255 255 / 0.3)" />
      <polygon points="10,1 18,6 14,8 10,5" fill="rgb(255 255 255 / 0.45)" />
    </svg>
  </button>
{/if}

<style>
  .stone {
    display: inline-block;
    width: 14px;
    height: 14px;
    padding: 0;
    vertical-align: middle;
    cursor: pointer;
    filter: drop-shadow(0 0 3px var(--stone));
    animation: shimmer 2.8s ease-in-out infinite;
    transition: scale 150ms;
  }
  .stone:hover,
  .stone:focus-visible {
    scale: 1.4;
    outline: none;
  }
  .stone svg {
    width: 100%;
    height: 100%;
  }
  /* a faint pulse: findable if you're looking, easy to miss if you're not */
  @keyframes shimmer {
    0%,
    100% {
      opacity: 0.55;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .stone {
      animation: none;
      opacity: 0.8;
    }
  }
</style>
