export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type PhimItem = {
  __typename?: "PhimItem";
  id: Scalars["Int"]["output"];
  ten: Scalars["String"]["output"];
  ten_sub?: Maybe<Scalars["String"]["output"]>;
  mota?: Maybe<Scalars["String"]["output"]>;
  poster_path: Scalars["String"]["output"];
  backdrop_path?: Maybe<Scalars["String"]["output"]>;
  nam: Scalars["Int"]["output"];
  tmdb_id?: Maybe<Scalars["Int"]["output"]>;
  tmdb_type?: Maybe<TypeTmdb>;
  link_stream_filePath?: Maybe<Scalars["String"]["output"]>;
  link_stream_fileName?: Maybe<Scalars["String"]["output"]>;
  link_stream_fileExt?: Maybe<Scalars["String"]["output"]>;
  link_sub_filePath?: Maybe<Scalars["String"]["output"]>;
  link_sub_fileName?: Maybe<Scalars["String"]["output"]>;
  link_sub_fileExt?: Maybe<Scalars["String"]["output"]>;
  isActive: Scalars["Boolean"]["output"];
  created_at: Scalars["Float"]["output"];
  updated_at: Scalars["Float"]["output"];
};

/** Type: TV or MOVIE */
export enum TypeTmdb {
  /** TV */
  Tv = "TV",
  /** MOVIE */
  Movie = "MOVIE",
}

export type PhimDetail = {
  __typename?: "PhimDetail";
  id: Scalars["Int"]["output"];
  ten: Scalars["String"]["output"];
  ten_sub?: Maybe<Scalars["String"]["output"]>;
  mota?: Maybe<Scalars["String"]["output"]>;
  poster_path: Scalars["String"]["output"];
  backdrop_path?: Maybe<Scalars["String"]["output"]>;
  nam: Scalars["Int"]["output"];
  tmdb_id?: Maybe<Scalars["Int"]["output"]>;
  tmdb_type?: Maybe<TypeTmdb>;
  link_stream_filePath?: Maybe<Scalars["String"]["output"]>;
  link_stream_fileName?: Maybe<Scalars["String"]["output"]>;
  link_stream_fileExt?: Maybe<Scalars["String"]["output"]>;
  link_sub_filePath?: Maybe<Scalars["String"]["output"]>;
  link_sub_fileName?: Maybe<Scalars["String"]["output"]>;
  link_sub_fileExt?: Maybe<Scalars["String"]["output"]>;
  isActive: Scalars["Boolean"]["output"];
  created_at: Scalars["Float"]["output"];
  updated_at: Scalars["Float"]["output"];
  link_stream?: Maybe<Scalars["String"]["output"]>;
  link_sub?: Maybe<Scalars["String"]["output"]>;
};

export type TmdbItem = {
  __typename?: "TmdbItem";
  ten: Scalars["String"]["output"];
  nam: Scalars["Int"]["output"];
  mota: Scalars["String"]["output"];
  poster_path: Scalars["String"]["output"];
  backdrop_path: Scalars["String"]["output"];
  poster_path_tmdb: Scalars["String"]["output"];
  backdrop_path_tmdb: Scalars["String"]["output"];
  release_date: Scalars["Float"]["output"];
  tmdb_id: Scalars["Float"]["output"];
  tmdb_type: TypeTmdb;
};

export type Login = {
  __typename?: "Login";
  access_token: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getInfoByIdTMDB: TmdbItem;
  auth_login: Login;
  auth_check: Scalars["Boolean"]["output"];
  phim_list?: Maybe<Array<Maybe<PhimItem>>>;
  phim_list_admin?: Maybe<Array<Maybe<PhimItem>>>;
  phim_by_id?: Maybe<PhimDetail>;
};

export type QueryGetInfoByIdTmdbArgs = {
  tmdb_id: Scalars["Int"]["input"];
  tmdb_type: TypeTmdb;
};

export type QueryAuth_LoginArgs = {
  password: Scalars["String"]["input"];
};

export type QueryPhim_By_IdArgs = {
  id: Scalars["Int"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  phim_add: PhimItem;
  phim_edit: PhimItem;
  phim_delete: Scalars["Boolean"]["output"];
};

export type MutationPhim_AddArgs = {
  input: PhimAddArgs;
};

export type MutationPhim_EditArgs = {
  input: PhimEditArgs;
};

export type MutationPhim_DeleteArgs = {
  input: PhimDeleteArgs;
};

export type PhimAddArgs = {
  ten: Scalars["String"]["input"];
  ten_sub?: InputMaybe<Scalars["String"]["input"]>;
  mota?: InputMaybe<Scalars["String"]["input"]>;
  poster_path: Scalars["String"]["input"];
  backdrop_path?: InputMaybe<Scalars["String"]["input"]>;
  nam: Scalars["Int"]["input"];
  tmdb_id?: InputMaybe<Scalars["Float"]["input"]>;
  tmdb_type?: InputMaybe<TypeTmdb>;
  link_stream_filePath?: InputMaybe<Scalars["String"]["input"]>;
  link_stream_fileName?: InputMaybe<Scalars["String"]["input"]>;
  link_stream_fileExt?: InputMaybe<Scalars["String"]["input"]>;
  link_sub_filePath?: InputMaybe<Scalars["String"]["input"]>;
  link_sub_fileName?: InputMaybe<Scalars["String"]["input"]>;
  link_sub_fileExt?: InputMaybe<Scalars["String"]["input"]>;
};

export type PhimEditArgs = {
  ten: Scalars["String"]["input"];
  ten_sub?: InputMaybe<Scalars["String"]["input"]>;
  mota?: InputMaybe<Scalars["String"]["input"]>;
  poster_path: Scalars["String"]["input"];
  backdrop_path?: InputMaybe<Scalars["String"]["input"]>;
  nam: Scalars["Int"]["input"];
  tmdb_id?: InputMaybe<Scalars["Float"]["input"]>;
  tmdb_type?: InputMaybe<TypeTmdb>;
  link_stream_filePath?: InputMaybe<Scalars["String"]["input"]>;
  link_stream_fileName?: InputMaybe<Scalars["String"]["input"]>;
  link_stream_fileExt?: InputMaybe<Scalars["String"]["input"]>;
  link_sub_filePath?: InputMaybe<Scalars["String"]["input"]>;
  link_sub_fileName?: InputMaybe<Scalars["String"]["input"]>;
  link_sub_fileExt?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
};

export type PhimDeleteArgs = {
  id: Scalars["Int"]["input"];
  del_file: Scalars["Boolean"]["input"];
};
