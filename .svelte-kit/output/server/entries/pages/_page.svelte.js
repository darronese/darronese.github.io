import "clsx";
import { t as fallback, u as attr, v as attr_class, w as attr_style, x as stringify, q as escape_html, y as bind_props, l as pop, p as push } from "../../chunks/index.js";
/* empty css                                                        */
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faHome, faEnvelope } from "@fortawesome/free-solid-svg-icons";
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  if (typeof scale === "string") {
    scale = parseFloat(scale);
  }
  if (typeof translateX === "string") {
    translateX = parseFloat(translateX);
  }
  if (typeof translateY === "string") {
    translateY = parseFloat(translateY);
  }
  const x = `${translateX * translateTimes}${translateUnit}`;
  const y = `${translateY * translateTimes}${translateUnit}`;
  let output = `translate(${x},${y}) scale(${flipX * scale},${flipY * scale})`;
  if (rotate) {
    output += ` rotate(${rotate}${rotateUnit})`;
  }
  return output;
}
function Fa($$payload, $$props) {
  push();
  let i, transform;
  let clazz = fallback($$props["class"], () => void 0, true);
  let id = fallback($$props["id"], () => void 0, true);
  let style = fallback($$props["style"], () => void 0, true);
  let icon = $$props["icon"];
  let title = fallback($$props["title"], () => void 0, true);
  let size = fallback($$props["size"], () => void 0, true);
  let color = fallback($$props["color"], () => void 0, true);
  let fw = fallback($$props["fw"], false);
  let pull = fallback($$props["pull"], () => void 0, true);
  let scale = fallback($$props["scale"], 1);
  let translateX = fallback($$props["translateX"], 0);
  let translateY = fallback($$props["translateY"], 0);
  let rotate = fallback($$props["rotate"], () => void 0, true);
  let flip = fallback($$props["flip"], () => void 0, true);
  let spin = fallback($$props["spin"], false);
  let pulse = fallback($$props["pulse"], false);
  let primaryColor = fallback($$props["primaryColor"], "");
  let secondaryColor = fallback($$props["secondaryColor"], "");
  let primaryOpacity = fallback($$props["primaryOpacity"], 1);
  let secondaryOpacity = fallback($$props["secondaryOpacity"], 0.4);
  let swapOpacity = fallback($$props["swapOpacity"], false);
  i = icon && icon.icon || [0, 0, "", [], ""];
  transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
  if (i[4]) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${attr("id", id)}${attr_class(`svelte-fa svelte-fa-base ${stringify(clazz)}`, "svelte-bvo74f", {
      "pulse": pulse,
      "svelte-fa-size-lg": size === "lg",
      "svelte-fa-size-sm": size === "sm",
      "svelte-fa-size-xs": size === "xs",
      "svelte-fa-fw": fw,
      "svelte-fa-pull-left": pull === "left",
      "svelte-fa-pull-right": pull === "right",
      "spin": spin
    })}${attr_style(style)}${attr("viewBox", `0 0 ${stringify(i[0])} ${stringify(i[1])}`)}${attr("aria-hidden", title === void 0)} role="img" xmlns="http://www.w3.org/2000/svg">`;
    if (title) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<title class="svelte-bvo74f">${escape_html(title)}</title>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--><g${attr("transform", `translate(${stringify(i[0] / 2)} ${stringify(i[1] / 2)})`)}${attr("transform-origin", `${stringify(i[0] / 4)} 0`)} class="svelte-bvo74f"><g${attr("transform", transform)} class="svelte-bvo74f">`;
    if (typeof i[4] == "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<path${attr("d", i[4])}${attr("fill", color || primaryColor || "currentColor")}${attr("transform", `translate(${stringify(i[0] / -2)} ${stringify(i[1] / -2)})`)} class="svelte-bvo74f"></path>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<path${attr("d", i[4][0])}${attr("fill", secondaryColor || color || "currentColor")}${attr("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity)}${attr("transform", `translate(${stringify(i[0] / -2)} ${stringify(i[1] / -2)})`)} class="svelte-bvo74f"></path><path${attr("d", i[4][1])}${attr("fill", primaryColor || color || "currentColor")}${attr("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity)}${attr("transform", `translate(${stringify(i[0] / -2)} ${stringify(i[1] / -2)})`)} class="svelte-bvo74f"></path>`;
    }
    $$payload.out += `<!--]--></g></g></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: clazz,
    id,
    style,
    icon,
    title,
    size,
    color,
    fw,
    pull,
    scale,
    translateX,
    translateY,
    rotate,
    flip,
    spin,
    pulse,
    primaryColor,
    secondaryColor,
    primaryOpacity,
    secondaryOpacity,
    swapOpacity
  });
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="dropdown"><button tabindex="0" class="btn m-1 bg-[#4c4c47]">`;
  Fa($$payload, { icon: faBars });
  $$payload.out += `<!----></button> <ul tabindex="0" class="dropdown-content menu rounded-box bg-[#4c4c47]"><li><a href="/">`;
  Fa($$payload, { icon: faHome });
  $$payload.out += `<!----></a></li></ul></div> <div class="flex flex-col sm:flex-row items-center gap-y-6"><div class="basis-auto sm:basis-2/3 p-6 text-center"><h1 class="font-bold text-7xl text-[#E5DCC5] p-4 sm:pt-30">darron li</h1> <dl class="font-normal text-[#848fa5]"><dt class="italic">aspring software engineer</dt> <dt class="italic">self proclaimed professional musician</dt></dl> <div class="p-4"><a href="https://github.com/darronese" class="btn bg-[#c14953]" target="_blank" rel="noopener noreferrer">`;
  Fa($$payload, { icon: faGithub });
  $$payload.out += `<!----></a> <a href="https://www.linkedin.com/in/darronese/" class="btn bg-[#c14953]" target="_blank" rel="noopener noreferrer">`;
  Fa($$payload, { icon: faLinkedin });
  $$payload.out += `<!----></a> <a href="mailto:darronese@outlook.com" class="btn bg-[#c14953]" target="_blank" rel="noopener noreferrer">`;
  Fa($$payload, { icon: faEnvelope });
  $$payload.out += `<!----></a></div></div> <div class="object-contain sm:basis-1/4 p-6 sm:pt-30"><img class="rounded-lg" src="/temp.png" alt="Portrait of Me!"></div></div>`;
}
export {
  _page as default
};
