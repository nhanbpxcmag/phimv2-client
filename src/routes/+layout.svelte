<script lang="ts">
  import Header from "$lib/components/pages/header/header.svelte";
  import { titlePage } from "$lib/stores/apps/storePage";
  import { store_settings } from "$lib/stores/apps/storeSettings";
  import "$lib/styles/app.scss";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  store_settings.setOption(data.settings);
</script>

<svelte:head>
  <title>{$titlePage}</title>
</svelte:head>

<Header />
<slot />
