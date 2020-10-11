import { writable } from 'svelte/store';

export let darkmode = writable(false);
export let count = writable(0);