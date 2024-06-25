<script>
  import { base } from "$app/paths";
  import { store_settings } from "$lib/stores/apps/storeSettings";
  import clsx from "clsx";
  import Settings from "./settings.svelte";
</script>

<header class="bg-base-300 xyz-in" xyz={clsx({ "fade up-5 duration-10": $store_settings.animation })}>
  <div class="container mx-auto">
    <div class="flex items-center justify-between h-14 7xl:h-20">
      <button class="h-auto btn btn-link">
        <a href="/">
          <img class="h-12 rounded-xl 7xl:h-16" src="{base}/banner.png" alt="Trang chủ" />
        </a>
      </button>
      <div>
        <Settings />
      </div>
    </div>
  </div>
</header>
