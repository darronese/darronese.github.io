<script lang="ts">
import { onMount } from 'svelte';
import Fa from "svelte-fa";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { createTimeline, onScroll} from 'animejs';

import { initColorLinks } from '$lib/components/colorscript.svelte';

export let scrollContainer: HTMLDivElement;
const debug = true;
const tl = createTimeline();

function runAnimations() {
  tl.set('.chat-start', { translateX: '-300%'});
  tl.set('.chat-end', { translateX: '-300%'});
  tl.add('.chat-start', {
    translateX: ['-100%', '0%'],
    duration: 500,
    easing: 'easeOutQuad'
  })
  .add('.chat-end', {
    translateX: ['100%', '0%'],
    duration: 500,
    easing: 'easeOutQuad'
  }, '+=500');
}

onMount(() => {
  initColorLinks();
  const section = document.getElementById('Projects');
  if (!section) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          runAnimations();
          // only run once
          observer.unobserve(section);
        }
      }
    },
    {
      root: scrollContainer,
      threshold: 0.3
    }
  );

  observer.observe(section);
});

</script>

<div class="flex flex-col items-center gap-y-6">
  <!-- TITLE -->
  <div class="basis-auto p-6 text-center">
    <h1 class="font-bold text-7xl sm:text-9xl text-[#E5DCC5] pt-12 sm:pt-30">projects</h1>
    <p class="text-center italic p-6 sm:pr-8"> "A mind needs books as a sword needs a whetstone, if it is to keep its edge."</p>
    <p class="text-center"> - <span class="underline">Tyrion</span> <span class="underline">Lannister</span>(ASOIAF)</p>
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
      <div class="chat-start chat-bubble bg-[#4c4c47]">What technologies have you used?</div>
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
      <div class="chat-end chat-bubble bg-[#4c4c47]">
        <button class="badge badge-outline  bg-[#6749c1]">C/C++</button>
        <button class="badge badge-outline bg-[#c14953]">JavaScript</button>
        <button class="badge badge-outline bg-[#c17149]">Rust</button>
        <button class="badge badge-outline bg-[#adc149]">Python</button>
        <button class="badge badge-outline bg-[#7b49c1]">Haskell</button>
        <button class="badge badge-outline bg-[#4953c1]">React Native</button>
        <button class="badge badge-outline bg-[#49c1b7]">NodeJS</button>
        <button class="badge badge-outline bg-[#c14953]">Pytorch</button>
        <button class="badge badge-outline bg-[#c149b7]">SFML</button>
      </div>
      <div class="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  </div>

  <!-- PROJECTS BOX -->
  <div class="sm:pt-8 pl-4 pr-4 text-center">
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
          A <span class="underline">revised</span> and more <span class="underline">efficient</span> Pullman transit real-time bus <span class="underline">tracking</span> app with <span class="underline">WebSockets</span>!
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
          A postscript <span class="underline">interpreter</span> that is <span class="underline">blazingly</span> fast. Built <span class="underline">with</span> Rust!
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
          A <span class="underline">dead</span> by daylight/among-us <span class="underline">inspired</span> game. A fun <span class="underline">experience</span> using SFML!
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
              A <span class="underline">machine</span> learning model with <span class="underline">Pytorch's</span> Random Forest to <span class="underline">predict</span> future snowpack across <span class="underline">Washington</span>! <span class="line-through"> also won first place </span>
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
