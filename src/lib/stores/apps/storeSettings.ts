import type { T_more } from "$lib/utils";
import { init_more } from "$lib/utils";
import { writable } from "svelte/store";

const createStore = () => {
  const state = init_more;

  const { subscribe, set, update } = writable(state);

  const methods = {
    setOption(value: T_more) {
      update((state) => ({ ...state, ...value }));
    },
  };

  return {
    subscribe,
    ...methods,
  };
};
export const store_settings = createStore();
