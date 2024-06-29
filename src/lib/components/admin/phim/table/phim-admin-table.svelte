<script lang="ts">
  import { createRender, createTable, Render, Subscribe } from "svelte-headless-table";
  import { readable, writable } from "svelte/store";
  import * as Table from "$lib/components/shadcn/ui/table";
  import type { PhimItem } from "$lib/types/graphql";
  import { addTableFilter } from "svelte-headless-table/plugins";
  import PhimAdminTablePoster from "./phim-admin-table-poster.svelte";
  import { toLowerCaseNonAccentVietnamese } from "$lib/utils";
  import { Search } from "lucide-svelte";
  import PhimAdminTableAction from "./phim-admin-table-action.svelte";

  export let data: PhimItem[];

  const table = createTable(writable(data), {
    filter: addTableFilter({
      fn: ({ filterValue, value }) => {
        const khong_dau = toLowerCaseNonAccentVietnamese(filterValue) === filterValue.toLowerCase();
        filterValue = filterValue.toLowerCase();
        return khong_dau
          ? toLowerCaseNonAccentVietnamese(value).includes(filterValue)
          : value.toLowerCase().includes(filterValue);
      },
    }),
  });

  const columns = table.createColumns([
    table.display({
      id: "stt",
      header: "STT",
      cell: ({ row }, { pluginStates }) => {
        return parseInt(row.id, 10) + 1;
      },
    }),
    table.column({
      accessor: "ten",
      header: "Tên",
    }),
    table.column({
      accessor: "ten_sub",
      header: "Tên sub",
      cell: ({ value }) => {
        return value || "";
      },
    }),
    table.column({
      accessor: "poster_path",
      header: "Poster",
      cell: ({ value }) => {
        return createRender(PhimAdminTablePoster, { poster: value });
      },
    }),
    table.column({
      accessor: "tmdb_id",
      header: "tmdb_id",
    }),
    table.column({
      accessor: (item) => item,
      header: "",
      cell: ({ value }) => {
        return createRender(PhimAdminTableAction, { item: value });
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);
  const { filterValue } = pluginStates.filter;
</script>

<label class="flex items-center gap-2 my-2 input input-bordered max-w-72">
  <Search size="20px" />
  <input type="text" class="grow" placeholder="Search" bind:value={$filterValue} />
</label>
<div class="border rounded-md">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  <Render of={cell.render()} />
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
