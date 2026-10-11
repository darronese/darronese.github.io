<!--
the infinity gauntlet drawing
stones in `lit` glow in their color
the rest show as empty sockets
-->
<script lang="ts">
  import { STONES, type StoneId } from "$lib/stones";

  export let lit: readonly StoneId[] = [];

  const colorOf = (id: StoneId) =>
    lit.includes(id) ? STONES.find((s) => s.id === id)!.color : "#2d2618";
</script>

<svg viewBox="0 0 64 64" class="block w-full h-full" aria-hidden="true">
  <defs>
    <linearGradient id="gauntlet-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6d77e" />
      <stop offset="0.5" stop-color="#d9a93d" />
      <stop offset="1" stop-color="#9a6b1c" />
    </linearGradient>
  </defs>
  <g fill="url(#gauntlet-gold)" stroke="#6e4a12" stroke-width="1.5" stroke-linejoin="round">
    <!-- cuff -->
    <path d="M17 46 H45 L48 61 H14 Z" />
    <!-- curled fingers, pinky to index (a left hand, seen from the back) -->
    <rect x="11" y="13" width="9.5" height="16" rx="4.75" />
    <rect x="20" y="10" width="9.5" height="16" rx="4.75" />
    <rect x="29" y="10.5" width="9.5" height="16" rx="4.75" />
    <rect x="38" y="13" width="9.5" height="16" rx="4.75" />
    <!-- back of the hand, drawn over the fingers so only the knuckles show -->
    <rect x="11" y="21" width="37" height="29" rx="7" />
    <!-- thumb -->
    <rect x="44" y="27" width="11" height="18" rx="5.5" transform="rotate(-18 49.5 36)" />
  </g>
  <path d="M20.25 22 V29 M29.25 22 V30 M38.25 22 V29" stroke="#6e4a12" stroke-width="1.2" stroke-linecap="round" />
  <path d="M16 52 H46" stroke="#6e4a12" stroke-width="1.2" />
  <g stroke="#3a2608" stroke-width="0.8">
    <circle cx="15.75" cy="18" r="2.6" fill={colorOf("soul")} />
    <circle cx="24.75" cy="15" r="2.6" fill={colorOf("reality")} />
    <circle cx="33.75" cy="15.5" r="2.6" fill={colorOf("space")} />
    <circle cx="42.75" cy="18" r="2.6" fill={colorOf("power")} />
    <ellipse cx="29.5" cy="35" rx="4.2" ry="5" fill={colorOf("mind")} />
    <circle cx="50" cy="35" r="2.6" fill={colorOf("time")} />
  </g>
</svg>
