<script lang="ts">
  import LoadingSpinner from "$lib/components/ui/loading/loading-spinner.svelte";
  import { storeAuth } from "$lib/stores";
  import { LockKeyhole } from "lucide-svelte";
  import { onMount } from "svelte";
  let value_password: string;
  let show = false;

  function clickLogin() {
    if (value_password) {
      storeAuth.login(value_password);
    }
  }

  onMount(() => {
    storeAuth.check({ to_admin: true }).then(() => {
      show = !$storeAuth.isLogin;
    });
  });
</script>

{#if show}
  <div class="container">
    <div
      class="p-8 border rounded-xl border-base-content/30 mt-[30vh] max-w-96 flex flex-col justify-center items-center gap-4 mx-auto bg-neutral text-neutral-content shadow-lg shadow-neutral"
    >
      <div class="text-3xl font-bold">Nhập mật khẩu</div>
      <label
        class="flex items-center gap-2 input bg-neutral text-neutral-content border-neutral-content/50 focus-within:border-neutral-content focus-within:outline-neutral-content/10"
      >
        <LockKeyhole />
        <!-- svelte-ignore a11y-autofocus -->
        <input
          type="password"
          class="grow"
          bind:value={value_password}
          on:keyup={(e) => {
            if (e.key === "Enter") clickLogin();
          }}
          autofocus={true}
        />
      </label>
      <button class="btn btn-active btn-primary" on:click={clickLogin}>Login</button>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center w-screen h-screen1">
    <LoadingSpinner size="1.5rem" />
  </div>
{/if}
