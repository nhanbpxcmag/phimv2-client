<script lang="ts">
  import { base } from "$app/paths";
  import { PAGE_a_phim } from "$lib/ROUTES";
  import { store_settings, storeAuth } from "$lib/stores";
  import { CircleUserRound } from "lucide-svelte";
  import Settings from "./settings.svelte";
  import clsx from "clsx";
  import { onMount } from "svelte";
  let xyz = "";

  onMount(() => {
    xyz = "xyz-in";
  });
</script>

<header class={clsx("bg-base-300 sticky top-0 shadow-2xl z-50", xyz)} xyz={clsx({ fade: $store_settings.animation })}>
  <div class="container mx-auto">
    <div class="flex items-center justify-between h-14 7xl:h-16">
      <button
        class="h-auto cursor-not-allowed select-none xyz-nested"
        xyz={clsx({ "fade left delay-2 duration-10": $store_settings.animation })}
      >
        <a href="/">
          <img class="h-12 rounded-xl 7xl:h-14" src="{base}/banner.png" alt="Trang chủ" />
        </a>
      </button>
      <div class="xyz-nested" xyz={clsx({ "fade right delay-2 duration-10": $store_settings.animation })}>
        {#if $storeAuth.isLogin}
          <a href={PAGE_a_phim} class="btn btn-primary">
            <CircleUserRound />
            Admin
          </a>
        {/if}
        <Settings />
      </div>
    </div>
  </div>
</header>
