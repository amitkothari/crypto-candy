<script>
  import { user } from '../store.js';
  import { getUserCandies } from '../flow/flow';
  import Card from './Card.svelte';
  import Loader from './Loader.svelte';  
</script>

<div data-testid="user-collection">
  {#await getUserCandies($user.addr)}
    <Loader />
  {:then candies}
    {#if candies && candies.length > 0}
      <div class="flex flex-col justify-center items-center">
        <span class="text-white text-2xl p-24">
          Here are the <span class="text-yellow-300">candies</span> you have collected:
        </span>
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {#each candies as candy}
            <Card {...candy} />
          {/each}
        </div>
      </div>
    {:else}
      <span class="text-white text-2xl">Your collection is empty.</span>
    {/if}
  {/await}
</div>
