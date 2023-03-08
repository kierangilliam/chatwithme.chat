<script lang="ts">
	import './styles.css'
	import type { ChatWithMe } from '$lib/client/OpenAI'
	import LHSPanel from '$lib/components/LHSPanel/LHSPanel.svelte'
	import { setStateContext } from '$lib/client/state'
	import { derived } from 'svelte/store'
	import { goto } from '$app/navigation'
	import { persistent } from '$lib/utils/svelte'

	const persisted = persistent<{ api_token: string | null }>('state', {
		api_token: null,
	})

	const chats = persistent<ChatWithMe.Models.Chat[]>('chat-history-v1', [])

	setStateContext({
		chats,
		api_token: derived(persisted, ($persisted) => $persisted.api_token),
		set_api_token: async (token: string) => {
			$persisted.api_token = token
		},
		add_message: (id: string, message: ChatWithMe.API.Message) => {
			$chats = $chats.map((chat) => {
				if (chat.id !== id) return chat
				chat.messages.push(message)
				return chat
			})
		},
	})

	const on_new_chat = async () => {
		const id = `${$chats.length + 1}`

		$chats = [
			...$chats,
			{
				created_at: Date.now(),
				messages: [],
				id,
				name: `New chat #${$chats.length + 1}`,
			},
		]

		await goto(`/${id}`)
	}
</script>

<svelte:head>
	<title>ChatWithMe</title>
	<meta name="description" content="ChatWithMe - Open source ChatGPT UI" />
</svelte:head>

<div class="app">
	<LHSPanel on:new-chat={on_new_chat} chats={$chats} />

	<div class="chat">
		<slot />
	</div>
</div>

<style>
	:global(body) {
		min-height: 100vh;
		max-height: 100vh;
		overflow: hidden;
	}

	.app {
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
	}

	.chat {
		flex: auto;
		position: relative;
	}
</style>
