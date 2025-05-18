<script lang="ts">
import { onMount } from 'svelte';
import { initColorLinks } from '$lib/components/colorscript.svelte';
onMount(() => {
  initColorLinks();
}); 
</script>

<!-- PAGES -->
<div class="flex flex-col sm:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 p-6 text-center">
    <h1 class="font-bold text-8xl sm:text-9xl text-[#E5DCC5] pt-12 sm:pt-30">about</h1>
    <div class="text-lg">
      <p class="italic pt-12">
        "There are no men like me. There's only me."
      </p>
      <p>
        - <a class="underline">Jaime</a> <a class="underline">Lannister</a> (ASOIAF)
      </p>
    </div>
  </div>
  <p class="object-contain text-xl sm:basis-1/3 sm:w-30 p-4 sm:pt-60 sm:pr-8 text-center">
    Hi there! My name is <a class="underline">Darron</a> and I am an aspiring <a class="underline">software</a> engineer with a passion for music. While impatiently waiting for <a class="underline"> Winds of Winter </a> to come out, I have been exploring the different <a class="underline">technologies</a> of <a class="underline">software</a> engineering. I love learning about new technlogies and systems, even if they seem to bore me (<a class="underline">cybersecurity</a>).
  </p>
</div>
