<script lang="ts">
  import { cn } from "$lib/components/utils";
  import { LoaderCircle } from "lucide-svelte";

  let className: string = "";

  export { className as class };
  export let size = "24px";
</script>

<span class={cn("pointer-events-none inline-block animate-spin text-base-content", className)}>
  <LoaderCircle {size} />
</span>
