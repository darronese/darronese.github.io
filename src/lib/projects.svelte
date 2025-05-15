<script lang="ts">
import { onMount } from 'svelte';
import { gsap } from 'gsap';

onMount(() => {

  let mm = gsap.matchMedia();

  mm.add("(min-width:640px)", () => {
    gsap.to('.title', {
      scrollTrigger: {
        trigger: '.box',
        start: 'top bottom',
      },
      xPercent: 50,
      duration: 1,
    })
  });

  gsap.to('.project', {
    scrollTrigger: {
      trigger: '.box',
      pin: true,
      start: 'top center',
      end: '+=500',
      scrub: 1,
    },
    duration: 3,
  });
});

</script>

<!-- PAGES -->
<div class="flex flex-col sm:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 p-6">
    <h1 class="title font-bold text-7xl text-[#E5DCC5] p-4 sm:pt-30">Projects</h1>
    <div class="object-contain">
      <img class="project rounded-lg" src="/home.png" alt="Game Home Screen"/>
    </div>
  </div>
</div>
