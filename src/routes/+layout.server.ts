import { nameStorage } from "$lib/configs";
import { parse_settings_from_storage } from "$lib/utils";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies, url }) => {
  let settings = parse_settings_from_storage(cookies.get(nameStorage.settings));
  return {
    settings,
  };
}) satisfies LayoutServerLoad;
