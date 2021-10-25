<script>
  import { user } from '../store.js';
</script>

<section
  class="w-full flex-col p-4 flex justify-between items-center sm:flex-row"
>
  <div class="">
    <a href="/" class="text-white px-5">Home</a>
    <a href="/collection" class="text-white px-5">Collection</a>
  </div>

  <div class="">
    {#if $user?.loggedIn}
      <span class="px-4 text-white">
        Hello <span class="text-yellow-300">{$user.addr}</span>
      </span>
      <button
        class="bg-white text-blue-700 rounded-full py-1 px-4 hover:bg-blue-700 hover:text-white"
        on:click={user.logout}>
        Log out
      </button>
    {:else}
      <button
        class="bg-white text-blue-700 rounded-full py-1 px-4 hover:bg-blue-700 hover:text-white"
        on:click={user.login}>
        Log in
      </button>
    {/if}
  </div>
</section>
