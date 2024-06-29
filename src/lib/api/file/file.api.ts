import { PUBLIC_API } from "$env/static/public";

export function call_check_file(path: string) {
  let url = PUBLIC_API + "/file/check/" + path;
  return fetch(url);
}
