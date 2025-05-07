<!--
12 columns for desktop
8 columns for tablet
4 columns for mobile
-->
<script>
import Fa from "svelte-fa";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="flex flex-col sm:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 p-6 text-center">
    <h1 class="font-bold text-7xl text-[#e64833] p-4 sm:pt-30">darron li</h1>
    <dl class="font-normal">
      <dt class="text-[#90aead] italic"> aspring software engineer </dt>
      <dt class = "text-[#90aead] italic"> self proclaimed professional musician </dt>
    </dl>
    <Fa icon={faGithub}/>
    <Fa icon={faLinkedin}/>
    <Fa icon={faEnvelope}/>
  </div>
  <div class="object-contain sm:basis-1/4 p-6 sm:pt-30">
    <img class="rounded-2xl" src="/temp.png"/>
  </div>
  <div>
  </div>
</div>
