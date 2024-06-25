<script lang="ts">
  import { Button } from "$lib/components/shadcn/ui/button/index.js";
  import * as Popover from "$lib/components/shadcn/ui/popover/index.js";
  import { store_settings } from "$lib/stores/apps/storeSettings";
  import { get_settings_from_storage, set_settings_to_storage, sync_settings, type T_key_more } from "$lib/utils";
  import { Settings } from "lucide-svelte";

  let more = get_settings_from_storage();
  let list_settings = [
    {
      name: "Animation",
      key: "animation",
      value: more["animation"],
    },
  ];

  function setSetting(name: string, value: boolean) {
    const key = name as T_key_more;
    more[key] = !value;
    set_settings_to_storage(more);
    list_settings = sync_settings(list_settings, more);
    store_settings.setOption(more);
  }
</script>

<Popover.Root portal={null}>
  <Popover.Trigger asChild let:builder>
    <Button builders={[builder]} class="btn btn-circle btn-ghost"><Settings /></Button>
  </Popover.Trigger>
  <Popover.Content class="w-80 bg-neutral text-neutral-content">
    <div class="flex flex-col w-full divide-y divide-neutral-content/30 *:p-2">
      {#each list_settings as { name, key, value } (key)}
        <button
          class="justify-between h-auto btn btn-ghost btn-block focus-visible:outline-none"
          on:click={() => setSetting(key, value)}
        >
          <div class="bold">{name}</div>
          <div><input type="checkbox" bind:checked={value} class="checkbox checkbox-info" /></div>
        </button>
      {/each}
    </div>
  </Popover.Content>
</Popover.Root>
