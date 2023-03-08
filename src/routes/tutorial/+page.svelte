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
				<li><strong>Easy</strong>: No login required.</li>

				<li>
					<strong>Cost efficient</strong>: Cheaper than ChatGPT Pro. Only pay
					for what you use. ChatGPT Pro is $20/month but the API only costs
					$0.002/1k tokens.
				</li>

				<p>
					<a
						href="https://en.wikipedia.org/wiki/Natural_language_processing"
						target="_blank"
						rel="noreferrer">This</a
					>
					Wikipedia article is 6,250 words, or 10,240 tokens.
					<em
						>It would only cost $0.02 to send the entire article to ChatGPT
						using the API.</em
					> With ChatWithMe, you have access to almost all of the same features but
					at a fraction of the price of ChatGPT Pro.
				</p>

				<li>
					<strong>Private</strong>: Your chat history is only visible to you and
					OpenAI - no intermediaries.
				</li>

				<li>
					<strong>Secure</strong>: Your API token is not sent to any party other
					than OpenAI. It is stored on your machine, not in the cloud.
				</li>

				<li>
					<strong>Open source</strong>: See the code
					<a
						href="https://github.com/kierangilliam/chatwithme.chat"
						target="_blank"
						rel="noreferrer"
					>
						here</a
					>.
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

		<Message role="user">
			Is this website secure? What happens to my API token?
		</Message>

		<Message role="assistant">
			<p>All of your data is stored locally on your machine.</p>

			<p>
				The website creator does not have access to your API token or chat
				history.
			</p>

			<p>You can verify this using two methods:</p>

			<ol>
				<li>
					Inspect your browser's network requests. You'll only see your API key
					being sent to OpenAI.
				</li>
				<li>
					Read the open source code in this
					<a
						href="https://github.com/kierangilliam/chatwithme.chat"
						target="_blank"
						rel="noreferrer"
					>
						repository</a
					>.
				</li>
			</ol>
		</Message>

		<Message role="user">Who made this?</Message>

		<Message role="assistant">
			<p>
				This project was created by <a
					target="_blank"
					rel="noreferrer"
					href="https://twitter.com/kierangilliam"
				>
					Kieran Gill</a
				>.
			</p>

			<p>
				Like this project?
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.buymeacoffee.com/kierangill"
				>
					Buy me a coffee</a
				>.
			</p>
		</Message>
	</svelte:fragment>

	<svelte:fragment slot="input">
		<ChatInput
			bind:value={chat_input}
			on:submit={on_set_api_token}
			placeholder="Your API token here and then click 'initialize'"
			buttonText="initialize"
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
