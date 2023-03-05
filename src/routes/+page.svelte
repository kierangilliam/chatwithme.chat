<script lang="ts">
	import { persistent } from '$lib/utils/svelte';
	import { OpenAIAPI, type ChatWithMe } from '$lib/client/OpenAI';
	import { dev } from '$app/environment';
	import { tick } from 'svelte';
	import Chat from '$lib/components/Chat/Chat.svelte';

	const state = persistent<{ intro_hidden: boolean; api_token: string | null }>(
		'state',
		{ api_token: null, intro_hidden: false }
	);

	const api = new OpenAIAPI();

	let messages: ChatWithMe.API.Message[] = [];

	let chat_text: string = '';
	let chat_is_loading = false;

	$: api.update_api_token($state.api_token ?? '');
	$: chat_is_available = ($state.api_token?.length ?? 0) > 5;

	$: if (dev) {
		console.log({ messages });
	}

	const on_submit = async () => {
		if (chat_is_loading) {
			return;
		}

		const message: ChatWithMe.API.Message = {
			content: chat_text.trim(),
			role: 'user'
		};

		messages = [...messages, message];
		chat_is_loading = true;
		chat_text = '';

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

		chat_is_loading = false;
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

				<li>
					Open source: See the code
					<a
						href="https://github.com/kierangilliam/chatwithme.chat"
						target="_blank"
						rel="noreferrer"
					>
						here
					</a>.
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
		</section>

		<section>
			<p>Coming soon</p>

			<ol>
				<li>Multiple saved chat histories</li>
				<li>
					Browser extension: for quick access, content summarization, and more
				</li>
				<li>
					The ability to configure chat personalities (concise and
					informational, witty, friendly, etc)
				</li>
			</ol>

			<p>
				Get notified
				<a
					href="https://forms.gle/PehBv1Ax5H4CwLo47"
					target="_blank"
					rel="noreferrer"
				>
					here
				</a>
				when new features are ready.
			</p>
		</section>

		{#if chat_is_available}
			<div class="s-4" />

			<div>
				<button on:click={() => ($state.intro_hidden = !$state.intro_hidden)}>
					Hide welcome message
				</button>
			</div>
		{/if}

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
	<Chat
		{messages}
		is_loading={chat_is_loading}
		bind:chat_text
		on:submit={on_submit}
	/>
{/if}

<style>
	:global(body) {
		height: 100%;
	}

	:root {
		--intro-background: #191b21;

		/* LHS Panel */
		--panel-background: rgba(32, 33, 35, var(--tw-bg-opacity));

		/* Chat */
		--code-block-font: var(--font-mono);
		--message-spacing: 16px;
		--message-color: #27282e;
	}

	h1 {
		font-size: 20px;
	}

	ul,
	ol {
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

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	section {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 400px) {
		.intro {
			flex-direction: column;
			gap: 20px;
		}
	}
</style>
