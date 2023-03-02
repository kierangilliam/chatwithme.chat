import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const persistent = <T>(key: string, initValue: T): Writable<T> => {
	if (!browser) return writable(initValue);
	const storedValueStr = localStorage.getItem(key);
	const storedValue: T | null = JSON.parse(storedValueStr ?? 'null') as T | null;

	const store = writable(storedValue ?? initValue);

	store.subscribe((val) => {
		localStorage.setItem(key, JSON.stringify(val));
	});

	return store;
};
