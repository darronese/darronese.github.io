<!--
12 columns for desktop
8 columns for tablet
4 columns for mobile
-->
<script lang="ts">
import Fa from "svelte-fa";
import { onMount } from 'svelte';

// import new components as pages
import MagicParticles from '$lib/components/particles.svelte'
import Cursor from '$lib/components/cursor.svelte'

// pages
import Home from '$lib/home.svelte'
import Projects from '$lib/projects.svelte'
import About from '$lib/about.svelte'
import Music from '$lib/music.svelte'
import { initColorLinks } from '$lib/components/colorscript.svelte';

// FONT AWESOME
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// lottie animation
import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

// animated section snapping + nav scrolling
import { createSectionSnap } from '$lib/sectionsnap';
let scrollContainer: HTMLDivElement;
let snapper: ReturnType<typeof createSectionSnap> | undefined;

function scrollToSection(id: string) {
  snapper?.scrollToSection(id);
}

// animated progress bar
let progress = 0;
// the totoro artwork faces backwards, so mirror it while scrolling down
// and show the original when scrolling back up
let facingForward = true;
let lastScrollTop = 0;
onMount(() => {
  // run once for the whole page instead of once per section
  initColorLinks();
  const onScroll = () => {
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    progress = maxScroll > 0 ? (scrollContainer.scrollTop / maxScroll) * 100 : 0;
    const delta = scrollContainer.scrollTop - lastScrollTop;
    // ignore tiny jitters so it doesn't flicker back and forth
    if (Math.abs(delta) > 2) {
      facingForward = delta > 0;
      lastScrollTop = scrollContainer.scrollTop;
    }
  };
  scrollContainer.addEventListener('scroll', onScroll, { passive: true });
  snapper = createSectionSnap(scrollContainer, sections.map((s) => s.id));
  return () => {
    scrollContainer.removeEventListener('scroll', onScroll);
    snapper?.destroy();
  };
});

let activeSection = 'Home';

const sections = [
  { id: 'Home', label: 'home', icon: faHome },
  { id: 'About', label: 'about', icon: faCircleInfo },
  { id: 'Projects', label: 'projects', icon: faFolder },
  { id: 'Music', label: 'music', icon: faMusic },
];

onMount(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection = entry.target.id;
        }
      }
    },
    {
      root: scrollContainer,
      // a section is "active" while it crosses the middle of the viewport,
      // so tall sections (taller than the screen on mobile) still register
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }
  );
  sections.forEach(({ id }) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
  return () => observer.disconnect();
});
// progress for totoro
$: pointerLeft = `${progress}%`;
</script>

<!-- change color of progress bar -->
<style>
progress.custom-progress::-webkit-progress-value {
  background-color: #c14953;
}
progress.custom-progress::-moz-progress-bar {
  background-color: #c14953;
}
.totoro {
  transition: scale 250ms ease-out;
}
.totoro.forward {
  scale: -1 1;
}
</style>

<svelte:head>
  <title>darron li</title>
  <meta name="description" content="Darron Li: software engineer. Projects, music, and about." />
</svelte:head>

<!-- PARTICLES BACKGROUND -->
<MagicParticles
  className="fixed inset-0 pointer-events-none z-1"
/>
<!-- Cursor -->
<Cursor gradientColor="#505050" gradientSize={300} gradientOpacity={0.1}>
  <!-- MENU -->
  <div class="breadcrumbs text-sm fixed mx-auto inset-x-0 z-10 backdrop-blur-xs">
    <div class="w-90 mx-auto relative">
      <progress class="progress custom-progress w-full" value={progress} max="100"></progress>
      <div
        class="absolute -top-8 pointer-events-none select-none transform -translate-x-1/2"
        style="left: {pointerLeft};"
      >
        <div class="totoro w-12 h-20" class:forward={facingForward}>
          <DotLottieSvelte src="/totoro.lottie" autoplay loop />
        </div>
      </div>
    </div>
    <ul class="justify-center">
      {#each sections as { id, label, icon }}
        <li>
          <button on:click={() => scrollToSection(id)} class="hover:underline"
            class:text-[#c14953]={activeSection === id}
            aria-current={activeSection === id ? 'true' : undefined}
          >
            <Fa {icon}/>
            <span class="font-bold"> {label} </span>
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <!-- PAGES -->
  <div bind:this={scrollContainer} class="content relative h-screen overflow-y-scroll z-2">
    <section id="Home" class="min-h-screen">
      <Home/>
    </section>
    <section id="About" class="min-h-screen">
      <About />
    </section>
    <section id="Projects" class="min-h-screen">
      <Projects scrollContainer={scrollContainer}/>
    </section>
    <section id="Music" class="min-h-screen">
      <Music scrollContainer={scrollContainer}/>
    </section>
  </div>
</Cursor>
