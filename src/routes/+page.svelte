<!--
12 columns for desktop
8 columns for tablet
4 columns for mobile
-->
<script>
import Fa from "svelte-fa";

// import new components as pages
import Projects from '$lib/projects.svelte'
import About from '$lib/about.svelte'
import Resume from '$lib/resume.svelte'
// FONT AWESOME
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
</script>

<!-- 
* https://visme.co/blog/website-color-schemes/
* CONSIDER THIS PALETTE SCHEME:
* #2D2D2a
* #4C4C47
* #848FA5
* #C14953
* #E5DCC5
-->

<!-- MENU -->
<div class="breadcrumbs text-sm">
  <ul class="justify-center pt-6">
    <li>
      <a>
        <Fa icon={faHome}/>
        home
      </a>
    </li>
    <li>
      <a class="">
        <Fa icon={faFolder}/>
        projects
      </a>
    </li>
    <li>
      <a class="">
        <Fa icon={faFile}/>
        resume
      </a>
    </li>
    <li>
      <a class="">
        <Fa icon={faCircleInfo}/>
        about
      </a>
    </li>
  </ul>
</div>

<!-- PAGES -->
<div class="flex flex-col sm:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 p-6 text-center">
    <h1 class="font-bold text-7xl text-[#E5DCC5] p-4 sm:pt-30">darron li</h1>
    <dl class="font-normal text-[#848fa5]">
      <dt class="italic"> aspring software engineer </dt>
      <dt class = "italic"> self proclaimed professional musician </dt>
    </dl>
    <div class="p-4">
      <a href="https://github.com/darronese" class="btn bg-[#c14953]" target="_blank" rel="noopener noreferrer">
        <Fa icon={faGithub}/>
      </a>
      <a href="https://www.linkedin.com/in/darronese/" class="btn bg-[#c14953]" target="_blank" rel="noopener noreferrer">
        <Fa icon={faLinkedin}/>
      </a>
      <a href="mailto:darronese@outlook.com" class="btn bg-[#c14953]" target="_blank" rel="noopener noreferrer">
        <Fa icon={faEnvelope}/>
      </a>
    </div>
  </div>
  <div class="object-contain basis-1/6 w-84 sm:basis-1/4 p-6 sm:pt-30">
    <img class="rounded-lg" src="/portrait.png" alt="Portrait of Me!"/>
  </div>

</div>

<section id="Projects">
  <Projects />
</section>
<section id="Resume">
  <Resume />
</section>
<section id="About">
  <About />
</section>
