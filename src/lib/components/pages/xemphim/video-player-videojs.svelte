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
  <div class:show_title>
    <div
      class={clsx({ "xyz-in": show_title, "xyz-out": !show_title }, "top")}
      xyz={clsx($store_settings.animation && "fade duration-10 up")}
    >
      <!-- <div
        class={clsx({ "xyz-in": show_title, "xyz-out": !show_title })}
    
      > -->
      <div class="flex items-center gap-4 px-8 pt-4">
        <a class="btn btn-circle btn-error btn-sm" href={PAGE__ROOT}>
          <ArrowLeft />
        </a>
        <div class="title">{title}</div>
      </div>
      <!-- </div> -->
    </div>
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
      <source src={link_stream} />
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
  :global(.fBXjveu) {
    & .video-js {
      @apply w-screen1 h-screen1;
      &:hover .vjs-big-play-button {
        @apply bg-error;
      }
      & .vjs-control:focus:before,
      & .vjs-control:hover:before,
      & .vjs-control:focus {
        text-shadow: none;
      }
    }
    & .vjs-slider {
      @apply bg-error text-error-content;
      &:focus {
        text-shadow: none;
        box-shadow: none;
      }
    }
    & .vjs-poster {
      z-index: 1;
      & img {
        @apply w-screen1 h-screen1;
        object-fit: cover;
        /* height: 100vh; */
      }
    }
    & .vjs-big-play-button {
      @apply rounded-full bg-error/80 border-none;
      top: calc(50vh - 30px);
      left: calc(50vw - 30px);
      width: 60px;
      height: 60px;
      z-index: 100;
      line-height: 1.9em;
      & .vjs-icon-placeholder {
        &:before {
          @apply text-error-content;
        }
      }
      &:hover {
        @apply bg-error;
      }
    }
    & .vjs-paused.vjs-has-started {
      cursor: pointer;
      background-color: #000;
      & .vjs-big-play-button {
        display: block;
      }
    }
    & .show_title {
      & .vjs-text-track-display {
        & .vjs-text-track-cue {
          bottom: 80px !important;
          top: auto !important;
        }
      }
    }
    & .vjs-text-track-cue div {
      @apply px-2;
    }
    & .vjs-modal-dialog {
      z-index: 10;
    }
    & .vjs-loading-spinner {
      @apply bg-error border-none animate-spin;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1sb2FkZXItY2lyY2xlIj48cGF0aCBkPSJNMjEgMTJhOSA5IDAgMSAxLTYuMjE5LTguNTYiLz48L3N2Zz4=");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    & .vjs-control-bar {
      @apply justify-center items-center;
      z-index: 9999;
      background-color: transparent;
      background-image: linear-gradient(90deg, #02010100 0%, #02010169 20%, #151515 100%);
      bottom: 0px;
      padding-top: 10px;
      height: 100px;
      & .vjs-control {
        width: 60px;
        &:focus-visible {
          outline: none;
          box-shadow: none;
        }
      }
      & .vjs-progress-holder:focus-visible {
        outline: none;
        box-shadow: none;
      }
      & .vjs-icon-placeholder {
        &:before {
          @apply flex justify-center items-center;
          font-size: 50px;
        }
      }
      & .vjs-play-control {
        @apply select-none;
        order: 1;
        flex: 1 1;
        & .vjs-icon-placeholder {
          &:before {
            @apply flex justify-start items-center pl-4;
            font-size: 50px;
          }
        }
      }
      & .vjs-volume-panel {
        order: 2;
        flex: 1 1;
      }
      & .vjs-volume-control {
        @apply flex items-center;
        width: 100% !important;
        height: 100% !important;
        & .vjs-slider-horizontal {
          &.vjs-volume-bar {
            @apply rounded bg-gray-500;
            width: 80% !important;
            max-width: 100% !important;
            height: 8px !important;
          }
          & .vjs-volume-level {
            @apply bg-error;
            height: 100%;
            &:before {
              font-size: 20px;
            }
          }
        }
      }
      & .vjs-progress-control {
        @apply h-2;
        position: absolute;
        width: 100%;
        bottom: 95px;
        z-index: 100;
        &:hover {
          & .vjs-progress-holder {
            @apply h-2;
          }
        }
        & .vjs-progress-holder {
          @apply mx-4 h-1 bg-gray-500 rounded;
        }
        & .vjs-load-progress {
          @apply rounded bg-error/50;
          & div {
            @apply rounded bg-transparent;
            &[data-start="0"] {
              display: none;
            }
          }
        }
        & .vjs-play-progress {
          @apply bg-error rounded;
          &:before {
            @apply text-error;
            font-size: 28px;
          }
        }
        & .vjs-time-tooltip {
          @apply bg-error text-error-content;
          font-size: 18px;
          font-weight: 700;
        }
      }
      & .vjs-remaining-time {
        @apply flex justify-center items-center;
        order: 3;
        font-size: 24px;
        line-height: 0px;
        flex: 8 1;
      }
      & .vjs-subs-caps-button {
        order: 4;
        flex: 1 1;
      }

      & .vjs-fullscreen-control {
        order: 6;
        flex: 2 1;
        & .vjs-icon-placeholder {
          &:before {
            @apply flex justify-end items-center pr-4;
            font-size: 50px;
          }
        }
      }

      & .vjs-menu-button-popup .vjs-menu {
        bottom: min(10vh, 50px);
        margin-bottom: 0px;
        & .vjs-menu-content {
          font-family: inherit;
          width: 120px;
        }
        & .vjs-menu-item {
          font-size: 18px;
          padding: 8px;
        }
      }
    }
  }

  video {
    width: 100vw;
    height: 90vh;
  }
</style>
