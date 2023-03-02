<script lang="ts">
	import { persistent } from '$lib/utils/svelte';
	import { OpenAIAPI, type ChatWithMe } from '$lib/client/OpenAI';
	import { dev } from '$app/environment';
	import { format_message_content } from '$lib/client/format_message';
	import { tick } from 'svelte';
	import TextArea from './TextArea.svelte';

	// TODO: control+enter to submit

	const state = persistent<{ intro_hidden: boolean; api_token: string | null }>(
		'state',
		{ api_token: null, intro_hidden: false }
	);

	const api = new OpenAIAPI();

	let messages: ChatWithMe.API.Message[] = [];
	let chat_box: string = '';
	let is_loading = false;

	$: api.update_api_token($state.api_token ?? '');
	$: chat_is_available = ($state.api_token?.length ?? 0) > 5;

	$: if (dev) {
		console.log({ messages });
	}

	const on_submit = async () => {
		if (is_loading) {
			return;
		}

		const message: ChatWithMe.API.Message = {
			content: chat_box.trim(),
			role: 'user'
		};

		messages = [...messages, message];
		is_loading = true;
		chat_box = '';

		await tick();
		window.scrollTo({ top: 1_000_000 });

		const response = await api.completion(messages);

		if (dev) {
			console.log(response);
		}

		if (response.type == 'success') {
			// TODO: Present other messages to user
			messages = [...messages, response.data.choices[0].message];
		} else {
			window.alert(`Error: ${response.message}`);
			console.error(response);
			// TODO: Add error to chat history
		}

		await tick();
		window.scrollTo({ top: 1_000_000 });

		is_loading = false;
	};

	const on_api_token_blur = () => {
		$state.intro_hidden = chat_is_available;
	};
</script>

<svelte:head>
	<title>ChatWithMe</title>
	<meta name="description" content="ChatWithMe - Open source ChatGPT UI" />
</svelte:head>

<div class="intro" class:intro-hidden={$state.intro_hidden}>
	{#if !$state.intro_hidden}
		<h1>ChatWithMe - Free and open source ChatGPT UI</h1>

		<section>
			<ul>
				<li>Easy: No login required.</li>

				<li>
					Cost efficient: Cheaper than ChatGPT Pro. Only pay for what you use.
				</li>

				<li>
					Private: Your chat history is only visible to you and OpenAI - no
					intermediaries.
				</li>

				<li>
					Secure: API tokens are not sent to anyone other than AI.
					<a href="/security"> How you can verify this</a>.
				</li>
			</ul>
		</section>

		<section>
			<p>How does ChatWithMe this work?</p>

			<ul>
				<li>
					<a
						rel="noreferrer"
						href="https://platform.openai.com/signup"
						target="_blank"
					>
						Get an OpenAI account
					</a>
				</li>

				<li>
					<a
						rel="noreferrer"
						href="https://platform.openai.com/account/api-keys"
						target="_blank"
					>
						Generate an API key
					</a>
				</li>

				<li>Paste the API key into the below input</li>
			</ul>

			{#if chat_is_available}
				<div class="s-4" />

				<div>
					<button on:click={() => ($state.intro_hidden = !$state.intro_hidden)}>
						Hide welcome message
					</button>
				</div>
			{/if}
		</section>

		<div class="s-4" />
	{:else}
		<button on:click={() => ($state.intro_hidden = !$state.intro_hidden)}>
			Show welcome message
		</button>
	{/if}

	<section class="api-token-input">
		<form on:submit|preventDefault={on_api_token_blur}>
			<label for="api_token">API token</label>
			<input
				type="password"
				id="api_token"
				bind:value={$state.api_token}
				on:blur={on_api_token_blur}
				autocomplete="off"
			/>
		</form>
	</section>
</div>

{#if chat_is_available}
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

		<form class="chatbox" on:submit|preventDefault={on_submit}>
			<TextArea bind:value={chat_box} on:submit={on_submit} />

			<button type="submit" disabled={is_loading}>Submit</button>
		</form>
	</section>
{/if}

<style>
	:global(body) {
		height: 100%;
	}

	:root {
		--intro-background: #191b21;
		--message-spacing: 16px;
		--message-color: #27282e;
	}

	h1 {
		font-size: 20px;
	}

	ul {
		margin: 0;
	}
	li {
		margin-bottom: 12px;
	}

	.s-4 {
		width: 16px;
		height: 16px;
	}

	button {
		background: #5d61ed;
		border: 0px;
		padding: 8px 12px;
		color: white;
		font-weight: bold;
	}

	.intro {
		padding: 12px;
		background-color: var(--intro-background);
		margin-bottom: var(--message-spacing);
	}
	.intro-hidden {
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		justify-content: space-between;
	}

	.api-token-input {
		max-width: 250px;
	}

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

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.chatbox {
		margin-top: var(--message-spacing);
	}

	section {
		display: flex;
		flex-direction: column;
	}

	.message {
		padding: 8px 12px;
		background: var(--message-color);
		border: 1px solid #2f3036;
		border-radius: 2px;
	}
	.message.assistant {
		border: 1px solid #2a447f;
	}

	.code {
		font-family: var(--font-mono);
		background-color: lightcyan;
		padding: 8px 12px;
	}

	@media (max-width: 400px) {
		.intro {
			flex-direction: column;
			gap: 20px;
		}
	}
</style>
