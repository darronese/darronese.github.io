<script lang="ts">
import Fa from "svelte-fa";
import { onMount } from 'svelte';
// FONT AWESOME
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { animate, stagger } from 'animejs';
import { initColorLinks } from '$lib/components/colorscript.svelte';
onMount(() => {
  initColorLinks();

  animate('.initial', {
    x: ['-60rem', '0rem'],
    delay: stagger(100),
    duration: stagger(100, { start: 500 }),
    easing: 'ease-out',
    fill: 'forwards' 
  });
}); 
</script>

<section id="Home">
  <div class="flex flex-col sm:flex-row items-center gap-y-6 p-8">
    <div class="basis-auto sm:basis-2/3 p-6 text-center">
      <h1 class="initial font-bold text-7xl sm:text-9xl text-[#E5DCC5] pt-12 sm:pt-28">darron li</h1>
      <dl class="font-normal text-[#848fa5]">
        <dt class="initial italic"> <span class="underline">aspiring</span> <span class="underline">software</span> <span class="underline">engineer</span> </dt>
        <dt class = "initial italic"> <span class="line-through">self proclaimed</span> <span class="underline">professional</span> <span class="underline">musician</span> </dt>
      </dl>
      <div class="p-4">
        <a href="https://github.com/darronese" class="initial btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faGithub}/>
        </a>
        <a href="https://www.linkedin.com/in/darronese/" class="initial btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faLinkedin}/>
        </a>
        <a href="mailto:darronese@outlook.com" class="initial btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faEnvelope}/>
        </a>
      </div>
    </div>
    <div class="object-contain basis-1/6 w-48 sm:w-84 sm:basis-1/4 p-4 sm:pt-30">
      <img class="rounded-lg" src="/portrait.png" alt="Portrait of Me!"/>
      <p class="text-center p-4 italic">
        "<span class="underline">How</span> does one make <span class="underline">portfolio</span> sites not <span class="underline">boring</span>?"
      </p>
    </div>

  </div>
</section>
