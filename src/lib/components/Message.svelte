<script lang="ts">
	import { format_message_content } from '$lib/client/format_message'

	export let role: 'user' | 'assistant'
	export let content: string | null = null
</script>

<div
	class="message"
	class:assistant={role === 'assistant'}
	class:user={role === 'user'}
>
	<div class="content">
		{#if !!content}
			{#each format_message_content(content) as block}
				{#if block.type === 'code'}
					<pre class="code">{block.content}</pre>
				{:else}
					<p>{block.content}</p>
				{/if}
			{/each}
		{:else}
			<slot />
		{/if}
	</div>
</div>

<style>
	.message {
		color: var(--message-text-color);
		padding: 1.5rem 0;
		width: 100%;
		border-radius: 2px;
	}
	.message.user {
		background: var(--message-user-background);
	}
	.message.assistant {
		background: var(--message-assistant-background);
	}

	.content {
		margin: auto;
		max-width: 48rem;
	}

	.code {
		font-family: var(--code-block-font);
		background: var(--code-block-background);
		padding: 8px 12px;
	}
</style>
