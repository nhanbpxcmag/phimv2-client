<script lang="ts">
  import clsx from "clsx";
  import FormAddEditPhimErrors from "./form-add-edit-phim-errors.svelte";
  import { PUBLIC_API } from "$env/static/public";
  import { createMutation } from "@tanstack/svelte-query";
  import { call_check_file } from "$lib/api/file/file.api";
  import { toast } from "svelte-sonner";
  import { store_url_api } from "$lib/stores";

  export let errors: { filePath: string[] | undefined; fileName: string[] | undefined; fileExt: string[] | undefined };
  export let value_filePath: string | null;
  export let value_fileName: string | null;
  export let value_fileExt: string | null;

  let hasfile = "";

  const checkFile = createMutation({
    mutationFn: (path: string) => call_check_file($store_url_api.api, path),
    onSuccess: async (response) => {
      let data = await response.json();
      if (data.data) {
        hasfile = "";
        toast.success("File tồn tại");
      } else {
        hasfile = "File không tồn tại";
        toast.error("File không tồn tại");
      }
    },
  });

  function focusAndSelect(e: any) {
    e.target?.select();
  }

  function clickCheckFile(e: Event) {
    e.preventDefault();
    let path_sub = value_filePath ? value_filePath + "/" : "";
    let path = path_sub + value_fileName + "." + value_fileExt;
    hasfile = "";
    $checkFile.mutate(path);
  }
</script>

<div class="flex flex-col items-start justify-start gap-2">
  {#if value_fileName && value_fileExt}
    {@const path = value_filePath ? value_filePath + "/" : ""}
    {@const url = PUBLIC_API + "/file/check/" + path + value_fileName + "." + value_fileExt}
    <button on:click={clickCheckFile} class="italic underline text-info">
      <div class="text-sm italic text-info">{path}{value_fileName}.{value_fileExt}</div>
    </button>
  {/if}
  <div class="join">
    <!-- <select class="select select-bordered join-item" bind:value={value_filePath} class:border-error={errors.filePath}>
      <option value="" selected={value_filePath === ""}>Gốc</option>
      <option value="ngoai" selected={value_filePath === "ngoai"}>Ngoài</option>
    </select> -->
    <input
      class="input input-bordered join-item max-w-28 {clsx({
        'focus-within:outline-error focus:outline-error/50 border-error': errors.filePath,
      })}"
      placeholder="file name"
      bind:value={value_filePath}
      on:focus={focusAndSelect}
    />
    <input
      class="input input-bordered join-item w-full {clsx({
        'focus-within:outline-error focus:outline-error/50 border-error': errors.fileName,
      })}"
      placeholder="file name"
      bind:value={value_fileName}
      on:focus={focusAndSelect}
    />
    <div class="indicator">
      <div>
        <input
          class="input input-bordered join-item max-w-28 {clsx({
            'focus-within:outline-error focus:outline-error/50 border-error': errors.fileExt,
          })}"
          placeholder="file ext"
          bind:value={value_fileExt}
          on:focus={focusAndSelect}
        />
      </div>
    </div>
  </div>
  <div class="mt-2">
    <FormAddEditPhimErrors errors={errors.filePath} name="filePath" />
    <FormAddEditPhimErrors errors={errors.fileName} name="fileName" />
    <FormAddEditPhimErrors errors={errors.fileExt} name="fileExt" />
    {#if hasfile}
      <FormAddEditPhimErrors errors={[hasfile]} />
    {/if}
  </div>
</div>
