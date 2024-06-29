<script lang="ts">
  import { call_phim_list_admin } from "$lib/api/phim/phim.query";
  import PhimAdminTable from "$lib/components/admin/phim/table/phim-admin-table.svelte";
  import LoadingSpinner from "$lib/components/ui/loading/loading-spinner.svelte";
  import { query_name } from "$lib/configs";
  import { PAGE_a_phim_add } from "$lib/ROUTES";
  import { titlePage } from "$lib/stores";
  import { storeGraphqlClient } from "$lib/stores/apps/storeGraphqlClient";
  import type { PhimItem } from "$lib/types/graphql";
  import { createQuery } from "@tanstack/svelte-query";

  let data: PhimItem[];
  $: list = createQuery({
    queryKey: query_name.call_phim_list_admin,
    queryFn: async () => await call_phim_list_admin(storeGraphqlClient.getGraphQLClient()),
  });

  $titlePage = "Quản lý phim";
  $: data = $list.data?.phim_list_admin as PhimItem[];
</script>

<div class="flex justify-end">
  <a class="btn btn-success" href={PAGE_a_phim_add}>Thêm</a>
</div>
<div class="my-4">
  {#if $list.isFetching}
    <div class="flex items-center justify-center w-full">
      <LoadingSpinner size="2.5rem" />
    </div>
  {/if}
  {#if $list.isError}
    <p>Error: {$list.error.message}</p>
  {/if}
  {#if $list.isSuccess && !$list.isFetching}
    {#if data && data.length}
      <PhimAdminTable {data} />
    {:else}
      <div class="flex justify-center my-4 text-error"><i>Không có dữ liệu</i></div>
    {/if}
  {/if}
</div>
