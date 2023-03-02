<script lang="ts">
	import { persistent } from '$lib/utils/svelte';
	import { OpenAIAPI, type ChatWithMe } from '$lib/client/OpenAI';

	const credentials = persistent<{ token: string | null }>(
		'openai-credentials',
		{ token: null }
	);
	const api = new OpenAIAPI();

	let messages: ChatWithMe.API.Message[] = [];
	let chat_box: string = '';
	let is_loading = false;

	$: api.update_api_token($credentials.token ?? '');

	const on_submit = async () => {
		const message: ChatWithMe.API.Message = {
			content: chat_box.trim(),
			role: 'user'
		};

		messages = [...messages, message];
		is_loading = true;
		chat_box = '';

		const response = await api.completion([message]);

		if (response.type == 'success') {
			console.log(response.data);
			// TODO: Present other messages to user
			messages = [...messages, response.data.choices[0].message];
		} else {
			window.alert(`Error: ${response.kind}`);
			console.error(response);
		}

		console.log(message);
		is_loading = false;
	};
</script>

<svelte:head>
	<title>ChatWithMe</title>
	<meta name="description" content="ChatWithMe - Open source ChatGPT UI" />
</svelte:head>

<section>
	<input type="password" bind:value={$credentials.token} autocomplete="off" />

	{#each messages as message}
		<p
			class="message"
			class:assistant={message.role === 'assistant'}
			class:user={message.role === 'user'}
		>
			{message.content.trim()}
		</p>
	{/each}

	<textarea bind:value={chat_box} disabled={is_loading} />

	<button disabled={is_loading} on:click={on_submit}>Submit</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
	}

	.message.user {
		background-color: aliceblue;
	}
	.message.assistant {
		background-color: antiquewhite;
	}
</style>
