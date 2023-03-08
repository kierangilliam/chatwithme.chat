<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { ChatWithMe } from '$lib/client/OpenAI'
	import { getStateContext } from '$lib/client/state'
	import { click_outside } from '$lib/utils/svelte'

	export let chats: ChatWithMe.Models.Chat[]

	const dispatch = createEventDispatcher()
	const { api_token } = getStateContext()

	let open = false

	$: create_disabled = $api_token == null

	const on_create_chat = () => {
		dispatch('new-chat')
	}
</script>

<div class="panel" class:open use:click_outside={() => (open = false)}>
	<div class="top">
		<button class="mobile-close" on:click={() => (open = false)}>
			Hide this panel
		</button>

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

	<div class="bottom">
		<p>
			Want to support this project?
			<a
				target="_blank"
				rel="noreferrer"
				href="https://www.buymeacoffee.com/kierangill"
			>
				Buy me a coffee</a
			>
		</p>
	</div>
</div>

<div class="mobile-navigation">
	<button class="hamburger" on:click|stopPropagation={() => (open = !open)}>
		<div class="patty" />
		<div class="patty" />
		<div class="patty" />
	</button>

	<h1>ChatWithMe</h1>

	<div />
</div>

<style>
	.mobile-navigation,
	.mobile-close {
		display: none;
	}
	.panel {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 300px;
		background: var(--panel-background);
		padding: 16px;
		height: 100vh;
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
		font-size: 1rem;
		padding: 4px;
		border-radius: 4px;
		width: 100%;
	}
	a:hover {
		text-decoration: underline;
		background: var(--message-assistant-background);
	}

	.info {
		border: 2px solid orange;
		padding: 16px;
	}

	button.new {
		width: 100%;
	}

	.bottom * {
		font-size: 0.7rem;
	}
	.bottom a {
		text-decoration: underline;
	}

	@media only screen and (max-width: 640px) {
		.mobile-close,
		.mobile-navigation {
			display: block;
		}

		.mobile-navigation,
		.panel {
			z-index: 10;
		}

		.mobile-navigation {
			z-index: 10;
			position: fixed;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 8px;
			top: 0;
			left: 0;
			right: 0;
			background: var(--app-background);
			box-shadow: var(--chat-input-shadow);
		}
		/* Hide the mobile navigation when panel is visible */
		.panel.open ~ .mobile-navigation {
			display: none;
		}

		.mobile-close {
			background: transparent;
			padding: 0;
			margin-bottom: 16px;
			font-weight: 300;
		}

		.panel {
			position: absolute;
		}
		.panel:not(.open) {
			display: none;
		}

		.mobile-navigation h1 {
			font-size: 12px;
		}

		.hamburger {
			padding: 0;
			background: transparent;
			opacity: 0.6;
		}
		.patty {
			width: 24px;
			height: 2px;
			border-radius: 2px;
			background-color: var(--app-text-color);
			margin: 5px 0;
		}
	}
</style>
