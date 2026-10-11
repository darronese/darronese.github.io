<!--
  About section as a tiny language model: "Darron is ___".
  Each fact is a candidate next token with a logit; we softmax with the temperature
  slider, sample one, and the picked token unfolds into the fact behind it.
-->
<script lang="ts">
import { onMount, tick } from 'svelte';
import { animate } from 'animejs';
import { facts, type Fact } from '$lib/data/facts';

let temperature = 1;
let remaining: Fact[] = [...facts];
let generated: Fact[] = [];
let done = false;
let thinking = false;
// index into `ranked` the roulette is currently lighting up
let lit = -1;
let reducedMotion = false;

// numerically stable softmax over what's left (subtract the max logit first)
function softmax(items: Fact[], t: number) {
  const scaled = items.map((f) => f.logit / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((s) => Math.exp(s - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

$: probs = softmax(remaining, temperature);
$: ranked = remaining
  .map((fact, i) => ({ fact, p: probs[i] }))
  .sort((a, b) => b.p - a.p);
// Shannon entropy in bits: how unsure the model is about the next token
$: entropy = -probs.reduce((sum, p) => (p > 0 ? sum + p * Math.log2(p) : sum), 0);

function pick() {
  let r = Math.random();
  for (let i = 0; i < ranked.length; i++) {
    r -= ranked[i].p;
    if (r <= 0) return i;
  }
  return ranked.length - 1;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function sample() {
  if (thinking || done || ranked.length === 0) return;
  thinking = true;
  const chosen = pick();

  if (!reducedMotion) {
    // roulette: flick through a few weighted guesses, slowing down, then land on the pick
    const steps = 9;
    for (let s = 0; s < steps; s++) {
      lit = s === steps - 1 ? chosen : pick();
      await wait(50 + s * s * 6);
    }
    await wait(200);
  }

  const fact = ranked[chosen].fact;
  lit = -1;
  // repetition penalty: infinite. each fact is only said once
  remaining = remaining.filter((f) => f !== fact);
  generated = [...generated, fact];
  if (fact.eos || remaining.every((f) => f.eos)) done = true;
  thinking = false;

  await tick();
  if (!reducedMotion) {
    animate('.fact-card:first-child', {
      opacity: [0, 1],
      translateY: [-16, 0],
      scale: [0.95, 1],
      duration: 450,
      ease: 'outBack',
    });
    animate('.token-chip.newest', {
      opacity: [0, 1],
      scale: [0.6, 1],
      duration: 350,
      ease: 'outBack',
    });
  }
}

function reset() {
  remaining = [...facts];
  generated = [];
  done = false;
  lit = -1;
}

// the sentence so far, without the <eos> token
$: spoken = generated.filter((f) => !f.eos);

onMount(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});
</script>

<div class="flex flex-col items-center gap-y-6 px-4 pb-24">
  <!-- TITLE -->
  <div class="p-6 text-center">
    <h1 class="font-bold text-6xl sm:text-8xl text-[#E5DCC5] pt-12 sm:pt-30">about</h1>
    <p class="italic pt-6">a very small language model, trained exclusively on me</p>
    <p class="text-sm opacity-60 pt-4">"There are no men like me. There's only me." - <span class="underline">Jaime</span> <span class="underline">Lannister</span> (ASOIAF)</p>
  </div>

  <div class="w-full max-w-3xl rounded-box bg-[#4c4c47]/90 shadow-md p-5 sm:p-8 text-left">
    <!-- MODEL + PROMPT -->
    <div class="flex items-start gap-4">
      <svg class="robot shrink-0 w-14 sm:w-16" class:thinking viewBox="0 0 64 64" aria-hidden="true">
        <line x1="32" y1="4" x2="32" y2="14" stroke="#e5dcc5" stroke-width="3" stroke-linecap="round" />
        <circle class="antenna" cx="32" cy="5" r="4" />
        <rect x="10" y="14" width="44" height="36" rx="10" fill="#2d2d2a" stroke="#e5dcc5" stroke-width="3" />
        <g class="eyes">
          <rect x="20" y="26" width="8" height="10" rx="3" fill="#e5dcc5" />
          <rect x="36" y="26" width="8" height="10" rx="3" fill="#e5dcc5" />
        </g>
        <rect x="24" y="41" width="16" height="3" rx="1.5" fill="#848fa5" />
        <rect x="4" y="26" width="6" height="12" rx="2" fill="#848fa5" />
        <rect x="54" y="26" width="6" height="12" rx="2" fill="#848fa5" />
        <rect x="22" y="52" width="20" height="8" rx="3" fill="#848fa5" />
      </svg>
      <div class="min-w-0 flex-1">
        <div class="text-xs opacity-60">darron-0.0001B · temperature {temperature.toFixed(1)}</div>
        <p class="text-lg sm:text-2xl text-[#E5DCC5] leading-relaxed pt-1" aria-live="polite">
          Darron is
          {#each spoken as fact, i (fact.token)}
            <span class="token-chip inline-block rounded px-1 bg-[#c14953]/30 border-b-2 border-[#c14953]" class:newest={i === spoken.length - 1}>{fact.token}</span>{i < spoken.length - 1 ? ', ' : ''}{' '}
          {/each}
          {#if done}
            <span class="text-xs align-middle opacity-60 font-normal">&lt;eos&gt;</span>
          {:else}
            {spoken.length > 0 ? 'and ' : ''}<span class="cursor">___</span>
          {/if}
        </p>
      </div>
    </div>

    <!-- NEXT-TOKEN DISTRIBUTION -->
    {#if !done}
      <div class="pt-6">
        <div class="flex justify-between text-xs opacity-60 pb-2">
          <span>next-token probabilities</span>
          <span>entropy {entropy.toFixed(2)} bits</span>
        </div>
        <ul class="space-y-1">
          {#each ranked as { fact, p }, i (fact.token)}
            <li
              class="grid grid-cols-[minmax(0,11rem)_1fr_3rem] sm:grid-cols-[minmax(0,16rem)_1fr_3.5rem] items-center gap-2 text-xs sm:text-sm rounded px-1 transition-colors duration-100"
              class:lit={i === lit}
            >
              <span class="truncate" class:opacity-60={fact.eos} title={fact.token}>{fact.token}</span>
              <span class="h-2.5 rounded-full bg-[#2d2d2a] overflow-hidden">
                <span class="bar block h-full rounded-full" style="width: {(p * 100).toFixed(1)}%"></span>
              </span>
              <span class="text-right tabular-nums opacity-80">{p.toFixed(2)}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <!-- CONTROLS -->
    <div class="flex flex-wrap items-center gap-4 pt-6">
      <button
        type="button"
        class="btn btn-sm bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500 border-none"
        disabled={thinking || done}
        on:click={sample}
      >{thinking ? 'sampling…' : generated.length ? 'sample next' : 'sample'}</button>
      <button
        type="button"
        class="btn btn-sm btn-ghost rounded-xl"
        disabled={thinking || generated.length === 0}
        on:click={reset}
      >reset</button>
      <label class="flex items-center gap-2 text-xs sm:text-sm flex-1 min-w-48">
        <span class="opacity-70">temperature</span>
        <input
          type="range"
          class="range range-xs flex-1 text-[#c14953]"
          min="0.1"
          max="3"
          step="0.1"
          bind:value={temperature}
          disabled={thinking}
        />
      </label>
    </div>
    <p class="text-xs opacity-50 pt-2">low = always the obvious answer · high = anything goes</p>
  </div>

  <!-- WHAT THE TOKENS MEAN: newest first -->
  {#if generated.length}
    <div class="w-full max-w-3xl flex flex-col gap-3">
      {#each [...generated].reverse() as fact (fact.token)}
        <div class="fact-card rounded-box bg-[#2d2d2a] border-l-4 px-4 py-3 text-sm" class:border-[#c14953]={!fact.eos} class:border-[#848fa5]={fact.eos}>
          <span class="font-bold text-[#E5DCC5]">{fact.token}</span>
          <span class="opacity-80"> · {fact.detail}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bar {
    background: #c14953;
    transition: width 350ms ease-out, background-color 100ms;
  }
  .lit {
    background: rgb(193 73 83 / 0.25);
  }
  /* the bars are already red, so the roulette lights its pick up in cream */
  .lit .bar {
    background: #e5dcc5;
  }

  .antenna {
    fill: #848fa5;
    transition: fill 200ms;
  }
  .robot.thinking .antenna {
    fill: #c14953;
    animation: pulse 0.4s ease-in-out infinite alternate;
  }
  .eyes {
    transform-origin: 32px 31px;
    animation: blink 4s infinite;
  }
  .robot.thinking .eyes {
    animation: scan 0.5s ease-in-out infinite alternate;
  }

  .cursor {
    animation: caret 1s steps(1) infinite;
  }

  @keyframes blink {
    0%, 94%, 100% { transform: scaleY(1); }
    97% { transform: scaleY(0.1); }
  }
  @keyframes scan {
    from { transform: translateX(-3px); }
    to { transform: translateX(3px); }
  }
  @keyframes pulse {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
  @keyframes caret {
    50% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .eyes,
    .robot.thinking .eyes,
    .robot.thinking .antenna,
    .cursor {
      animation: none;
    }
  }
</style>
