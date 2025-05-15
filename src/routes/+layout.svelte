<!--
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
-->

<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

{@render children()}
