<script lang="ts">
import { onMount } from 'svelte';
import init, { PostScriptInterpreter } from '$lib/embed/pkg/wasm.js';

// Create a new instance of PostScriptInterpreter
let interpreter: PostScriptInterpreter;

// Initialize the WASM module and interpreter
onMount(async () => {
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

<div class="h-screen flex flex-col sm:flex-row items-center gap-y-6">
  <div class="basis-auto sm:basis-2/3 p-6 text-center">
    <h1 class="font-bold text-5xl text-[#E5DCC5] pt-12 sm:pt-4">PostScript Interpreter</h1>
    <p class="italic text-balance pt-12">
      Originally a project from one of my classes, I really liked how it turned out and I decided to continue adjusting and adding nice touches to my code! It was my first project using Rust and the code is <span class="line-through"> horrible </span>
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
        <button id="run" class="btn btn-sm btn-outline">Run</button>
      </div>
    <div id="output"></div>
  </div>
</div>

