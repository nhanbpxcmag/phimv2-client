<script lang="ts">
  import { browser } from "$app/environment";
  import { loadingPage } from "$lib/stores/apps/storeLoadingPage";
  import { titlePage, store_url_api } from "$lib/stores/apps/storePage";
  import { store_settings } from "$lib/stores/apps/storeSettings";
  import "$lib/styles/app.scss";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { Toaster } from "svelte-sonner";
  import type { LayoutData } from "./(home)/$types";
  import LoadingSpinner from "$lib/components/ui/loading/loading-spinner.svelte";
  import { storeGraphqlClient } from "$lib/stores/apps/storeGraphqlClient";
  import { onMount } from "svelte";

  export let data: LayoutData;

  let window_innerWidth: number, window_clientHeight: number, body_clientWidth: number, body_clientHeight: number;

  store_settings.setOption(data.settings);
  $store_url_api = data.api;
  storeGraphqlClient.setUrlApi(data.api.g);
  function setWidthXScroll(params: { window_innerWidth: number; body_clientWidth: number }) {
    if (!browser) return;
    function getPaddingProperty(documentElement: HTMLElement) {
      // RTL <body> scrollbar
      const documentLeft = documentElement.getBoundingClientRect().left;
      const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
      return scrollbarX ? "paddingLeft" : "paddingRight";
    }
    const scrollbarWidth = params.window_innerWidth - params.body_clientWidth || 0;
    const paddingProperty = getPaddingProperty(document.documentElement);
    const scrollbarSidePadding = window.getComputedStyle(document.body)[paddingProperty];
    document.documentElement.style.setProperty("--scrollbarX", `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`);
  }
  function setHeightClient(h: number) {
    if (!browser) return;
    document.documentElement.style.setProperty("--h-client", `${h}px`);
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });
  $: setWidthXScroll({ body_clientWidth, window_innerWidth });
  $: setHeightClient(window_clientHeight);
</script>

<svelte:window bind:innerWidth={window_innerWidth} bind:innerHeight={window_clientHeight} />
<div
  class="absolute w-full h-full opacity-0 bg-neutral"
  bind:clientWidth={body_clientWidth}
  bind:clientHeight={body_clientHeight}
></div>
<svelte:head>
  <title>{$titlePage}</title>
</svelte:head>
<!-- <div class="fixed z-[9999] top-4 left-4 bg-neutral text-neutral-content">{window_clientHeight} {body_clientHeight}</div> -->
<QueryClientProvider client={queryClient}>
  <slot />
  <!-- <div class="w-screen h-6 bg-neutral/80"></div> -->
</QueryClientProvider>
{#if $loadingPage}
  <div
    class="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] overflow-hidden backdrop-blur bg-base-200/30 flex flex-col items-center justify-center"
  >
    <LoadingSpinner size="6rem" />
  </div>
{/if}
<Toaster richColors expand={true} closeButton position="top-right" />
