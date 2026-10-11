<script lang="ts">
import { onMount, tick } from 'svelte';
import { animate, stagger } from 'animejs';
import { crossfade, fade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

import Carousel from '$lib/components/carousel.svelte';
import ProjectCard from '$lib/components/projectcard.svelte';
import { projects } from '$lib/data/projects';

export let scrollContainer: HTMLDivElement;

// each group is sent as its own chat message, in order
// labels that exactly match a project tag link to that project
const skillGroups = [
  {
    name: 'languages',
    skills: [
      { label: 'C', color: '#6749c1' },
      { label: 'C++', color: '#6749c1' },
      { label: 'C#', color: '#7b49c1' },
      { label: 'Python', color: '#adc149' },
      { label: 'JavaScript', color: '#c1a349' },
      { label: 'TypeScript', color: '#4953c1' },
    ],
  },
  {
    name: 'frameworks & libraries',
    skills: [
      { label: 'PyTorch', color: '#c14953' },
      { label: 'Hugging Face', color: '#c1a349' },
      { label: 'Transformers.js', color: '#c1a349' },
      { label: 'NumPy', color: '#4953c1' },
      { label: 'Pandas', color: '#6749c1' },
      { label: 'scikit-learn', color: '#c17149' },
      { label: 'React', color: '#49c1b7' },
      { label: 'Node.js', color: '#7bc149' },
    ],
  },
  {
    name: 'tools',
    skills: [
      { label: 'Docker', color: '#4953c1' },
      { label: 'Git', color: '#c17149' },
      { label: 'GitHub Actions', color: '#4c4c47' },
      { label: 'Jenkins', color: '#c14953' },
      { label: 'MCP', color: '#c149b7' },
      { label: 'WebGPU', color: '#c14953' },
      { label: 'WebSockets', color: '#49c1b7' },
      { label: 'REST APIs', color: '#7bc149' },
    ],
  },
];

// chat plays out in stages:
// 1 manager typing, 2 question, 3 me typing, 4..(4+groups-1) one message per skill group,
// then seen, manager typing, follow-up
const FIRST_GROUP_STAGE = 4;
const SEEN_STAGE = FIRST_GROUP_STAGE + skillGroups.length;
const FINAL_STAGE = SEEN_STAGE + 2;
let stage = 0;
let reducedMotion = false;
let cancelled = false;

// my avatar sits next to my newest message (-1 = the typing bubble) and slides down as more arrive
$: newestMine = stage === 3 ? -1 : Math.min(stage - FIRST_GROUP_STAGE, skillGroups.length - 1);
const [sendAvatar, receiveAvatar] = crossfade({
  duration: () => (reducedMotion ? 0 : 400),
  easing: cubicOut,
  fallback: (node) => fade(node, { duration: reducedMotion ? 0 : 200 }),
});

// hovering a skill highlights the projects that use it and slides the first one into view
let hoveredSkill: string | null = null;
const usesSkill = (project: (typeof projects)[number], skill: string | null) =>
  project.tags.some((t) => t.label === skill);
const isLinked = (skill: string) => projects.some((p) => usesSkill(p, skill));
$: anyMatch = projects.some((p) => usesSkill(p, hoveredSkill));

let carousel: Carousel;
let activeIndex = 0;

function pointAt(skill: string | null) {
  hoveredSkill = skill;
  const index = projects.findIndex((p) => usesSkill(p, skill));
  if (index !== -1) carousel?.goTo(index);
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// move to the next stage, then pop in whatever just rendered
async function show(next: number, selector: string, params: Record<string, unknown> = {}) {
  if (cancelled) return;
  stage = next;
  await tick();
  animate(selector, {
    opacity: [0, 1],
    scale: [0.6, 1],
    duration: 400,
    ease: 'outBack',
    ...params,
  });
}

async function playChat() {
  await show(1, '.typing-q');
  await wait(900);
  await show(2, '.msg-q');
  await wait(700);
  await show(3, '.typing-a');
  await wait(1100);
  for (const [g, group] of skillGroups.entries()) {
    await show(FIRST_GROUP_STAGE + g, `.msg-a-${g}`);
    await show(FIRST_GROUP_STAGE + g, `.skill-${g}`, { delay: stagger(60, { start: 150 }), translateY: [12, 0] });
    await wait(150 + group.skills.length * 60 + 500);
  }
  await show(SEEN_STAGE, '.seen', { scale: [1, 1], duration: 300, ease: 'out' });
  await wait(900);
  await show(SEEN_STAGE + 1, '.typing-q2');
  await wait(1200);
  await show(FINAL_STAGE, '.msg-q2', { rotate: [-4, 0] });
}

onMount(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cleanup = () => {
    cancelled = true;
  };

  if (reducedMotion) {
    stage = FINAL_STAGE;
    return cleanup;
  }

  const section = document.getElementById('Projects');
  if (!section) return cleanup;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          playChat();
          // only run once
          observer.unobserve(section);
        }
      }
    },
    {
      root: scrollContainer,
      threshold: 0.1
    }
  );

  observer.observe(section);
  return () => {
    cleanup();
    observer.disconnect();
  };
});
</script>

<div class="flex flex-col items-center gap-y-6 px-4 pb-16">
  <!-- TITLE -->
  <div class="w-full basis-auto p-6 text-center">
    <h1 class="font-bold text-6xl sm:text-8xl text-[#E5DCC5] pt-12 sm:pt-30">projects</h1>
    <p class="text-center italic p-6 sm:pr-8"> "A mind needs books as a sword needs a whetstone, if it is to keep its edge."</p>
    <p class="text-center"> - <span class="underline">Tyrion</span> <span class="underline">Lannister</span> (ASOIAF)</p>

    <!-- CHAT: min height is reserved so the cards below don't jump as messages arrive -->
    <div class="w-full max-w-xl mx-auto pt-6 min-h-[34rem] sm:min-h-[30rem] text-left">
      {#if stage >= 1}
        <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="Hiring manager avatar" src="/prime.png" />
            </div>
          </div>
          <div class="chat-header">
            Hiring Manager
            <time class="text-xs opacity-50">12:45</time>
          </div>
          {#if stage === 1}
            <div class="typing-q chat-bubble bg-[#4c4c47]" aria-label="typing">
              <span class="loading loading-dots loading-sm"></span>
            </div>
          {:else}
            <div class="msg-q chat-bubble bg-[#4c4c47] origin-bottom-left">What technologies have you used?</div>
          {/if}
        </div>
      {/if}

      {#if stage >= 3}
        {#if stage === 3}
          <div class="chat chat-end">
            <div class="chat-image avatar" in:receiveAvatar|global={{ key: 'me' }} out:sendAvatar|global={{ key: 'me' }}>
              <div class="w-10 rounded-full">
                <img alt="Darron's avatar" src="/new_pfp.png" class="object-[50%_35%]" />
              </div>
            </div>
            <div class="chat-header">
              Humble, Awesome, Great, Smart, Guy
              <time class="text-xs opacity-50">12:46</time>
            </div>
            <div class="typing-a chat-bubble bg-[#4c4c47]" aria-label="typing">
              <span class="loading loading-dots loading-sm"></span>
            </div>
          </div>
        {/if}
        {#each skillGroups as group, g (group.name)}
          {#if stage >= FIRST_GROUP_STAGE + g}
            <div class="chat chat-end">
              {#if g === 0}
                <div class="chat-header">
                  Humble, Awesome, Great, Smart, Guy
                  <time class="text-xs opacity-50">12:46</time>
                </div>
              {/if}
              {#if g === newestMine}
                <div class="chat-image avatar" in:receiveAvatar|global={{ key: 'me' }} out:sendAvatar|global={{ key: 'me' }}>
                  <div class="w-10 rounded-full">
                    <img alt="Darron's avatar" src="/new_pfp.png" class="object-[50%_35%]" />
                  </div>
                </div>
              {:else}
                <!-- empty slot keeps older bubbles aligned once the avatar moves on -->
                <div class="chat-image w-10"></div>
              {/if}
              <div class="msg-a-{g} chat-bubble bg-[#4c4c47] origin-bottom-right" class:no-tail={g !== newestMine}>
                <div class="text-xs opacity-60 pb-1 text-right">{group.name}</div>
                <div class="flex flex-wrap gap-1 justify-end">
                  {#each group.skills as skill}
                    {#if isLinked(skill.label)}
                      <button
                        type="button"
                        class="skill-{g} badge badge-outline gap-1 cursor-pointer transition-transform hover:scale-110 focus-visible:scale-110"
                        class:opacity-0={!reducedMotion}
                        style="background-color: {skill.color}"
                        title="see projects using {skill.label}"
                        on:mouseenter={() => pointAt(skill.label)}
                        on:mouseleave={() => (hoveredSkill = null)}
                        on:focus={() => pointAt(skill.label)}
                        on:blur={() => (hoveredSkill = null)}
                        on:click={() => pointAt(skill.label)}
                      >{skill.label}<span aria-hidden="true">↓</span></button>
                    {:else}
                      <span
                        class="skill-{g} badge badge-outline"
                        class:opacity-0={!reducedMotion}
                        style="background-color: {skill.color}"
                      >{skill.label}</span>
                    {/if}
                  {/each}
                </div>
              </div>
              {#if g === skillGroups.length - 1 && stage >= SEEN_STAGE}
                <div class="seen chat-footer opacity-50">Seen at 12:46</div>
              {/if}
            </div>
          {/if}
        {/each}
      {/if}

      {#if stage >= SEEN_STAGE + 1}
        <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="Hiring manager avatar" src="/prime.png" />
            </div>
          </div>
          <div class="chat-header">
            Hiring Manager
            <time class="text-xs opacity-50">12:47</time>
          </div>
          {#if stage === SEEN_STAGE + 1}
            <div class="typing-q2 chat-bubble bg-[#4c4c47]" aria-label="typing">
              <span class="loading loading-dots loading-sm"></span>
            </div>
          {:else}
            <div class="msg-q2 chat-bubble bg-[#4c4c47] origin-bottom-left">...ok, but do you know Kubernetes?</div>
            <div class="chat-footer opacity-50">psst: hover a skill with a ↓ to see where I used it</div>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <!-- PROJECTS: driven by $lib/data/projects.ts -->
  <div class="w-full max-w-5xl">
    <Carousel bind:this={carousel} bind:activeIndex labels={projects.map((p) => p.title)} ariaLabel="projects">
      {#each projects as project, i (project.title)}
        <div
          class="shrink-0 w-[85%] sm:w-[28rem] flex transition-opacity duration-300"
          class:opacity-50={i !== activeIndex && !anyMatch}
        >
          <ProjectCard
            {project}
            highlighted={anyMatch && usesSkill(project, hoveredSkill)}
            dimmed={anyMatch && !usesSkill(project, hoveredSkill)}
          />
        </div>
      {/each}
    </Carousel>
  </div>
</div>

<style>
  /* only the newest bubble in a run gets the speech tail, like a real chat */
  .no-tail {
    border-end-end-radius: var(--radius-field);
  }
  .no-tail::before {
    display: none;
  }
</style>
