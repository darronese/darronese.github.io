<!--
the gauntlet in the corner
it lights up each infinity stone as it's found, and once all six are in, clicking any empty space snaps: half the page turns to dust and the page reloads.
-->
<script lang="ts">
  import Gauntlet from "$lib/components/gauntlet.svelte";
  import { STONES, collected, complete, resetStones } from "$lib/stones";
  import { snap } from "$lib/snap";
  import { INTERACTIVE } from "$lib/utils";

  // the part of the page that turns to dust
  export let root: HTMLElement | undefined;

  // clicks on these do their normal job and never snap. the carousels are
  // dragged, and the spotify player is an embed, so they count too
  const NOT_EMPTY = `${INTERACTIVE}, iframe, .carousel-viewport`;

  let snapping = false;

  function onClick(e: MouseEvent) {
    if (!$complete || snapping || !root) return;
    if ((e.target as Element).closest(NOT_EMPTY)) return;
    // finishing a text selection also fires a click; don't snap on that
    if (!window.getSelection()?.isCollapsed) return;
    snapping = true;
    snap(root, () => {
      resetStones();
      location.reload();
    });
  }
</script>

<svelte:window on:click={onClick} />

<div
  id="gauntlet-hud"
  class="fixed bottom-4 right-4 z-50 pointer-events-none select-none flex flex-col items-end gap-1"
  aria-hidden="true"
>
  {#if $complete && !snapping}
    <span class="text-xs text-[#e5dcc5] bg-[#2d2d2a]/90 rounded px-2 py-1">click empty space to snap</span>
  {/if}
  <div class="glove w-14 h-14" class:charged={$complete}>
    <Gauntlet lit={$collected} />
  </div>
  <span class="text-xs text-[#e5dcc5] opacity-80 tabular-nums pr-1">{$collected.length}/{STONES.length}</span>
</div>
<p class="sr-only" aria-live="polite">
  {#if $complete}
    All six infinity stones collected. Click any empty space to snap.
  {:else if $collected.length}
    {$collected.length} of {STONES.length} infinity stones collected.
  {/if}
</p>

<style>
  .glove {
    filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.5));
  }
  /* all six stones in: the gauntlet pulses with power */
  .glove.charged {
    animation: charged 1.6s ease-in-out infinite;
  }
  @keyframes charged {
    0%,
    100% {
      filter: drop-shadow(0 0 3px rgb(255 210 120 / 0.5));
    }
    50% {
      filter: drop-shadow(0 0 10px rgb(255 210 120 / 0.95));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .glove.charged {
      animation: none;
      filter: drop-shadow(0 0 6px rgb(255 210 120 / 0.8));
    }
  }
</style>
