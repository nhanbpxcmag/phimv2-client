import { browser } from "$app/environment";
import { nameStorage } from "$lib/configs";
import Cookies from "js-cookie";

export const init_more = { animation: true };
export type T_op_more_render = {
  name: string;
  key: string;
  value: boolean;
}[];
export type T_more = typeof init_more;
export type T_key_more = keyof typeof init_more;
const key_more = Object.getOwnPropertyNames(init_more);
export const parse_settings_from_storage = (cookie: any) => {
  let kq = init_more;
  if (cookie) {
    try {
      cookie = JSON.parse(cookie);
      if (typeof cookie === "object") {
        cookie = { ...init_more, ...cookie };
        for (const key in cookie) {
          if (Object.prototype.hasOwnProperty.call(cookie, key)) {
            if (!init_more.hasOwnProperty(key)) {
              delete cookie[key];
            } else if (typeof cookie[key] !== typeof init_more[key as T_key_more]) {
              cookie[key] = init_more[key as T_key_more];
            }
          }
        }
        kq = cookie;
      }
    } catch (error) {}
  }
  return kq;
};

export function set_settings_to_storage(value: T_more) {
  return browser && Cookies.set(nameStorage.settings, value ? JSON.stringify(value) : JSON.stringify(init_more));
}

export function get_settings_from_storage() {
  if (!browser) return init_more;
  let storage = Cookies.get(nameStorage.settings);
  let kq = parse_settings_from_storage(storage);
  set_settings_to_storage(kq);
  return kq;
}
export function sync_settings(op_more_render: T_op_more_render, op_more: T_more) {
  for (let i = 0; i < op_more_render.length; i++) {
    const key = op_more_render[i].key as T_key_more;
    const value = typeof op_more[key] !== "undefined" ? op_more[key] : init_more[key];
    op_more_render[i].value = value;
  }
  return op_more_render;
}
