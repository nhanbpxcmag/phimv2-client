import { GraphQLClient } from "graphql-request";
import { get, writable } from "svelte/store";
import { storeAuth } from "./storeAuth";
import { browser } from "$app/environment";
import { headers } from "$lib/configs";

function createStore() {
  const store = writable<{ url_api: string }>();
  let url_api_g = "";
  const { set, update, subscribe } = store;
  const clientGraphql = (url_api: string, _token?: string) => {
    const clientGraphql = new GraphQLClient(url_api, { headers: {} });
    const token = _token ? _token : browser ? get(storeAuth).token : "";
    if (token) {
      clientGraphql.setHeader(headers.token.name, `${headers.token.bearer} ${token}`);
    }
    //set token neu co
    return clientGraphql;
  };
  const methods = {
    setUrlApi(url_api: string) {
      url_api_g = url_api;
      set({ url_api });
    },
    getFromToken(url_api: string, token: string) {
      return clientGraphql(url_api, token);
    },
    getGraphQLClient() {
      //set token neu co
      return clientGraphql(url_api_g, get(storeAuth).token);
    },
  };

  return {
    set,
    update,
    subscribe,
    ...methods,
  };
}

export const storeGraphqlClient = createStore();
