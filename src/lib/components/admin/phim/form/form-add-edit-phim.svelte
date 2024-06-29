<script lang="ts">
  import { call_phim_add, call_phim_edit, type PhimAddType, type PhimEditType } from "$lib/api/phim/phim.mutation";
  import { call_get_info_tmdb_by_id, type GetInfoByIdTMDBType } from "$lib/api/tmdb/tmdb.query";
  import * as Form from "$lib/components/shadcn/ui/form";
  import Input from "$lib/components/shadcn/ui/input/input.svelte";
  import InputNumber from "$lib/components/shadcn/ui/input/inputNumber.svelte";
  import { createMutation, useMutationState, useQueryClient } from "@tanstack/svelte-query";
  import isFinite from "lodash/isFinite";
  import { tick } from "svelte";
  import { toast } from "svelte-sonner";
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import FormAddEditPhimFile from "./form-add-edit-phim-file.svelte";
  import { formPhimSchema, type FormPhimSuper } from "./formAddEditPhim.schema";
  import TmdbType from "./tmdb-type.svelte";
  import { query_name } from "$lib/configs";
  import { RefreshCcw } from "lucide-svelte";
  import { PAGE_a_phim } from "$lib/ROUTES";
  import LoadingSpinner from "$lib/components/ui/loading/loading-spinner.svelte";
  import { storeGraphqlClient } from "$lib/stores/apps/storeGraphqlClient";

  export let data: FormPhimSuper;
  export let id: number = 0;

  const client = useQueryClient();
  let timeOut: number;

  $: is_edit = id > 0;
  $: dataDefault = data;
  $: disable_btn_tmdb = !$formData.tmdb_id;

  const getInfoTMDBByID = createMutation<GetInfoByIdTMDBType["data"], any, GetInfoByIdTMDBType["variables"]>({
    mutationFn: (params: GetInfoByIdTMDBType["variables"]) =>
      call_get_info_tmdb_by_id(params, storeGraphqlClient.getGraphQLClient()),
    onSuccess: (data) => {
      if (data?.getInfoByIdTMDB) {
        $formData.ten = data.getInfoByIdTMDB.ten;
        $formData.mota = data.getInfoByIdTMDB.mota;
        $formData.poster_path = data.getInfoByIdTMDB.poster_path_tmdb;
        $formData.backdrop_path = data.getInfoByIdTMDB.backdrop_path_tmdb;
        $formData.nam = data.getInfoByIdTMDB.nam;
      }
    },
  });
  const phim_add = createMutation<PhimAddType["data"], any, PhimAddType["variables"]>({
    mutationFn: (params: PhimAddType["variables"]) => call_phim_add(params, storeGraphqlClient.getGraphQLClient()),
    onSuccess: (data) => {
      reset_form();
      toast.success("Thêm thành công");
    },
  });
  const phim_edit = createMutation<PhimEditType["data"], any, PhimEditType["variables"]>({
    mutationFn: (params: PhimEditType["variables"]) => call_phim_edit(params, storeGraphqlClient.getGraphQLClient()),
    onSuccess: (data) => {
      client.refetchQueries({ queryKey: query_name.call_phim_by_id });
      toast.success("Sửa thành công");
    },
  });

  const form = superForm(data, {
    SPA: true,
    resetForm: false,
    clearOnSubmit: "none",
    validators: zod(formPhimSchema),
    async onUpdated({ form }) {
      if (form.valid) {
        if (is_edit) {
          $phim_edit.mutate({
            ...form.data,
            id,
          });
        } else {
          $phim_add.mutate({
            ...form.data,
          });
        }
      }
    },
  });
  const { form: formData, errors, message, enhance, delayed, reset } = form;
  async function reset_form() {
    await tick();
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(async () => {
      reset({ ...dataDefault });
      errors.clear();
    }, 100);
  }
  function loadDataTMDB(
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    },
  ) {
    e.preventDefault();
    if ($formData.tmdb_id && $formData.tmdb_type && isFinite($formData.tmdb_id)) {
      $getInfoTMDBByID.mutate({ tmdb_id: $formData.tmdb_id, tmdb_type: $formData.tmdb_type });
    }
  }

  function focusAndSelect(e: any) {
    e.target?.select();
  }
</script>

<div class="mb-40">
  <form class="grid grid-cols-1 gap-4 3xl:grid-cols-2" method="POST" use:enhance>
    <div class="flex justify-start w-full gap-8 my-4 3xl:col-span-2">
      <Form.Button class=" btn btn-success">
        {#if $phim_add.isPending}
          <LoadingSpinner size="1.5rem" />
        {:else}
          Thực hiện
        {/if}
      </Form.Button>

      {#if is_edit}
        <button
          class="btn btn-outline"
          type="button"
          on:click={() => {
            client.refetchQueries({ queryKey: query_name.call_phim_by_id });
          }}
        >
          <RefreshCcw />Reload
        </button>
      {:else}
        <button
          class="btn btn-outline"
          type="button"
          on:click={() => {
            reset_form();
          }}
          ><RefreshCcw />Reset
        </button>
      {/if}
      <a class="btn btn-ghost" href={PAGE_a_phim}>Back </a>
    </div>
    <Form.Field {form} name="tmdb_id">
      <Form.Control let:attrs>
        <Form.Label>TMDB ID</Form.Label>
        <div class="join">
          <InputNumber class="join-item" {...attrs} bind:value={$formData.tmdb_id} on:focus={focusAndSelect} />
          <div class="indicator">
            <button class="btn join-item btn-info" type="button" on:click={loadDataTMDB} disabled={disable_btn_tmdb}>
              {#if $getInfoTMDBByID.isPending}
                <LoadingSpinner size="1.5rem" />
              {:else}
                GET
              {/if}
            </button>
          </div>
        </div>
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="tmdb_type">
      <Form.Control let:attrs>
        <Form.Label>TMDB type</Form.Label>
        <TmdbType bind:value={$formData.tmdb_type} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="ten">
      <Form.Control let:attrs>
        <Form.Label>Tên <span class="text-error">*</span></Form.Label>
        <Input {...attrs} bind:value={$formData.ten} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="ten_sub">
      <Form.Control let:attrs>
        <Form.Label>Tên sub</Form.Label>
        <Input {...attrs} bind:value={$formData.ten_sub} on:focus={focusAndSelect} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="mota">
      <Form.Control let:attrs>
        <Form.Label>Mô tả</Form.Label>
        <Input {...attrs} bind:value={$formData.mota} on:focus={focusAndSelect} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="poster_path">
      <Form.Control let:attrs>
        <Form.Label>Poster <span class="text-error">*</span></Form.Label>
        <Input {...attrs} bind:value={$formData.poster_path} on:focus={focusAndSelect} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <div class="3xl:col-span-2">
      <div class="mb-2">
        File phim <span class="text-error">*</span>
      </div>
      <FormAddEditPhimFile
        errors={{
          filePath: $errors.link_stream_filePath,
          fileName: $errors.link_stream_fileName,
          fileExt: $errors.link_stream_fileExt,
        }}
        bind:value_filePath={$formData.link_stream_filePath}
        bind:value_fileName={$formData.link_stream_fileName}
        bind:value_fileExt={$formData.link_stream_fileExt}
      />
    </div>
    <div class="3xl:col-span-2">
      <div class="mb-2">
        File vietsub<span class="text-error">*</span>
      </div>
      <FormAddEditPhimFile
        errors={{
          filePath: $errors.link_sub_filePath,
          fileName: $errors.link_sub_fileName,
          fileExt: $errors.link_sub_fileExt,
        }}
        bind:value_filePath={$formData.link_sub_filePath}
        bind:value_fileName={$formData.link_sub_fileName}
        bind:value_fileExt={$formData.link_sub_fileExt}
      />
    </div>
    <Form.Field {form} name="backdrop_path">
      <Form.Control let:attrs>
        <Form.Label>Backdrop</Form.Label>
        <Input {...attrs} bind:value={$formData.backdrop_path} on:focus={focusAndSelect} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="nam">
      <Form.Control let:attrs>
        <Form.Label>Năm <span class="text-error">*</span></Form.Label>
        <InputNumber {...attrs} bind:value={$formData.nam} on:focus={focusAndSelect} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
  </form>
</div>
