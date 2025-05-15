<!--
12 columns for desktop
8 columns for tablet
4 columns for mobile
-->
<script>
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
</script>

<!-- https://tailwindcss.com/docs/responsive-design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- MENU -->
<div class="breadcrumbs text-sm fixed mx-auto inset-x-0 z-2 backdrop-blur-xs">
  <ul class="justify-center pt-6">
    <li>
      <a href="#Home">
        <Fa icon={faHome}/>
        home
      </a>
    </li>
    <li>
      <a href="#Projects">
        <Fa icon={faFolder}/>
        projects
      </a>
    </li>
    <li>
      <a href="#Resume">
        <Fa icon={faFile}/>
        resume
      </a>
    </li>
    <li>
      <a href="#About">
        <Fa icon={faCircleInfo}/>
        about
      </a>
    </li>
  </ul>
</div>

<!-- PAGES -->
<section id="Home">
  <Home />
</section>
<section id="Projects">
  <Projects />
</section>
<section id="Resume">
  <Resume />
</section>
<section id="About">
  <About />
</section>
