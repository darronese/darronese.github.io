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
    <h1 class="font-bold text-7xl md:text-8xl text-[#E5DCC5] pt-12 sm:pt-30">about</h1>
    <div class="text-lg">
      <p class="italic pt-12">
        "There are no men like me. There's only me."
      </p>
      <p>
        - <span class="underline">Jaime</span> <span class="underline">Lannister</span> (ASOIAF)
      </p>
    </div>
  </div>
  <p class="object-contain basis-1/6 sm:basis-1/4 p-4 text-xl sm:pt-48 text-center">
    Hi there! My name is <span class="underline">Darron</span> and I am an aspiring <span class="underline">software</span> engineer with a passion for music. While impatiently waiting for <span class="underline"> Winds of Winter </span> to come out, I have been exploring the different <span class="underline">technologies</span> of <span class="underline">software</span> engineering. I love learning about new technlogies and systems, even if they seem to bore me (<span class="underline">cybersecurity</span>).
  </p>
</div>
