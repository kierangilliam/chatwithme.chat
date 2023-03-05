<!-- TODO: Make this a chat tab -->

<h2>ChatWithMe - Security</h2>

<p>All of your data is stored locally on your machine.</p>

<p>I do not have access to your API token or chat history.</p>

<div>
	You can verify this using two methods:
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
				repo
			</a>.
		</li>
	</ol>
</div>

<a href="/tutorial">go back to chat</a>

<footer>
	<p>
		A project by <a
			target="_blank"
			rel="noreferrer"
			href="https://twitter.com/kierangilliam"
		>
			Kieran Gill
		</a>
	</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 4px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 4px 0;
		}
	}
</style>
