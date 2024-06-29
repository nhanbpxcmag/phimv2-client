<script lang="ts">
  import { PAGE_x_slug } from "$lib/ROUTES";
  import type { PhimItem } from "$lib/types/graphql";
  import { fade } from "svelte/transition";

  export let item: PhimItem;
  export let preview = false;
  let h_img: string = "100%";

  let w_card: number;

  $: ten = item.ten + (item.ten_sub ? ` (${item.ten_sub})` : "");
  $: h_img = Math.floor(w_card * (700 / 500)) + "px";
</script>

<a
  class="w-full h-full p-0 select-none animate-button-pop"
  class:KAtcrjG={preview}
  href={PAGE_x_slug({ slug: item.id })}
  title={ten}
>
  <div class="w-full h-full bg-base-100 card text-base-content card-compact group" bind:clientWidth={w_card}>
    {#if item.nam > 0}
      <div class="absolute badge badge-secondary right-1 top-1">{item.nam}</div>
    {/if}
    <figure>
      <img class="object-cover w-full select-none" style:height={h_img} src={item.poster_path} alt={ten} />
    </figure>
    <div class="justify-between gap-1 p-4 card-body">
      <h2 class="card-title group-hover:text-info">
        {item.ten}
      </h2>
      {#if item.ten_sub}
        <div class="text-xl text-base-content/60">{item.ten_sub}</div>
      {/if}
    </div>
  </div>
</a>

<style>
  .KAtcrjG {
    width: min(50vw, 300px);
  }
</style>
