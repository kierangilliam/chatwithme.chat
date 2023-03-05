<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { onMount } from 'svelte'

	export let value = ''
	export let placeholder =
		'Your message here. Tip: You can press control+enter or ⌘+enter to submit'
	export let disabled: boolean = false

	let text_area_handle: HTMLTextAreaElement

	const dispatch = createEventDispatcher<{ submit: string }>()

	onMount(() => {
		recalculate_height()
		focus()
	})

	const on_submit = () => {
		dispatch('submit', value)
		recalculate_height()
		// FIXME: This hack to refocus the text area is needed.
		// An immediate `text_area_handle.focus()` does not focus
		// the text area.
		setTimeout(() => {
			text_area_handle.focus()
		}, 2_000)
	}

	const recalculate_height = () => {
		text_area_handle.style.height = '1px'
		text_area_handle.style.height = 1 + text_area_handle.scrollHeight + 'px'
	}

	const on_keydown = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLTextAreaElement
		},
	) => {
		if ((event.ctrlKey || event.metaKey) && event.key == 'Enter') {
			on_submit()
		}
	}
</script>

<div class="input">
	<textarea
		tabindex="0"
		style="overflow:hidden"
		{placeholder}
		{disabled}
		bind:this={text_area_handle}
		bind:value
		on:keydown={on_keydown}
		on:keyup={recalculate_height}
	/>

	<button {disabled} on:click|preventDefault={on_submit}>send</button>
</div>

<style>
	.input {
		box-shadow: var(--chat-input-shadow);
		display: flex;
		align-items: center;
		width: 48rem;
		background: var(--chat-input-background);
		border-radius: 4px;
		padding: 4px;
	}

	textarea {
		background: transparent;
		resize: none;
		appearance: none;
		color: white;
		font-family: var(--font-body);
		border: 0px solid white;
		border-radius: 2px;
		font-size: 16px;
		width: 100%;
		flex: auto;
	}
	textarea:focus {
		outline: 2px solid transparent;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		color: black;
		height: 12px;
		padding: 4px 2px;
		font-size: 14px;
		margin-right: 8px;
	}
</style>
