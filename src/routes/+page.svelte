<!--
12 columns for desktop
8 columns for tablet
4 columns for mobile
-->
<script lang="ts">
import Fa from "svelte-fa";

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

// smooth scrolling function (from google ai: adjusted)
let scrollContainer: HTMLDivElement;
function scrollToSection(id: string) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<!-- https://tailwindcss.com/docs/responsive-design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- MENU -->
<div class="breadcrumbs text-sm fixed mx-auto inset-x-0 z-2 backdrop-blur-xs">
  <ul class="justify-center pt-6">
    <li>
      <a on:click={() => scrollToSection('Home')} class="hover:underline decoration-[#c14153]">
        <Fa icon={faHome}/>
        <span class="font-bold"> home </span>
      </a>
    </li>
    <li>
      <a on:click={() => scrollToSection('Projects')} class="hover:underline decoration-[#c14153]">
        <Fa icon={faFolder}/>
        <span class="font-bold"> projects </span>
      </a>
    </li>
    <li>
      <a on:click={() => scrollToSection('Resume')} class="hover:underline decoration-[#c14153]">
        <Fa icon={faFile}/>
        <span class="font-bold"> resume </span>
      </a>
    </li>
    <li>
      <a on:click={() => scrollToSection('About')} class="hover:underline decoration-[#c14153]">
        <Fa icon={faCircleInfo}/>
        <span class="font-bold"> about </span>
      </a>
    </li>
  </ul>
</div>


<!-- PAGES -->
<div bind:this={scrollContainer} class="content h-screen overflow-y-scroll snap-y snap-proximity">
  <section id="Home" class="snap-start min-h-screen">
    <Home />
  </section>
  <section id="Projects" class="snap-start min-h-screen">
    <Projects scrollContainer={scrollContainer}/>
  </section>
  <section id="Resume" class="snap-start min-h-screen">
    <Resume />
  </section>
  <section id="About" class="snap-start min-h-screen">
    <About />
  </section>
</div>
