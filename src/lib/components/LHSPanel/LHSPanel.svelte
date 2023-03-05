<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { ChatWithMe } from '$lib/client/OpenAI'
	import { getStateContext } from '$lib/client/state'

	export let chats: ChatWithMe.Models.Chat[]

	const dispatch = createEventDispatcher()
	const { api_token } = getStateContext()

	$: create_disabled = $api_token == null

	const on_create_chat = () => {
		dispatch('new-chat')
	}
</script>

<div class="panel">
	<button disabled={create_disabled} class="new" on:click={on_create_chat}>
		New chat +
	</button>

	{#if create_disabled}
		<p class="info">
			Creating a new chat is disabled. Please follow the tutorial to set up
			ChatWithMe.
		</p>
	{/if}

	<div class="s-4" />

	<div class="chat">
		<a href="/tutorial">Tutorial & introduction</a>
	</div>

	{#each chats as chat}
		<div class="chat">
			<a href="/{chat.id}">{chat.name}</a>
		</div>
	{/each}
</div>

<style>
	.panel {
		height: 100%;
		width: 300px;
	}

	.chat {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 4px;
		font-size: 0.85rem;
	}

	a {
		color: var(--app-text-color);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}

	.info {
		border: 2px solid orange;
		padding: 16px;
	}

	button.new {
		width: 100%;
	}
</style>
