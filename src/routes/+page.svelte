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

// FLOWBITE
import { Avatar, Dropdown, DropdownHeader, DropdownItem, Tooltip } from "flowbite-svelte";
import { Button } from "flowbite-svelte";
import { Img } from "flowbite-svelte";  
import { BottomNav, BottomNavItem } from "flowbite-svelte";
</script>

<div class="flex flex-col sm:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 p-6 text-center">
    <h1 class="font-bold text-7xl text-[#E5DCC5] p-4 sm:pt-30">darron li</h1>
    <dl class="font-normal text-[#848fa5]">
      <dt class="italic"> aspring software engineer </dt>
      <dt class = "italic"> self proclaimed professional musician </dt>
    </dl>
    <div class="p-4">
      <Button href="https://github.com/darronese" class="text-[#C14953]" target="_blank" rel="noopener noreferrer">
        <Fa icon={faGithub}/>
      </Button>
      <Button href="https://www.linkedin.com/in/darronese/" class="text-[#C14953]" target="_blank" rel="noopener noreferrer">
        <Fa icon={faLinkedin}/>
      </Button>
      <Button href="mailto:darronese@outlook.com" class="text-[#C14953]" target="_blank" rel="noopener noreferrer">
        <Fa icon={faEnvelope}/>
      </Button>
    </div>
  </div>
  <div class="object-contain sm:basis-1/4 p-6 sm:pt-30">
    <Img class="rounded-lg" src="/temp.png" alt="Portrait of Me!"/>
  </div>

  <!-- 
BOTTOM NAVIGATION
-->
  <BottomNav position="absolute" innerClass="grid-cols-4 bg-[#4C4C47]">
    <BottomNavItem btnName="Home">
      <Fa icon={faHome}/>
    </BottomNavItem>
  </BottomNav>
</div>
