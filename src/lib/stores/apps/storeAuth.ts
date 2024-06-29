import { goto } from "$app/navigation";
import { call_check_auth, call_login } from "$lib/api/auth/auth.query";
import { nameStorage } from "$lib/configs";
import Cookies from "js-cookie";
import { toast } from "svelte-sonner";
import { get, writable } from "svelte/store";
import { PAGE_a, PAGE_login } from "./../../ROUTES";
import { loadingPage } from "./storeLoadingPage";
import { storeGraphqlClient } from "./storeGraphqlClient";
import { store_url_api } from "./storePage";

type Props = { isLogin: boolean; token: string };
const init = {
  isLogin: false,
  token: "",
};

function createAuthStore() {
  const { set, update, subscribe } = writable<Props>(init);

  const methods = {
    async check(options: { to_login?: boolean; to_admin?: boolean } = { to_login: false, to_admin: false }) {
      loadingPage.show();
      try {
        const token = Cookies.get(nameStorage.token) || "";
        let check_auth = call_check_auth(storeGraphqlClient.getFromToken(get(store_url_api).g, token), token);
        await check_auth.api;
        set({ isLogin: true, token: check_auth._token });
        if (options.to_admin) goto(PAGE_a);
      } catch (error) {
        set(init);
        if (options.to_login) {
          methods.logout();
        }
      }
      loadingPage.hide();
    },
    async login(password: string) {
      loadingPage.show();
      try {
        const { auth_login } = await call_login(password, get(store_url_api).g);
        Cookies.set(nameStorage.token, auth_login.access_token, { path: "/" });
        set({ isLogin: true, token: auth_login.access_token });
        toast.success("Đăng nhập thành công");
        storeGraphqlClient.setUrlApi(get(store_url_api).g);
        goto(PAGE_a);
      } catch (error) {
        toast.error("Thông tin đăng nhập không đúng");
      }
      loadingPage.hide();
    },
    logout() {
      Cookies.remove(nameStorage.token);
      storeGraphqlClient.setUrlApi(get(store_url_api).g);
      set(init);
      goto(PAGE_login);
    },
  };
  return {
    subscribe,
    set,
    update,
    ...methods,
  };
}

export const storeAuth = createAuthStore();
