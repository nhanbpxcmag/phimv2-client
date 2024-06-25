import { titlePageDefault } from "$lib/configs";
import { writable } from "svelte/store";

export const titlePage = writable(titlePageDefault);
