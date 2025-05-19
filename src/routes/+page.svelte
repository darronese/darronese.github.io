<!--
12 columns for desktop
8 columns for tablet
4 columns for mobile

TODO:
ADD SOMETHING TO RESUME AREA
ADD BETTER ANIMATIONS
-->
<script lang="ts">
import Fa from "svelte-fa";
import { onMount } from 'svelte';

import { createAnimatable, utils } from 'animejs';

// import new components as pages
import Home from '$lib/home.svelte'
import Projects from '$lib/projects.svelte'
import About from '$lib/about.svelte'
import Resume from '$lib/resume.svelte'

// FONT AWESOME
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// lottie animation
import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

// smooth scrolling function (from google ai: adjusted)
let scrollContainer: HTMLDivElement;


function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section && scrollContainer) {
    scrollContainer.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  }
}

// animated progress bar
let progress = 0;
onMount(() => {
  scrollContainer.addEventListener('scroll', () => {
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    progress = (scrollContainer.scrollTop / maxScroll) * 100;
  })
});

let activeSection = 'Home';

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
      threshold: 0.3,
    }
  );
  ['Home', 'Projects', 'Resume', 'About'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
});


// Animate the transforms properties of .car the motion path values
onMount(() => {

})
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
</style>

<!-- https://tailwindcss.com/docs/responsive-design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- MENU -->
<div class="breadcrumbs text-sm fixed mx-auto inset-x-0 z-2 backdrop-blur-xs">
  <div class="w-90 mx-auto relative">
    <progress class="progress custom-progress w-full" value={progress} max="100"></progress>
    <div
      class="absolute -top-8 pointer-events-none select-none transform -translate-x-1/2"
      style="left: {pointerLeft};"
    >
      <div class="w-12 h-20">
        <DotLottieSvelte src="/totoro.lottie" autoplay loop />
      </div>
    </div>
  </div>
  <ul class="justify-center">
    <li>
      <a on:click={() => scrollToSection('Home')} class="hover:underline"
        class:selected={activeSection === 'Home'}
        class:text-[#c14953]={activeSection === 'Home'}
      >
        <Fa icon={faHome}/>
        <span class="font-bold"> home </span>
      </a>
    </li>
    <li>
      <a on:click={() => scrollToSection('About')} class="hover:underline"
        class:selected={activeSection === 'About'}
        class:text-[#c14953]={activeSection === 'About'}
      >
        <Fa icon={faCircleInfo}/>
        <span class="font-bold"> about </span>
      </a>
    </li>
    <li>
      <a on:click={() => scrollToSection('Projects')} class="hover:underline"
        class:selected={activeSection === 'Projects'}
        class:text-[#c14953]={activeSection === 'Projects'}
      >
        <Fa icon={faFolder}/>
        <span class="font-bold"> projects </span>
      </a>
    </li>
    <li>
      <a on:click={() => scrollToSection('Resume')} class="hover:underline"
        class:selected={activeSection === 'Resume'}
        class:text-[#c14953]={activeSection === 'Resume'}
      >
        <Fa icon={faFile}/>
        <span class="font-bold"> resume </span>
      </a>
    </li>
  </ul>
</div>

<!-- PAGES -->
<div bind:this={scrollContainer} class="content h-screen overflow-y-scroll snap-y snap-proximity">
  <section id="Home" class="snap-start min-h-screen">
    <Home />
  </section>
  <section id="About" class="snap-start min-h-screen">
    <About />
  </section>
  <section id="Projects" class="snap-start min-h-screen">
    <Projects scrollContainer={scrollContainer}/>
  </section>
  <section id="Resume" class="snap-start min-h-screen">
    <Resume />
  </section>
</div>
