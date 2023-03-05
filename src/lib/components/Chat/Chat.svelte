<script lang="ts">
	import type { ChatWithMe } from '$lib/client/OpenAI';
	import { format_message_content } from '$lib/client/format_message';
	import TextArea from './TextArea.svelte';
	import { createEventDispatcher } from 'svelte';

	export let messages: ChatWithMe.API.Message[];
	export let is_loading: boolean;
	export let chat_text: string;

	const dispatch = createEventDispatcher<{ submit: void }>();

	const on_submit = () => {
		dispatch('submit');
	};
</script>

<section class="chat">
	<div class="messages">
		{#each messages as message}
			<div
				class="message"
				class:assistant={message.role === 'assistant'}
				class:user={message.role === 'user'}
			>
				{#each format_message_content(message.content) as block}
					{#if block.type === 'code'}
						<pre class="code">{block.content}</pre>
					{:else}
						<p>{block.content}</p>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="message assistant">
				<p>Welcome to ChatWithMe. Send a message below to get started.</p>
			</div>
		{/each}
	</div>

	<form on:submit|preventDefault={on_submit}>
		<TextArea bind:value={chat_text} on:submit={on_submit} />

		<button type="submit" disabled={is_loading}>Submit</button>
	</form>
</section>

<style>
	.chat {
		width: 100%;
		height: 100%;
		flex: 1;
	}

	.messages {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		overflow-y: scroll;
	}

	.message {
		padding: 8px 12px;
		background: var(--message-color);
		border: 1px solid #2f3036;
		border-radius: 2px;
		margin-bottom: 8px;
	}
	.message.assistant {
		border: 1px solid #2a447f;
	}

	.code {
		font-family: var(--code-block-font);
		background-color: lightcyan;
		padding: 8px 12px;
	}

	form {
		margin-top: var(--message-spacing);
	}
</style>
