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
    <p class="text-center p-6 sm:pr-8"> "A mind needs books as a sword needs a whetstone, if it is to keep its edge."</p>
    <div class="chat chat-start">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/prime.png"
          />
        </div>
      </div>
      <div class="chat-header">
        Hiring Manager
        <time class="text-xs opacity-50">12:45</time>
      </div>
      <div class="chat-bubble bg-[#4c4c47]">What technologies have you used?</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/portrait.png"
          />
        </div>
      </div>
      <div class="chat-header">
        Humble, Awesome, Great, Smart, Guy
        <time class="text-xs opacity-50">12:46</time>
      </div>
      <div class="chat-bubble bg-[#4c4c47]">
        <button class="btn btn-soft bg-[#6749c1]">C/C++</button>
        <button class="btn btn-soft bg-[#c14953]">JavaScript</button>
        <button class="btn btn-soft bg-[#c17149]">Rust</button>
        <button class="btn btn-soft bg-[#adc149]">Python</button>
        <button class="btn btn-soft bg-[#7b49c1]">Haskell</button>
        <button class="btn btn-soft bg-[#4953c1]">React Native</button>
        <button class="btn btn-soft bg-[#49c1b7]">NodeJS</button>
        <button class="btn btn-soft bg-[#c14953]">Pytorch</button>
        <button class="btn btn-soft bg-[#c149b7]">SFML</button>
      </div>
      <div class="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  </div>

  <!-- PROJECTS BOX -->
  <div class="sm:pt-30 pl-4 pr-4 sm:pr-10">
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
              <img class="size-10 rounded-box" src="/projects/trophy.png" alt="Agathon"/></div>
            <div>
              <div>Agathon</div>
              <div class="pt-2">
                <div class="badge badge-outline bg-[#adc149]">Python</div>
                <div class="badge badge-outline bg-[#c14953]">Pytorch</div>
                <div class="badge badge-outline bg-[#7bc149]">Completed</div>
              </div>
            </div>
            <!-- description -->
            <p class="list-col-wrap text-xs pr-10">
              A machine learning model with Pytorch's Random Forest to predict future snowpack across Washington! <span class="line-through"> also won first place </span>
            </p>
            <!-- buttons -->
            <a href="https://github.com/mathletedev/agath0n" class="btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500" target="_blank" rel="noopener noreferrer">
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
