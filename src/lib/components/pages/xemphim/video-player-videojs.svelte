<script lang="ts">
  import { browser } from "$app/environment";
  import { PAGE__ROOT } from "$lib/ROUTES";
  import { store_settings } from "$lib/stores";
  import { IsIphone } from "$lib/utils";
  import clsx from "clsx";
  import { ArrowLeft } from "lucide-svelte";
  import { onDestroy, onMount } from "svelte";
  import videojs from "video.js";
  import type Player from "video.js/dist/types/player";

  export let backdrop_path: string;
  export let link_stream: string;
  export let link_sub: string;
  export let name_time: string;
  export let ten: string;
  export let ten_sub: string;
  function detectAndRemove() {
    let ob = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.nodeType === 1) {
            let el = addedNode as HTMLElement;
            if (el.hasAttribute("data-start")) {
              // el.remove();
            }
          }
        });
        mutation.removedNodes.forEach((removedNode) => {
          if (removedNode.nodeType === 1) {
          }
        });
      });
    });
    ob.observe(el_main, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
    return () => {
      ob.disconnect();
    };
  }
  $: title = ten + (ten_sub ? ` (${ten_sub})` : "");
  let has_set = false;
  let refVideo: HTMLVideoElement;
  let show_title = true;
  let show_dialog = false;
  let is_paused = false;
  let is_iphone = false;
  let el_main: HTMLElement;
  let _videojs: Player;
  let track_options = {
    bg: false,
  };
  let playerOptions = {
    controls: true,
    autoplay: false,
    preload: "auto",
    poster: backdrop_path,
    controlBar: {
      pictureInPictureToggle: false,
      remainingTimeDisplay: {
        displayNegative: false,
      },
      subsCapsButton: false,
    },
    LoadProgressBar: false,
    textTrackSettings: false,
  };
  // Initialize Video.js when the component mounts
  function initializePlayer() {
    _videojs = videojs(refVideo, playerOptions);
    _videojs.on("useractive", () => {
      show_title = true;
    });
    _videojs.on("userinactive", () => {
      show_title = is_paused ? true : false;
    });
    _videojs.on("pause", () => {
      show_dialog = true;
      is_paused = true;
    });
    _videojs.on("play", () => {
      show_dialog = false;
      is_paused = false;
    });
  }
  onMount(() => {
    is_iphone = IsIphone(window);
    // if (!is_iphone) {
    initializePlayer();
    // }
    refVideo.addEventListener("timeupdate", timeupdate);
    refVideo.addEventListener(
      "loadeddata",
      function () {
        loadedmetadata();
      },
      false,
    );
    let ob = detectAndRemove();
    return () => {
      ob();
    };
  });
  // Clean up Video.js player when the component is destroyed
  onDestroy(() => {
    if (refVideo) {
      videojs(refVideo).dispose();
    }
  });
  function timeupdate() {
    if (window && has_set && refVideo?.currentTime) {
      window.localStorage.setItem(name_time, refVideo?.currentTime?.toString());
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
  function handleShow() {
    show_title = true;
  }
  function handleHide() {
    show_title = false;
  }
</script>

<div class="relative fBXjveu" bind:this={el_main}>
  <div class:show_title class={clsx({ "track-bg": track_options["bg"] })}>
    <div
      class={clsx({ "xyz-in": show_title, "xyz-out": !show_title }, "top")}
      xyz={clsx($store_settings.animation && "fade duration-10 up")}
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 px-8 pt-4">
          <a class="btn btn-circle btn-error btn-sm" href={PAGE__ROOT}>
            <ArrowLeft />
          </a>
          <div class="title">{title}</div>
        </div>
        <div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="mr-2 label-text">bg</span>
              <input type="checkbox" bind:checked={track_options["bg"]} class="checkbox" />
            </label>
          </div>
        </div>
      </div>
    </div>
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
      class={clsx("transition-all duration-300 video-js", show_dialog ? "blur hover:blur-sm" : "")}
    >
      <source src={link_stream} type="video/mp4" />
      {#if link_sub}
        <track default={true} kind="captions" src={link_sub} srclang="vi" label="Viet" />
      {/if}
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
      </p>
    </video>
  </div>
</div>

<style class="scss">
  .top {
    @apply h-auto w-full absolute bg-transparent opacity-100 left-0 pb-4 top-0 transition-all duration-300;
    background-image: linear-gradient(0deg, #02010100 0%, #02010169 20%, #151515 100%);
    z-index: 100;
    & .title {
      font-size: clamp(2rem, 6vw, 3rem);
    }
  }

  video {
    width: 100vw;
    height: 90vh;
  }
</style>
