<script>
  import { Router, Route } from 'svelte-routing';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Home from './routes/Home.svelte';
  import Collection from './routes/Collection.svelte';
  import * as fcl from '@onflow/fcl';
  import config from './config';

  export let url = '';
  fcl.config(config);
</script>

<Router {url}>
  <div class="h-full min-h-screen flex flex-col bg-blue-900">
    <Header />
    <div class="flex flex-1 justify-center items-center">
      <Route path="collection" component={Collection} />
      <Route path="/"><Home /></Route>
    </div>
    <Footer />
  </div>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
