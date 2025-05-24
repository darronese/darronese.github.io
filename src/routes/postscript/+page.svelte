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
      <h1 class="font-bold text-6xl sm:text-8xl text-[#E5DCC5] pt-12 sm:pt-4">PostScript Interpreter</h1>
      <p class="text-balance pt-12">
        Originally a <span class="underline">project</span> from one of my <span class="underline">classes</span>, I really <span class="underline">liked</span> how it <span class="underline">turned</span> out and I <span class="underline">decided</span> to continue <span class="underline">adjusting</span> and adding nice <span class="underline">touches</span> to my code! It was my first <span class="underline">project</span> using <span class="underline">Rust</span> and the code is <span class="line-through"> horrible </span>.
      </p>
    </div>
    <div class="sm:basis-1/3 mockup-code w-full flex flex-col justify-between p-4">
      <pre data-prefix="ps>" class="flex items-center gap-2">
        <input
          type="text"
          id="input"
          placeholder="Enter PostScript command"
          class="bg-transparent text-white border border-gray-600 rounded px-2 py-1 w-full"
        />
      </pre>
      <div class="w-full flex justify-end pt-4">
        <button id="run" class="btn btn-sm bg-[#7bc149] rounded-xl hover:bg-[#54b555] hover:rounded-md duration-500 btn-outline">Run</button>
      </div>
      <div id="output"></div>
    </div>
  </div>
</Cursor>
