<script>
  export let name;
  export let price;
  export let varietyId;
  export let handleBuyCandy = null;

  const getImage = (candyName) => candyName.toLowerCase().replace(/ /g, '-') + '.svg';
</script>

<div
  data-testid="candy-card"
  class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex flex-col items-center justify-center col-span-1 bg-blue-700 p-10 rounded-2xl max-w-lg">
  <object width="160" height="160" title={name} data={getImage(name)} type="image/svg+xml" />
  <span class="text-white"># {varietyId}</span>
  <span class="text-xl text-white text-center py-3">{name}</span>
  {#if handleBuyCandy}
    <button
      data-testid={`buy-candy-${varietyId}`}
      class="text-white border-2 border-white px-20 py-2 rounded-full max-w-md"
      on:click={() => handleBuyCandy(varietyId, price)}>
      <span class="flex">
        <object width="24" height="24" title="Buy" data="cart.svg" type="image/svg+xml" />
        <span class="px-2">{parseInt(price)}</span>FUSD
      </span>
    </button>
  {/if}
</div>
