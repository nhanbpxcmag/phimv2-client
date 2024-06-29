<script lang="ts">
  import clsx from "clsx";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { call_phim_list_home } from "$lib/api/phim/phim.query";
  import LoadingInfinity from "$lib/components/ui/loading/loading-infinity.svelte";
  import { query_name } from "$lib/configs";
  import { storeGraphqlClient } from "$lib/stores/apps/storeGraphqlClient";
  import { createQuery } from "@tanstack/svelte-query";
  import ListPhimItem from "./list-phim-item.svelte";

  let h: number[] = [];
  let xyz = "xyz-in";
  let max_h_img = 0;
  $: list = createQuery({
    queryKey: query_name.call_phim_list_home,
    queryFn: async () => {
      return await call_phim_list_home(storeGraphqlClient.getGraphQLClient());
    },
  });
  beforeNavigate(({ from, to }) => {
    xyz = "xyz-out";
  });
  afterNavigate(({}) => {
    xyz = "xyz-in";
  });
</script>

<div class="container my-4">
  {#if $list.isFetching}
    <div class="flex items-center justify-center w-full mt-10">
      <LoadingInfinity class="text-accent" size="7rem" />
    </div>
  {/if}
  {#if $list.isError}
    <p>Error: {$list.error.message}</p>
  {/if}
  {#if $list.isSuccess && !$list.isFetching}
    {#if $list && $list.data.phim_list?.length}
      <div class="grid grid-cols-2 gap-x-4 gap-y-8 2xl:grid-cols-3 4xl:grid-cols-4 6xl:grid-cols-5 tv40:grid-cols-4">
        {#each $list.data.phim_list as item, key}
          {#if item}
            <div class={clsx(xyz)} xyz="fade up-2 delay-3 duration-10">
              <ListPhimItem {item} />
            </div>
          {/if}
        {/each}
      </div>
    {:else}
      <div class="flex justify-center my-16 text-6xl text-error"><i>Không có dữ liệu</i></div>
    {/if}
  {/if}
</div>
