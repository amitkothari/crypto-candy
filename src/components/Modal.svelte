<script>
  import Loader from '../components/Loader.svelte';
  export let message;
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-gray-500 bg-opacity-90 transition-opacity">
  <Loader />
  <span class="text-white px-5">{message}</span>
</div>
