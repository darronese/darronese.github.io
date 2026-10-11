<script lang="ts">
import { onMount } from 'svelte';
import { animate, stagger } from 'animejs';
import Carousel from '$lib/components/carousel.svelte';
import { albums } from '$lib/data/music';
import Stone from '$lib/components/stone.svelte';

export let scrollContainer: HTMLDivElement;

// the record in the middle of the carousel is pulled out and plays below
let carousel: Carousel;
let activeIndex = 0;
let reducedMotion = false;

// wait for the carousel to settle before swapping the player, so a fast swipe
// across several records doesn't reload the spotify embed for each one
let playing = 0;
let playTimer: ReturnType<typeof setTimeout> | undefined;
$: {
  clearTimeout(playTimer);
  const next = activeIndex;
  playTimer = setTimeout(() => (playing = next), 400);
}

onMount(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return () => clearTimeout(playTimer);

  const section = document.getElementById('Music');
  if (!section) return;
  // records drop onto the shelf the first time the section comes into view
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate('.record', {
            opacity: [0, 1],
            translateY: [-40, 0],
            delay: stagger(80),
            duration: 600,
            ease: 'outBounce',
          });
          observer.unobserve(section);
        }
      }
    },
    { root: scrollContainer, threshold: 0.2 }
  );
  observer.observe(section);
  return () => {
    clearTimeout(playTimer);
    observer.disconnect();
  };
});
</script>

<div class="flex flex-col items-center gap-y-6 px-4 pb-24">
  <!-- TITLE -->
  <div class="basis-auto p-6 text-center">
    <h1 class="font-bold text-6xl sm:text-8xl text-[#E5DCC5] pt-12 sm:pt-30">music</h1>
    <p class="text-center italic p-6">albums I keep on <span class="underline">repeat</span> <Stone id="soul" /></p>
  </div>

  <!-- RECORD SHELF -->
  <div class="w-full max-w-5xl">
    <Carousel
      bind:this={carousel}
      bind:activeIndex
      labels={albums.map((a) => `${a.title} by ${a.artist}`)}
      ariaLabel="albums"
      trackClass="gap-4 sm:gap-8 items-end"
    >
      {#each albums as album, i (album.spotifyId)}
        <button
          type="button"
          class="record shrink-0 w-40 sm:w-52 pt-16 sm:pt-20 text-left focus:outline-none"
          class:opacity-0={!reducedMotion}
          class:active={i === activeIndex}
          aria-pressed={i === activeIndex}
          aria-label="{album.title} by {album.artist}"
          on:click={() => carousel.goTo(i)}
        >
          <div class="tilt">
            <div class="relative aspect-square">
              <!-- vinyl: peeks out on hover, slides all the way up (and spins) when centered -->
              <div class="vinyl absolute inset-[4%] rounded-full">
                <img class="label absolute inset-[34%] rounded-full object-cover" src={album.cover} alt="" draggable="false" />
              </div>
              <img
                class="sleeve relative rounded-md shadow-lg w-full h-full object-cover"
                src={album.cover}
                alt=""
                draggable="false"
              />
            </div>
            <div class="pt-2 text-xs leading-snug">
              <div class="font-bold text-[#E5DCC5] line-clamp-2" title={album.title}>{album.title}</div>
              <div class="opacity-60">{album.artist} · {album.year}</div>
            </div>
          </div>
        </button>
      {/each}
    </Carousel>
  </div>

  <!-- NOW PLAYING -->
  <div class="w-full max-w-2xl">
    {#if albums[playing].note}
      <p class="text-center italic pb-3">"{albums[playing].note}"</p>
    {/if}
    {#key playing}
      <iframe
        title="Spotify player: {albums[playing].title} by {albums[playing].artist}"
        class="w-full rounded-xl"
        src="https://open.spotify.com/embed/album/{albums[playing].spotifyId}?utm_source=generator&theme=0"
        height="352"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    {/key}
  </div>
</div>

<style>
  .vinyl {
    background: #111;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.5);
    transition: transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  /* grooves on top of the black base */
  .vinyl::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: repeating-radial-gradient(circle, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 4px);
  }
  /* spindle hole */
  .vinyl::after {
    content: '';
    position: absolute;
    inset: 48.5%;
    border-radius: 9999px;
    background: #262626;
  }
  /* records away from the center shrink and fade, coverflow style */
  .tilt {
    transform-origin: bottom center;
    transform: scale(0.82);
    opacity: 0.55;
    transition: transform 400ms ease-out, opacity 400ms ease-out;
  }
  .record.active .tilt {
    transform: scale(1);
    opacity: 1;
  }
  .sleeve {
    transition: transform 300ms ease-out, box-shadow 300ms ease-out;
  }

  .record:hover .vinyl,
  .record:focus-visible .vinyl {
    transform: translateY(-28%);
  }
  .record:hover .sleeve,
  .record:focus-visible .sleeve {
    transform: translateY(-2px);
  }
  .record.active .vinyl {
    transform: translateY(-38%);
  }
  .record.active .label {
    animation: spin 3s linear infinite;
  }
  .record.active .sleeve {
    outline: 2px solid #c14953;
    outline-offset: 2px;
  }
  .record:focus-visible .sleeve {
    outline: 2px solid #e5dcc5;
    outline-offset: 2px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .vinyl,
    .tilt,
    .sleeve {
      transition: none;
    }
    .record.active .label {
      animation: none;
    }
  }
</style>
