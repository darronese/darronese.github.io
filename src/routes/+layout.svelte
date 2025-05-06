<!--
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
-->

<script>
  import "../app.css";
  import Fa from 'svelte-fa'
  import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons/index.es'
  let { children } = $props();
</script>

{@render children()}
