import type { Query, QueryGetInfoByIdTmdbArgs } from "$lib/types/graphql";
import { GraphQLClient, gql } from "graphql-request";
import { handleErrorGql } from "../graphqlClient";

export const get_info_tmdb_query = gql`
  query GetInfoByIdTMDB($tmdb_id: Int!, $tmdb_type: TypeTMDB!) {
    getInfoByIdTMDB(tmdb_id: $tmdb_id, tmdb_type: $tmdb_type) {
      ten
      nam
      mota
      poster_path
      backdrop_path
      poster_path_tmdb
      backdrop_path_tmdb
      release_date
      tmdb_id
      tmdb_type
    }
  }
`;
export type GetInfoByIdTMDBType = {
  variables: QueryGetInfoByIdTmdbArgs;
  data: { getInfoByIdTMDB: Query["getInfoByIdTMDB"] };
};

export async function call_get_info_tmdb_by_id(
  params: GetInfoByIdTMDBType["variables"],
  clientGraphql: GraphQLClient,
): Promise<GetInfoByIdTMDBType["data"]> {
  return clientGraphql
    .request<GetInfoByIdTMDBType["data"], GetInfoByIdTMDBType["variables"]>(get_info_tmdb_query, { ...params })
    .then((data) => data)
    .catch((e) => {
      handleErrorGql(e);
      throw Error(e);
    });
}
