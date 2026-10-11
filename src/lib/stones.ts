import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

// the six infinity stones hidden around the page. collect them all and the
// gauntlet lets you snap (see $lib/snap.ts)
export const STONES = [
  { id: 'space', name: 'Space Stone', color: '#2f7bff' },
  { id: 'mind', name: 'Mind Stone', color: '#ffd21f' },
  { id: 'reality', name: 'Reality Stone', color: '#e3263a' },
  { id: 'power', name: 'Power Stone', color: '#a43cff' },
  { id: 'time', name: 'Time Stone', color: '#27c25b' },
  { id: 'soul', name: 'Soul Stone', color: '#ff8a1f' },
] as const;

export type StoneId = (typeof STONES)[number]['id'];

const KEY = 'infinity-stones';
const isStone = (id: unknown): id is StoneId => STONES.some((s) => s.id === id);

export const collected = writable<StoneId[]>([]);
export const complete = derived(collected, (c) => c.length === STONES.length);

// progress survives a reload mid-hunt. it's loaded as soon as this file runs in
// the browser, before any stone renders, so found stones never flash back.
// storage can be blocked (private windows, strict settings), in which case the
// hunt just starts over
if (browser) {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (Array.isArray(saved)) collected.set(saved.filter(isStone));
  } catch {
    // ignore unreadable storage
  }
  collected.subscribe((c) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {
      // ignore unwritable storage
    }
  });
}

export function collect(id: StoneId) {
  collected.update((c) => (c.includes(id) ? c : [...c, id]));
}

export function resetStones() {
  collected.set([]);
}
