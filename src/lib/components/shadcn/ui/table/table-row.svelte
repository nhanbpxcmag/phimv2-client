<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/components/utils.js";

  type $$Props = HTMLAttributes<HTMLTableRowElement> & {
    "data-state"?: unknown;
  };

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<tr class={cn(className)} {...$$restProps} on:click on:keydown>
  <slot />
</tr>
