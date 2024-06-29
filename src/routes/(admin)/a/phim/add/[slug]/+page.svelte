<script lang="ts">
  import { page } from "$app/stores";
  import { call_phim_by_id } from "$lib/api/phim/phim.query";
  import FormAddEditPhim from "$lib/components/admin/phim/form/form-add-edit-phim.svelte";
  import { formPhimSchema, transformPhimToDataForm } from "$lib/components/admin/phim/form/formAddEditPhim.schema";
  import LoadingSpinner from "$lib/components/ui/loading/loading-spinner.svelte";
  import { query_name } from "$lib/configs";
  import { storeGraphqlClient } from "$lib/stores/apps/storeGraphqlClient";
  import { createQuery } from "@tanstack/svelte-query";
  import { defaults } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";

  $: data = createQuery({
    queryKey: query_name.call_phim_by_id,
    queryFn: async () => await call_phim_by_id(Number($page.params.slug), storeGraphqlClient.getGraphQLClient()),
  });
</script>

<!-- {#if $data.isFetching}
  <div class="flex items-center justify-center w-full">
    <LoadingSpinner size="2.5rem" />
  </div>
{/if} -->
{#if $data.isError}
  <p>Error: {$data.error.message}</p>
{/if}
{#if $data.isSuccess && !$data.isFetching}
  {#if $data.data && $data.data.phim_by_id}
    <FormAddEditPhim
      data={defaults(zod(formPhimSchema, { defaults: { ...transformPhimToDataForm($data.data.phim_by_id) } }))}
      id={$data.data.phim_by_id.id}
    />
  {:else}
    <div class="flex justify-center my-4 text-error"><i>Không có dữ liệu</i></div>
  {/if}
{/if}
