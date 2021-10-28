<script>
  import { navigate } from 'svelte-routing';
  import Card from '../components/Card.svelte';
  import Loader from '../components/Loader.svelte';
  import Modal from '../components/Modal.svelte';
  import ErrorAlert from '../components/ErrorAlert.svelte';
  import { user } from '../store.js';
  import { getCollection, getVarieties, mintCandy } from '../flow/flow';

  let isProcessingTransaction = false;
  let errorMessage = '';

  const hideErrorMessage = () => {
    errorMessage = '';
  }

  const buyCandy = async (varietyId, amount) => {
    isProcessingTransaction = true;
    try {
      await mintCandy(varietyId, amount);
    } catch (error) {
      errorMessage = error.message || 'Unable to process your request: please make sure you are logged in and have sufficient balance.';
    }
    isProcessingTransaction = false;   
  }

  const buy = async (varietyId, amount) => {
    hideErrorMessage();
    await user.login();
    const collection = await getCollection($user.addr);
    if (!collection) {
      navigate('/collection', { replace: true });
    } else {
      await buyCandy(varietyId, amount);
    }
  };
</script>

{#if isProcessingTransaction}
  <Modal message="Processing transaction..." />
{/if}

<div
  class="flex flex-col justify-center items-center px-16 mx-auto max-w-7xl">
  {#if errorMessage}
   <ErrorAlert message={errorMessage} handleCloseAlert={hideErrorMessage}/>
  {/if}
  <span
    data-testid="heading"
    class="text-white text-5xl md:text-7xl pt-20  text-center">
    <span class="text-yellow-300">Crypto</span> Candy
  </span>
  <span data-testid="sub-heading" class="text-white pt-4 pb-20 text-center">
    Collect and trade crypto candy on <span class="text-yellow-300">Flow</span> blockchain
  </span>
  {#await getVarieties()}
    <Loader />
  {:then varieties}
    <div
      data-testid="varieties-grid"
      class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {#each Object.values(varieties) as variety}
        <Card {...variety} handleBuyCandy={buy} />
      {/each}
    </div>
  {/await}
</div>

