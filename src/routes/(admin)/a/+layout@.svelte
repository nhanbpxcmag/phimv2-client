<script lang="ts">
  import HeaderAdmin from "$lib/components/admin/header/header-admin.svelte";
  import { storeAuth } from "$lib/stores";
  import { onMount } from "svelte";

  onMount(() => {
    storeAuth.check({ to_login: true });
  });
</script>

{#if $storeAuth.isLogin}
  <HeaderAdmin />
  <div class="container mt-4 min-h-screen1">
    <slot />
  </div>
{/if}
