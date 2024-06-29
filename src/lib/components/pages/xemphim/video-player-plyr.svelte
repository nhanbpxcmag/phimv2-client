<script lang="ts">
  import { page } from "$app/stores";
  import { IsIphone } from "$lib/utils";
  import Plyr from "plyr";
  import videojs from "video.js";
  import { onMount } from "svelte";
  import "$lib/styles/plyr.scss";

  export let backdrop_path: string;
  export let link_stream: string;
  export let link_sub: string;
  export let name_time: string;
  export let ten: string;
  let player: Plyr;
  let has_set = false;
  let refVideo: any;
  let plyrDiv: any;
  let is_iphone = false;
  let home = "/";
  $: {
    home = $page.route.id === "/phim/[slug]" || $page.route.id === "/" ? "/" : "/bd";
  }
  onMount(async () => {
    is_iphone = IsIphone(window);
    if (!is_iphone) {
      player = new Plyr(plyrDiv.firstChild, {
        captions: { active: true, language: "vi" },
        controls: [
          "play-large",
          "restart",
          "rewind",
          "play",
          "fast-forward",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          // "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
      });
      player.currentTime = getlocal();
    }
    refVideo.addEventListener("timeupdate", timeupdate);
    refVideo.addEventListener(
      "loadeddata",
      function () {
        loadedmetadata();
      },
      false,
    );
  });
  function timeupdate() {
    if (window && has_set && refVideo?.currentTime) {
      window.localStorage.setItem(name_time, refVideo?.currentTime);
    }
  }
  function loadedmetadata() {
    if (window) {
      refVideo.currentTime = getlocal();
    }
  }
  function getlocal() {
    let temp = parseFloat(window.localStorage.getItem(name_time) as any);
    return !isNaN(temp) ? temp : 0;
  }
</script>

<div>
  <div class="mx-auto aaaa" bind:this={plyrDiv}>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      bind:this={refVideo}
      on:canplay={() => {
        if (!has_set && refVideo?.currentTime) {
          loadedmetadata();
        }
        has_set = true;
      }}
      data-poster={backdrop_path}
      playsinline
      controls
      crossorigin="anonymous"
    >
      <source src={link_stream} />
      {#if link_sub}
        <track default={true} kind="captions" src={link_sub} srclang="vi" label="Viet" />
      {/if}
    </video>
  </div>
</div>

<style>
  :global(.plyr__caption, video::cue) {
    font-size: clamp(2rem, 6vw, 4.2rem);
    color: #fff;
    padding: 2px;
    background: #000;
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  video {
    width: 100vw;
    height: 90vh;
  }
</style>
