<script lang="ts">
import { onMount } from 'svelte';
import init, { PostScriptInterpreter } from '$lib/embed/pkg/wasm.js';
import Fa from "svelte-fa";
import { faHome } from '@fortawesome/free-solid-svg-icons';

// animations
import MagicParticles from '$lib/components/particles.svelte'
import Cursor from '$lib/components/cursor.svelte'
import { initColorLinks } from '$lib/components/colorscript.svelte';

// Create a new instance of PostScriptInterpreter
let interpreter: PostScriptInterpreter;

// Initialize the WASM module and interpreter
onMount(async () => {
  // intiiate the colors
  initColorLinks();
  await init();
  // initialize on page load
  interpreter = new PostScriptInterpreter();

  // Set up the event listener for the "Run" button
  document.getElementById('run')!.addEventListener('click', async () => {
    // get user input
    const input = (document.getElementById('input') as HTMLInputElement).value;
    // call interpreter on user input
    const result = interpreter.run_interpreter(input);
    const outputDiv = document.getElementById('output');
    // show output if successful and prints stuff out
    // Check if the result is not empty or undefined, then display it
    if (outputDiv && result) {
      outputDiv.textContent = result;
    } else if (outputDiv) {
      // Clear output if there's no result to display
      outputDiv.textContent = '';
    }
  });
});
</script>

<!-- PARTICLES BACKGROUND -->
<MagicParticles
  className="fixed inset-0 pointer-events-none z-1"
/>
<!-- Cursor -->
<Cursor gradientColor="#505050" gradientSize={300} gradientOpacity={0.1}>
  <div class="fixed bottom-4 right-4">
    <a href="/" class="initial btn bg-[#c14953] rounded-xl hover:bg-[#772a30] hover:rounded-md duration-500">
      <Fa icon={faHome}/>
    </a>
  </div>
  <div class="h-screen flex flex-col sm:flex-row items-center gap-y-6">
    <div class="basis-auto sm:basis-2/3 p-6 text-center">
      <h1 class="font-bold text-7xl text-[#E5DCC5] pt-12 sm:pt-4">PT-Better Beacon</h1>
      <p class="text-balance pt-12">
        WIP
      </p>
    </div>
  </div>
</Cursor>

