import type { Query, QueryPhim_By_IdArgs } from "$lib/types/graphql";
import { GraphQLClient, gql } from "graphql-request";
import { handleErrorGql } from "../graphqlClient";
import { fragment_phim_detail, fragment_phim_item } from "./phim.fragment";

export const phim_list_admin_query = gql`
  query Phim_list_admin {
    phim_list_admin {
      ...PhimItem
    }
  }
  ${fragment_phim_item}
`;
export const phim_list_home_query = gql`
  query phim_list {
    phim_list {
      ...PhimItem
    }
  }
  ${fragment_phim_item}
`;
export const phim_by_id_query = gql`
  query phim_by_id($id: Int!) {
    phim_by_id(id: $id) {
      ...PhimDetail
    }
  }
  ${fragment_phim_detail}
`;
export type PhimAdminType = {
  phim_list_admin: Query["phim_list_admin"];
};
export type PhimHomeType = {
  phim_list: Query["phim_list"];
};
export type PhimByIDType = {
  phim_by_id: Query["phim_by_id"];
};

export async function call_phim_list_admin(clientGraphql: GraphQLClient): Promise<PhimAdminType> {
  return clientGraphql
    .request<PhimAdminType>(phim_list_admin_query)
    .then((data) => data)
    .catch((e) => {
      handleErrorGql(e);
      throw Error(e);
    });
}
export async function call_phim_list_home(clientGraphql: GraphQLClient): Promise<PhimHomeType> {
  return clientGraphql
    .request<PhimHomeType>(phim_list_home_query)
    .then((data) => data)
    .catch((e) => {
      handleErrorGql(e);
      throw Error(e);
    });
}
export async function call_phim_by_id(id: number, clientGraphql: GraphQLClient): Promise<PhimByIDType> {
  return clientGraphql
    .request<PhimByIDType, QueryPhim_By_IdArgs>(phim_by_id_query, { id })
    .then((data) => data)
    .catch((e) => {
      handleErrorGql(e);
      throw Error(e);
    });
}
