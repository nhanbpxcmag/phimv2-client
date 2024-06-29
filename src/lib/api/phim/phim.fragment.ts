import { gql } from "graphql-request";
import { generateGqlInputs } from "../graphqlClient";

export const fragment_phim_item = gql`
  fragment PhimItem on PhimItem {
    id
    ten
    ten_sub
    mota
    poster_path
    backdrop_path
    nam
    tmdb_id
    tmdb_type
    link_stream_filePath
    link_stream_fileName
    link_stream_fileExt
    link_sub_filePath
    link_sub_fileName
    link_sub_fileExt
    isActive
    created_at
    updated_at
  }
`;
export const fragment_phim_detail = gql`
  fragment PhimDetail on PhimDetail {
    id
    ten
    ten_sub
    mota
    poster_path
    backdrop_path
    nam
    tmdb_id
    tmdb_type
    link_stream_filePath
    link_stream_fileName
    link_stream_fileExt
    link_stream
    link_sub_filePath
    link_sub_fileName
    link_sub_fileExt
    link_sub
    isActive
    created_at
    updated_at
  }
`;

const list_input_phim_add = {
  ten: "String!",
  ten_sub: "String",
  mota: "String",
  poster_path: "String!",
  backdrop_path: "String",
  nam: "Int!",
  tmdb_id: "Float",
  tmdb_type: "TypeTMDB",
  link_stream_filePath: "String",
  link_stream_fileName: "String",
  link_stream_fileExt: "String",
  link_sub_filePath: "String",
  link_sub_fileName: "String",
  link_sub_fileExt: "String",
};
const list_input_phim_edit = { ...list_input_phim_add, id: "Int!" };
const list_input_phim_delete = {
  id: "Int!",
  del_file: "Boolean!",
};
export const input_phim_add = { ...generateGqlInputs(list_input_phim_add) };
export const input_phim_edit = { ...generateGqlInputs(list_input_phim_edit) };
export const input_phim_delete = { ...generateGqlInputs(list_input_phim_delete) };
