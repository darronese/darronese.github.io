<!--
12 columns for desktop
8 columns for tablet
4 columns for mobile
-->
<script>
import Fa from "svelte-fa";
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
  <div class="object-contain sm:basis-1/4 p-6 sm:pt-30">
    <img class="rounded-lg" src="/temp.png" alt="Portrait of Me!"/>
  </div>

</div>
  <a> Projects</a>
