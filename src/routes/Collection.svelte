<script>
  import { user } from '../store.js';
  import Card from '../components/Card.svelte';
  import Modal from '../components/Modal.svelte';
  import UserCollection from '../components/UserCollection.svelte';
  import Loader from '../components/Loader.svelte';
  import {
    getCollection,
    createCollection,
    getUserCandies,
  } from '../flow/flow';

  let isProcessingTransaction = false;
  let userCollection;
  const handleCreateCollection = async () => {
    isProcessingTransaction = true;
    await createCollection($user.addr);
    isProcessingTransaction = false;
    userCollection = true;
  };

</script>

{#if isProcessingTransaction}
  <Modal message="Processing transaction..." />
{/if}

{#if $user?.loggedIn}
  {#await getCollection($user.addr)}
    <Loader />
  {:then hasCollection}
    {#if hasCollection || userCollection}
      <UserCollection />
    {:else}
      <button
        class="bg-white text-blue-700 rounded-full py-2 px-6 hover:bg-blue-700 hover:text-white"
        on:click={handleCreateCollection}>
        Create collection
      </button>
    {/if}
  {/await}
{:else}
  <span class="text-white text-4xl">Please login to view your collection.</span>
{/if}
