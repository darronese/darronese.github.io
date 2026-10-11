<script lang="ts">
import Fa from "svelte-fa";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { statusColors, type Project } from '$lib/data/projects';

export let project: Project;
export let highlighted = false;
export let dimmed = false;
</script>

<article
  class="w-full flex flex-col rounded-box bg-[#4c4c47]/90 shadow-md p-5 sm:p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:outline-2 hover:outline-[#c14953]"
  class:highlighted
  class:opacity-40={dimmed}
>
  <div class="flex items-start gap-4">
    {#if project.image}
      <img class="size-14 sm:size-16 rounded-box shrink-0 object-contain bg-[#2d2d2a]" src={project.image} alt="" />
    {/if}
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center gap-2">
        <h2 class="text-xl sm:text-2xl font-bold text-[#E5DCC5] break-words">{project.title}</h2>
        <span class="badge badge-sm" style="background-color: {statusColors[project.status]}">{project.status}</span>
      </div>
      <div class="flex flex-wrap gap-1 pt-2">
        {#each project.tags as tag}
          <span class="badge badge-outline badge-sm" style="background-color: {tag.color ?? '#4c4c47'}">{tag.label}</span>
        {/each}
      </div>
    </div>
  </div>

  <p class="pt-4 text-sm leading-relaxed">{project.description}</p>

  {#if project.highlights?.length}
    <ul class="pt-3 text-sm list-disc list-inside opacity-80 space-y-1">
      {#each project.highlights as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}

  {#if project.repo || project.demo}
    <div class="flex flex-wrap gap-2 pt-5 mt-auto">
      {#if project.demo}
        <a href={project.demo} class="btn btn-sm bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500 gap-2" target="_blank" rel="noopener noreferrer">
          <Fa icon={faPlay}/> try it
        </a>
      {/if}
      {#if project.repo}
        <a href={project.repo} class="btn btn-sm btn-outline rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500 gap-2" target="_blank" rel="noopener noreferrer">
          <Fa icon={faGithub}/> {project.repoLabel ?? 'source'}
        </a>
      {/if}
    </div>
  {/if}
</article>

<style>
  .highlighted {
    outline: 2px solid #c14953;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 0 24px rgb(193 73 83 / 0.45);
  }
</style>
