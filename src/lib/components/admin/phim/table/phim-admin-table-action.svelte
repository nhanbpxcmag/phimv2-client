<script lang="ts">
  import { PAGE_a_phim_add_slug } from "$lib/ROUTES";
  import type { PhimItem } from "$lib/types/graphql";
  import { Eye, Pencil, Trash2 } from "lucide-svelte";
  import * as AlertDialog from "$lib/components/shadcn/ui/alert-dialog";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { call_phim_delete, type PhimDeleteType } from "$lib/api/phim/phim.mutation";
  import { toast } from "svelte-sonner";
  import type { CustomEventHandler } from "bits-ui";
  import { loadingPage } from "$lib/stores/apps/storeLoadingPage";
  import { query_name } from "$lib/configs";
  import { storeGraphqlClient } from "$lib/stores/apps/storeGraphqlClient";

  export let item: PhimItem;
  const client = useQueryClient();
  let del_file = true;
  let open_delete = false;
  const phim_add = createMutation<PhimDeleteType["data"], any, PhimDeleteType["variables"]>({
    mutationFn: (params: PhimDeleteType["variables"]) =>
      call_phim_delete(params, storeGraphqlClient.getGraphQLClient()),
    onSuccess: (data) => {
      toast.success("Xoá thành công");
      client.refetchQueries({ queryKey: query_name.call_phim_list_admin });
    },
  });

  function handleXoa(e: CustomEventHandler<MouseEvent, HTMLButtonElement>) {
    e.preventDefault();
    loadingPage.show();
    $phim_add.mutateAsync({ id: item.id, del_file });
    loadingPage.hide();
    open_delete = false;
  }
</script>

<div>
  <button class="btn btn-info btn-outline btn-sm"><Eye size="20px" /></button>
  <a class="btn btn-success btn-outline btn-sm" href={PAGE_a_phim_add_slug({ slug: item.id })}>
    <Pencil size="20px" />
  </a>
  <AlertDialog.Root closeOnOutsideClick={true} bind:open={open_delete}>
    <AlertDialog.Trigger
      ><button class="btn btn-error btn-outline btn-sm"><Trash2 size="20px" /></button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Xác nhận xoá?</AlertDialog.Title>
        <AlertDialog.Description>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Xoá file</span>
              <input type="checkbox" bind:checked={del_file} class="checkbox" />
            </label>
          </div>
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Không</AlertDialog.Cancel>
        <AlertDialog.Action
          on:click={(e) => {
            handleXoa(e);
          }}
          class="btn btn-error">Có</AlertDialog.Action
        >
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</div>
