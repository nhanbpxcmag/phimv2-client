<script>
  import { storeAuth } from "$lib/stores";
</script>

{#if $storeAuth.isLogin}
  Page admin
{/if}
