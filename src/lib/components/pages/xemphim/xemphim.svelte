<script lang="ts">
  import type { PhimDetail } from "$lib/types/graphql";
  import VideoPlayerPlyr from "./video-player-plyr.svelte";
  import VideoPlayerVideojs from "./video-player-videojs.svelte";

  export let item: PhimDetail;

  let player;

  $: ten_sub = item.ten_sub ? ` (${item.ten_sub})` : "";
  $: console.log(item);
</script>

<div class="flex flex-col items-center justify-center">
  <!-- <VideoPlayerPlyr
    link_stream={item.link_stream || ""}
    backdrop_path={item.backdrop_path || ""}
    link_sub={item.link_sub || ""}
    ten={item.ten}
    name_time="text"
  /> -->
  <VideoPlayerVideojs
    link_stream={item.link_stream || ""}
    backdrop_path={item.backdrop_path || ""}
    link_sub={item.link_sub || ""}
    ten={item.ten}
    ten_sub={item.ten_sub || ""}
    name_time="text"
  />
  <!-- <div class="mt-2 title">{item.ten}</div>
  <div class="title_sub">{ten_sub}</div> -->
</div>

<style>
  .title {
    font-size: clamp(2rem, 6vw, 4.2rem);
    font-weight: 700;
  }
  .title_sub {
    font-size: clamp(1rem, 6vw, 3rem);
    font-weight: 500;
  }
</style>
