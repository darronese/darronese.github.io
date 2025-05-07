<!--
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
-->

<script>
  import "../app.css";
  import Fa from 'svelte-fa'
  import { faFlag } from '@fortawesome/free-solid-svg-icons'
  let { children } = $props();
</script>

{@render children()}
