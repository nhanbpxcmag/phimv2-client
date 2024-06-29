<script lang="ts">
  import { titlePageDefault } from "$lib/configs";
  import { storeAuth } from "$lib/stores";
  import { titlePage } from "$lib/stores/apps/storePage";
  import { store_settings } from "$lib/stores/apps/storeSettings";
  import "$lib/styles/app.scss";
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  store_settings.setOption(data.settings);
  $titlePage = titlePageDefault;
  onMount(() => {
    storeAuth.check();
  });
</script>

<svelte:head>
  <title>{$titlePage}</title>
</svelte:head>

<div class="min-h-screen1">
  <slot />
</div>
