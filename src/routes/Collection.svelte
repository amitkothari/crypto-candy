<script>
  import { user } from '../store.js';
  import Modal from '../components/Modal.svelte';
  import UserCollection from '../components/UserCollection.svelte';
  import Loader from '../components/Loader.svelte';
  import {
    getCollection,
    createCollection,
  } from '../flow/flow';

  let isProcessingTransaction = false;
  let collectionCreated = false;
  const handleCreateCollection = async () => {
    isProcessingTransaction = true;
    try {
      await createCollection($user.addr);
      collectionCreated = true;
    } catch (error) {}
    isProcessingTransaction = false;    
  };

</script>

{#if isProcessingTransaction}
  <Modal message="Processing transaction..." />
{/if}

{#if $user?.loggedIn}
  {#await getCollection($user.addr)}
    <Loader />
  {:then hasCollection}
    {#if hasCollection || collectionCreated}
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
  <span class="text-white text-4xl text-center">Please login to view your collection.</span>
{/if}
