<script>
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { PAGE_a, PAGE_a_phim } from "$lib/ROUTES";
  import { House } from "lucide-svelte";
</script>

<div class="w-full bg-base-300">
  <div class="container">
    <div class="flex items-center h-14 7xl:h-20">
      <button class="h-auto btn btn-link">
        <a href="/">
          <img class="h-12 rounded-xl 7xl:h-16" src="{base}/banner.png" alt="Trang chủ" />
        </a>
      </button>
      <ul class="menu menu-vertical lg:menu-horizontal bg-base-300">
        <li><a href={PAGE_a} class:active={$page.url.pathname === PAGE_a}><House size="24px" /></a></li>
        <li><a href={PAGE_a_phim} class:active={$page.url.pathname === PAGE_a_phim}>Phim</a></li>
      </ul>
    </div>
  </div>
</div>
