import { GraphQLClient } from "graphql-request";
import { PUBLIC_GRAPHQL_API } from "$env/static/public";
import { browser } from "$app/environment";
import { get } from "svelte/store";
import { storeAuth } from "$lib/stores";
import { headers } from "$lib/configs";
import { toast } from "svelte-sonner";
import type { ErrorGql } from "$lib/types/graphqlType";

// export const clientGraphql = (_token?: string) => {
//   const clientGraphql = new GraphQLClient(PUBLIC_GRAPHQL_API, { headers: {} });
//   const token = _token ? _token : browser ? get(storeAuth).token : "";
//   if (token) {
//     clientGraphql.setHeader(headers.token.name, `${headers.token.bearer} ${token}`);
//   }
//   //set token neu co
//   return clientGraphql;
// };

export const handleErrorGql = (error: ErrorGql) => {
  if (error?.response?.errors) {
    error.response.errors.map((v) => {
      if (v?.extensions?.response?.message) {
        if (typeof v?.extensions?.response?.message === "object") {
          v.extensions.response.message.map((v1) => {
            for (const [key, value] of Object.entries(v1.constraints)) {
              toast.error(`Lỗi: ${value}`);
            }
          });
        } else {
          toast.error(`Lỗi: ${v.extensions.response.message}`);
        }
      } else if (v.message) {
        toast.error(`Lỗi: ${v.message}`);
      }
      v?.extensions?.response?.error && handleErrorAuth(v.extensions.response.error);
    });
  } else {
    toast.error(`Lỗi: không xác định`);
  }
};

export const handleErrorAuth = (code: string) => {
  if (code === "UNAUTHENTICATED") {
    storeAuth.logout();
  }
};
export function generateGqlInputs(list: { [key: string]: string }) {
  let variables = "";
  let input = "";
  for (const key in list) {
    if (Object.prototype.hasOwnProperty.call(list, key)) {
      variables += ` $${key}: ${list[key]}`;
      input += ` ${key}: $${key}`;
    }
  }
  return { variables, input };
}
