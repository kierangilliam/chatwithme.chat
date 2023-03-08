<script lang="ts">
	export let messages_container_handle: HTMLElement | null = null
</script>

<div class="chat-template">
	<div class="messages" bind:this={messages_container_handle}>
		<slot />
		<div class="final" />
	</div>

	<div class="input-wrapper">
		<slot name="input" />
	</div>
</div>

<style>
	.chat-template {
		position: absolute;
		left: 0;
		right: 0;
	}

	.messages {
		height: 100vh;
		top: 0;
		right: 0;
		left: 0;
		overflow-y: scroll;
	}

	.final {
		height: 6rem;
	}

	.input-wrapper {
		position: sticky;
		display: flex;
		justify-content: center;
		width: 100%;
		padding-top: 24px;
		padding-bottom: 12px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-image: linear-gradient(
			180deg,
			rgba(53, 55, 64, 0),
			#353740 58.85%
		);
	}

	@media only screen and (max-width: 640px) {
		.chat-template {
			/* Make room for the mobile navigation menu */
			padding-top: 48px;
		}

		.messages {
			/* Make room for the chat input */
			height: 95vh;
		}
	}
</style>
