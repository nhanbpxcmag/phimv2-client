import type {
  Mutation,
  MutationPhim_AddArgs,
  MutationPhim_DeleteArgs,
  MutationPhim_EditArgs,
} from "$lib/types/graphql";
import { GraphQLClient, gql } from "graphql-request";
import { handleErrorGql } from "../graphqlClient";
import { fragment_phim_item, input_phim_add, input_phim_delete, input_phim_edit } from "./phim.fragment";

export const phim_add_query = gql`
  mutation Phim_add(
    ${input_phim_add.variables}
  ) {
    phim_add(
      input: {
        ${input_phim_add.input}
      }
    ) {
      ...PhimItem
    }
  }
  ${fragment_phim_item}
`;
export const phim_edit_query = gql`
  mutation Phim_edit(
    ${input_phim_edit.variables}
  ) {
    phim_edit(
      input: {
        ${input_phim_edit.input}
      }
    ) {
      ...PhimItem
    }
  }
  ${fragment_phim_item}
`;
export const phim_delete_query = gql`
  mutation Phim_delete(${input_phim_delete.variables}) {
    phim_delete(input: {
        ${input_phim_delete.input}
      })
}
`;
export type PhimAddType = {
  variables: MutationPhim_AddArgs["input"];
  data: { phim_add: Mutation["phim_add"] };
};
export type PhimEditType = {
  variables: MutationPhim_EditArgs["input"];
  data: { phim_add: Mutation["phim_edit"] };
};
export type PhimDeleteType = {
  variables: MutationPhim_DeleteArgs["input"];
  data: { phim_delete: Mutation["phim_delete"] };
};

export async function call_phim_add(
  variables: PhimAddType["variables"],
  clientGraphql: GraphQLClient,
): Promise<PhimAddType["data"]> {
  return clientGraphql
    .request<PhimAddType["data"], PhimAddType["variables"]>(phim_add_query, { ...variables })
    .then((data) => data)
    .catch((e) => {
      handleErrorGql(e);
      throw Error(e);
    });
}
export async function call_phim_edit(
  variables: PhimEditType["variables"],
  clientGraphql: GraphQLClient,
): Promise<PhimEditType["data"]> {
  return clientGraphql
    .request<PhimEditType["data"], PhimEditType["variables"]>(phim_edit_query, { ...variables })
    .then((data) => data)
    .catch((e) => {
      handleErrorGql(e);
      throw Error(e);
    });
}
export async function call_phim_delete(
  variables: PhimDeleteType["variables"],
  clientGraphql: GraphQLClient,
): Promise<PhimDeleteType["data"]> {
  return clientGraphql
    .request<PhimDeleteType["data"], PhimDeleteType["variables"]>(phim_delete_query, { ...variables })
    .then((data) => data)
    .catch((e) => {
      handleErrorGql(e);
      throw Error(e);
    });
}
