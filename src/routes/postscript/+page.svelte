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
      // show output if successful
      if (outputDiv) {
        outputDiv.textContent = result;
      }
    });
  });
</script>

<h1>PostScript Interpreter</h1>

<input type="text" id="input" placeholder="Enter PostScript command" />
<button id="run">Run</button>
<div id="output"></div>
