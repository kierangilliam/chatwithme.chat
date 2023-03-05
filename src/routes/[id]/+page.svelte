<script lang="ts">
	import { OpenAIAPI, type ChatWithMe } from '$lib/client/OpenAI'
	import { browser, dev } from '$app/environment'
	import { tick } from 'svelte'
	import { page } from '$app/stores'
	import { getStateContext } from '$lib/client/state'
	import { goto } from '$app/navigation'
	import ChatTemplate from '$lib/components/Chat/ChatTemplate.svelte'
	import Message from '$lib/components/Message.svelte'
	import ChatInput from '$lib/components/Chat/ChatInput.svelte'
	import { onMount } from 'svelte'

	const api = new OpenAIAPI()

	const { api_token, chats, add_message } = getStateContext()
	const chat_id = $page.params.id

	let messages_container_handle: HTMLElement
	let chat_text: string = ''
	let is_loading = false

	let chat = $chats.find((chat) => chat.id === chat_id)
	if (browser && !chat) {
		goto('/tutorial')
	}

	$: chat = $chats.find((chat) => chat.id === chat_id)
	$: messages = chat?.messages ?? []
	$: api.update_api_token($api_token ?? '')

	$: if (dev) {
		console.log({ messages })
	}

	onMount(() => {
		messages_container_handle.scrollTo({ top: 1_000_000 })
	})

	const on_submit = async () => {
		if (is_loading) {
			return
		}

		add_message(chat_id, {
			content: chat_text.trim(),
			role: 'user',
		})

		is_loading = true
		chat_text = ''

		await tick()
		messages_container_handle.scrollTo({ top: 1_000_000 })

		const response = await api.completion(messages)

		if (dev) {
			console.log(response)
		}

		if (response.type == 'success') {
			// TODO: Present other messages to user
			add_message(chat_id, response.data.choices[0].message)
		} else {
			window.alert(`Error: ${response.message}`)
			console.error(response)
			// TODO: Add error to chat history
		}

		await tick()
		messages_container_handle.scrollTo({ top: 1_000_000 })

		is_loading = false
	}
</script>

<svelte:head>
	<title>{chat?.name} - ChatWithMe</title>
	<meta name="description" content="ChatWithMe - Open source ChatGPT UI" />
</svelte:head>

<ChatTemplate bind:messages_container_handle>
	<svelte:fragment>
		{#each messages as message}
			<Message {...message} />
		{:else}
			<div class="message assistant">
				<p>Welcome to ChatWithMe. Send a message below to get started.</p>
			</div>
		{/each}
	</svelte:fragment>

	<svelte:fragment slot="input">
		<ChatInput
			bind:value={chat_text}
			disabled={is_loading}
			on:submit={on_submit}
		/>
	</svelte:fragment>
</ChatTemplate>
