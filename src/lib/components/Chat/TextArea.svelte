<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value = '';

	const dispatch = createEventDispatcher();

	const on_keyup = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLTextAreaElement;
		}
	) => {
		event.currentTarget.style.height = '1px';
		event.currentTarget.style.height =
			1 + event.currentTarget.scrollHeight + 'px';
	};

	const on_keydown = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLTextAreaElement;
		}
	) => {
		if ((event.ctrlKey || event.metaKey) && event.key == 'Enter') {
			dispatch('submit');
		}
	};
</script>

<textarea
	placeholder="Your message here. Tip: You can press control+enter or ⌘+enter to submit"
	bind:value
	on:keyup={on_keyup}
	on:keydown={on_keydown}
	style="overflow:hidden"
/>

<style>
	textarea {
		background: #2c2d32;
		color: white;
		font-family: var(--font-body);
		border: 1px solid #2f3036;
		border-radius: 2px;
		font-size: 16px;
		padding: 8px 6px;
		width: 100%;
	}
</style>
