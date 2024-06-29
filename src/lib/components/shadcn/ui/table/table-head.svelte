<script lang="ts">
  import type { HTMLThAttributes } from "svelte/elements";
  import { cn } from "$lib/components/utils.js";

  type $$Props = HTMLThAttributes;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<th class={cn(className)} {...$$restProps}>
  <slot />
</th>
