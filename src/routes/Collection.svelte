<script>
  import { user } from '../store.js';
  import Modal from '../components/Modal.svelte';
  import UserCollection from '../components/UserCollection.svelte';
  import Loader from '../components/Loader.svelte';
  import ErrorAlert from '../components/ErrorAlert.svelte';
  import {
    getCollection,
    createCollection,
  } from '../flow/flow';

  let isProcessingTransaction = false;
  let collectionCreated = false;
  let errorMessage = '';

  const hideErrorMessage = () => {
    errorMessage = '';
  }

  const handleCreateCollection = async () => {
    hideErrorMessage();
    isProcessingTransaction = true;
    try {
      await createCollection($user.addr);
      collectionCreated = true;
    } catch (error) {
      errorMessage = error.message || 'Unable to process your request: please make sure you are logged in and have sufficient balance.';
    }
    isProcessingTransaction = false;    
  };

</script>

{#if isProcessingTransaction}
  <Modal message="Processing transaction..." />
{/if}

<div class="flex flex-col flex-1 mx-auto max-w-7xl">
  {#if errorMessage}
   <ErrorAlert message={errorMessage} handleCloseAlert={hideErrorMessage}/>
  {/if}

  <div
    class="flex flex-col flex-1 justify-center items-center">
    {#if $user?.loggedIn}
      {#await getCollection($user.addr)}
        <Loader />
      {:then hasCollection}
        {#if hasCollection || collectionCreated}
          <UserCollection />
        {:else}
          <button
            class="bg-white text-blue-700 rounded-full py-2 px-6 hover:bg-blue-700 hover:text-white"
            data-testid="create-collection"
            on:click={handleCreateCollection}>
            Create collection
          </button>
        {/if}
      {/await}
    {:else}
      <span class="text-white text-4xl text-center">Please login to view your collection.</span>
    {/if}
  </div>
</div>
