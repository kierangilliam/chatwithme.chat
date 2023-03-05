<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'

	// TODO: 302 redirect
	// TODO: redirect to last known chat ID
	if (browser) {
		goto('/tutorial')
	}
</script>
