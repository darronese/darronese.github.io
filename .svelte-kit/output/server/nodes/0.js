import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DZ5yY2v0.js","_app/immutable/chunks/cbP46Ia2.js","_app/immutable/chunks/Dt8kaVtJ.js","_app/immutable/chunks/FZ4sfcgS.js"];
export const stylesheets = ["_app/immutable/assets/0.BOabBS8B.css","_app/immutable/assets/fa-layers-text.DdWHEj6G.css"];
export const fonts = [];
