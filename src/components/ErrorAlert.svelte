

<script>
  import { afterUpdate } from 'svelte';

  export let message;
  export let handleCloseAlert;

  afterUpdate(() => {
		setInterval(handleCloseAlert, 5000)
	});
</script>

<div data-testid="error-alert" class="flex justify-between bg-red-300 border border-red-400 text-red-900 p-2 rounded w-full" role="alert">
  {message}
</div>
