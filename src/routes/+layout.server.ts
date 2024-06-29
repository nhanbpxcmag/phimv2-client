import { PUBLIC_API_PORT } from "$env/static/public";
import { nameStorage } from "$lib/configs";
import { parse_settings_from_storage } from "$lib/utils";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies, url }) => {
  let settings = parse_settings_from_storage(cookies.get(nameStorage.settings));
  let host = url.hostname;
  let port_api = PUBLIC_API_PORT;
  let api = {
    g: url.protocol + "//" + url.hostname + ":" + port_api + "/g",
    api: url.protocol + "//" + url.hostname + ":" + port_api,
  };
  return {
    settings,
    api,
  };
}) satisfies LayoutServerLoad;
