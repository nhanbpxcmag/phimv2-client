<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/components/utils.js";

  type $$Props = HTMLAttributes<HTMLTableCaptionElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<caption class={cn(className)} {...$$restProps}>
  <slot />
</caption>
