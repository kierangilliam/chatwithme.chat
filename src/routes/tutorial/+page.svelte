<script lang="ts">
	import { getStateContext } from '$lib/client/state'
	import ChatTemplate from '$lib/components/Chat/ChatTemplate.svelte'
	import ChatInput from '$lib/components/Chat/ChatInput.svelte'
	import Message from '$lib/components/Message.svelte'

	const { set_api_token } = getStateContext()

	let chat_input = ''

	const on_set_api_token = async (ev: CustomEvent<string>) => {
		await set_api_token(ev.detail)
		// TODO: See if token is valid by querying user api
		chat_input = ''
	}
</script>

<ChatTemplate>
	<svelte:fragment>
		<Message role="user">What is ChatWithMe?</Message>

		<Message role="assistant">
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
		</Message>

		<Message role="user">How do I use ChatWithMe?</Message>

		<Message role="assistant">
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

				<li>Paste the API key into the below chat box.</li>
			</ul>
		</Message>

		<Message role="user">What other features are coming soon?</Message>

		<Message role="assistant">
			<ol>
				<li>
					Browser extension: for quick access, content summarization, and more
				</li>
				<li>
					The ability to configure chat personalities (concise and
					informational, witty, friendly, etc)
				</li>
				<li>Customize your ChatWithMe appearance</li>
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
		</Message>
	</svelte:fragment>

	<svelte:fragment slot="input">
		<ChatInput
			bind:value={chat_input}
			on:submit={on_set_api_token}
			placeholder="API token"
		/>
	</svelte:fragment>
</ChatTemplate>

<style>
	ul,
	ol {
		margin: 0;
	}
	li {
		margin-bottom: 12px;
	}

	a {
		color: var(--message-link-color);
	}
</style>
