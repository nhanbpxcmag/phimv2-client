<script lang="ts">
  export let errors: string[] | undefined;
  export let name: string = "";
  $: if (name) name = name + ":";
</script>

{#if errors}
  <div class="text-sm font-medium text-destructive">
    {#each errors as error}
      <div>{name} {error}</div>
    {/each}
  </div>
{/if}
