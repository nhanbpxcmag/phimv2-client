// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace svelteHTML {
    interface HTMLAttributes<T> {
      "on:clickOutside"?: (event: CustomEvent) => void;
      "on:useHeightAnimate"?: (event: CustomEvent<{ is_show: boolean }>) => void;
      xyz?: string;
    }
  }
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
