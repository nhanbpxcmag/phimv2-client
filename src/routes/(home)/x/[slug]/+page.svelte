<script lang="ts">
  import { page } from "$app/stores";
  import { call_phim_by_id } from "$lib/api/phim/phim.query";
  import Xemphim from "$lib/components/pages/xemphim/xemphim.svelte";
  import LoadingInfinity from "$lib/components/ui/loading/loading-infinity.svelte";
  import { query_name } from "$lib/configs";
  import { storeGraphqlClient } from "$lib/stores/apps/storeGraphqlClient";
  import { createQuery } from "@tanstack/svelte-query";

  $: data = createQuery({
    queryKey: [query_name.call_phim_by_id, $page.params.slug],
    queryFn: async () => await call_phim_by_id(Number($page.params.slug), storeGraphqlClient.getGraphQLClient()),
  });
</script>

<div class="">
  {#if $data.isFetching}
    <div class="flex items-center justify-center w-full mt-10">
      <LoadingInfinity class="text-accent" size="7rem" />
    </div>
  {/if}
  {#if $data.isError}
    <p>Error: {$data.error.message}</p>
  {/if}
  {#if $data.isSuccess && !$data.isFetching}
    {#if $data && $data.data.phim_by_id}
      <Xemphim item={$data.data.phim_by_id} />
    {:else}
      <div class="flex justify-center my-16 text-6xl text-error"><i>Không có dữ liệu</i></div>
    {/if}
  {/if}
</div>
