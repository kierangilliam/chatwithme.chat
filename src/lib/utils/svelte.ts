import { browser } from '$app/environment'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export const persistent = <T>(key: string, initValue: T): Writable<T> => {
	if (!browser) return writable(initValue)
	const storedValueStr = localStorage.getItem(key)
	const storedValue: T | null = JSON.parse(storedValueStr ?? 'null') as T | null

	const store = writable(storedValue ?? initValue)

	store.subscribe((val) => {
		localStorage.setItem(key, JSON.stringify(val))
	})

	return store
}

export const click_outside = (node: HTMLElement, handler: () => void) => {
	window.addEventListener('click', handle)

	function handle(e: any) {
		if (!node.contains(e?.target)) {
			handler()
		}
	}

	return {
		destroy() {
			// the node has been removed from the DOM
			window.removeEventListener('click', handle)
		},
	}
}
