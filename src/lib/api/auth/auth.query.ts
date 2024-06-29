import type { Query, QueryAuth_LoginArgs } from "$lib/types/graphql";
import request, { GraphQLClient, gql } from "graphql-request";

export const LOGIN_QUERY = gql`
  query auth_login($password: String!) {
    auth_login(password: $password) {
      access_token
    }
  }
`;

export async function call_login(password: string, url_api: string) {
  return request<LoginType, QueryAuth_LoginArgs>(url_api, LOGIN_QUERY, {
    password,
  });
}
export function call_check_auth(
  clientGraphql: GraphQLClient,
  token: string,
): {
  api: Promise<{ auth_check: Query["auth_check"] }>;
  _token: string;
} {
  return {
    api: clientGraphql.request<{ auth_check: Query["auth_check"] }>(
      gql`
        query auth_check {
          auth_check
        }
      `,
      {},
    ),
    _token: token,
  };
}

export type LoginType = {
  auth_login: Query["auth_login"];
};
