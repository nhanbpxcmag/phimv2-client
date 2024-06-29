<script lang="ts">
  import type { HTMLTdAttributes } from "svelte/elements";
  import { cn } from "$lib/components/utils.js";

  type $$Props = HTMLTdAttributes;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<td class={cn(className)} {...$$restProps} on:click on:keydown>
  <slot />
</td>
