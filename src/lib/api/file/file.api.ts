import { PUBLIC_API } from "$env/static/public";

export function call_check_file(url_api: string, path: string) {
  let url = url_api + "/file/check/" + path;
  return fetch(url);
}
