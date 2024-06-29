import { writable } from "svelte/store";

function createLoadingPageStore() {
  const { set, update, subscribe } = writable(false);
  return {
    subscribe,
    show: () => {
      set(true);
    },
    hide: () => {
      set(false);
    },
  };
}

export const loadingPage = createLoadingPageStore();
