<script lang="ts">
import { onMount } from 'svelte';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Fa from "svelte-fa";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

export let scrollContainer: HTMLDivElement;
onMount(() => {
});

</script>

<div class="flex flex-col sm:flex-row items-center gap-y-6">
  <!-- TITLE -->
  <div class="basis-auto sm:basis-2/3 p-6 text-center">
    <h1 class="font-bold text-7xl text-[#E5DCC5] pt-12 sm:pt-30">projects</h1>
  </div>

  <!-- PROJECTS BOX -->
  <div class="sm:pt-30 p-4 sm:pr-10">
    <!-- DAISY UI LIST -->
    <ul class="list sm:basis-1/3 bg-[#4c4c47] rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Definitely Finished Projects</li>
      <li class="list-row">
        <div>
          <img class="size-10 rounded-box" src="/projects/bus.png" alt="Home screen of dark ship"/></div>
        <div>
          <div>PT-Better-Beacon</div>
          <div class="pt-2">
            <div class="badge badge-outline bg-[#4953c1]">React Native</div>
            <div class="badge badge-outline bg-[#49c1b7]">NodeJS</div>
            <div class="badge badge-outline bg-[#c1a349]">In Progress</div>
          </div>
        </div>
        <!-- description -->
        <p class="list-col-wrap text-xs pr-10">
          A revised and more efficient Pullman transit real-time bus tracking app with WebSockets!
        </p>
        <!-- buttons -->
        <a href="https://github.com/darronese/pt-better-beacon" class="btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faGithub}/>
        </a>
        <a href="" class="btn btn-disabled bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faPlay}/>
        </a>
      </li>
      <li class="list-row">
        <div>
          <img class="size-10 rounded-box" src="/projects/stack.png" alt="Home screen of dark ship"/></div>
        <div>
          <div>Postscript Interpreter</div>
          <div class="pt-2">
            <div class="badge badge-outline bg-[#c17149]">Rust</div>
            <div class="badge badge-outline bg-[#7bc149]">Completed</div>
          </div>
        </div>
        <!-- description -->
        <p class="list-col-wrap text-xs pr-10">
          A postscript interpreter that is blazingly fast. Built with Rust!
        </p>
        <!-- buttons -->
        <a href="https://github.com/darronese/postscript" class="btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faGithub}/>
        </a>
        <a href="/postscript" class="btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faPlay}/>
        </a>
      </li>
      <li class="list-row">
        <div>
          <img class="size-10 rounded-box" src="/projects/game.png" alt="Home screen of dark ship"/></div>
        <div>
          <div>Dark Ship</div>
          <div class="pt-2">
            <div class="badge badge-outline bg-[#c149b7]">SFML</div>
            <div class="badge badge-outline bg-[#6749c1]">C++</div>
            <div class="badge badge-outline bg-[#7bc149]">Completed</div>
          </div>
        </div>
        <!-- description -->
        <p class="list-col-wrap text-xs pr-10">
          A dead by daylight/among-us inspired game. A fun experience using SFML!
        </p>
        <!-- buttons -->
        <a href="https://github.com/darronese/Dark-Ship" class="btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faGithub}/>
        </a>
        <a href="" class="btn btn-disabled bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
          <Fa icon={faPlay}/>
        </a>
      </li>
    </ul>
    <!-- COLLAPSABLE -->
    <div class="collapse">
      <input type="checkbox" />
      <div class="collapse-title font-semibold">
        Expand
      </div>
      <div class="collapse-content">
        <!-- DAISY UI LIST -->
        <ul class="list sm:basis-1/3 bg-[#4c4c47] rounded-box shadow-md">
          <li class="list-row">
            <div>
              <img class="size-10 rounded-box" src="/projects/game.png" alt="Home screen of dark ship"/></div>
            <div>
              <div>Dark Ship</div>
              <div class="pt-2">
                <div class="badge badge-outline bg-[#c149b7]">SFML</div>
                <div class="badge badge-outline bg-[#6749c1]">C++</div>
                <div class="badge badge-outline bg-[#7bc149]">Completed</div>
              </div>
            </div>
            <!-- description -->
            <p class="list-col-wrap text-xs pr-10">
              A dead by daylight/among-us inspired game. A fun experience using SFML!
            </p>
            <!-- buttons -->
            <a href="https://github.com/darronese/Dark-Ship" class="btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
              <Fa icon={faGithub}/>
            </a>
            <a href="" class="btn btn-disabled bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
              <Fa icon={faPlay}/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
