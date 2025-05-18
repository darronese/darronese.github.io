<script context="module">
//https://github.com/cassidoo/blahg/blob/main/src/components/ColorScript.astro
let colors = ["#7bc149", "#c1a349", "#c14953", "#c149b7", "#6749c1"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setRandomLinkColor() {
  Array.from(document.getElementsByTagName("a")).forEach((e) => {
    e.style.textDecorationColor = getRandomColor();
  });
}

function setColorHoverListener() {
  Array.from(document.querySelectorAll("a, button")).forEach((e) => {
    e.addEventListener("mouseover", setRandomLinkColor);
  });
}

export function initColorLinks() {
  setRandomLinkColor();
  setColorHoverListener();
}
</script>
