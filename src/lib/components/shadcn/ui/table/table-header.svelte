<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/components/utils.js";

  type $$Props = HTMLAttributes<HTMLTableSectionElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<thead class={cn(className)} {...$$restProps} on:click on:keydown>
  <slot />
</thead>
