import { TypeTmdb, type PhimDetail, type PhimItem } from "$lib/types/graphql";
import type { Infer, SuperValidated } from "sveltekit-superforms";
import { z } from "zod";
export const formPhimSchema = z.object({
  ten: z.string().min(1, { message: "Vui lòng nhập" }),
  ten_sub: z.string(),
  mota: z.string(),
  poster_path: z.string().min(1, { message: "Vui lòng nhập" }).url({ message: "Không đúng định dạng url" }),
  backdrop_path: z.coerce.string().nullable(),
  nam: z.coerce.number({ message: "Định dạng kiểu số" }),
  tmdb_id: z.coerce.number({ message: "Định dạng kiểu số" }).nullable(),
  tmdb_type: z.enum([TypeTmdb.Tv, TypeTmdb.Movie]).default(TypeTmdb.Tv),
  link_stream_filePath: z.string(),
  link_stream_fileName: z.string().min(1, { message: "Vui lòng nhập" }),
  link_stream_fileExt: z.string().min(1, { message: "Vui lòng nhập" }).default("mp4"),
  link_sub_filePath: z.string(),
  link_sub_fileName: z.string().nullable(),
  link_sub_fileExt: z.string().nullable().default("srt"),
});

export type FormPhimSchema = typeof formPhimSchema;

export type FormPhimType = Infer<FormPhimSchema>;
export type FormPhimSuper = SuperValidated<Infer<FormPhimSchema>>;

export function transformPhimToDataForm(data: PhimDetail): FormPhimType {
  let {
    ten,
    isActive,
    nam,
    poster_path,
    backdrop_path,
    link_stream_fileExt,
    link_stream_fileName,
    link_stream_filePath,
    link_sub_fileExt,
    link_sub_fileName,
    link_sub_filePath,
    mota,
    ten_sub,
    tmdb_id,
    tmdb_type,
  } = data;

  return {
    ten,
    ten_sub: ten_sub || "",
    mota: mota || "",
    poster_path,
    backdrop_path: backdrop_path || "",
    nam,
    tmdb_id: tmdb_id || null,
    tmdb_type: tmdb_type || TypeTmdb.Tv,
    link_stream_filePath: link_stream_filePath || "",
    link_stream_fileName: link_stream_fileName || "",
    link_stream_fileExt: link_stream_fileExt || "",
    link_sub_filePath: link_sub_filePath || "",
    link_sub_fileName: link_sub_fileName || "",
    link_sub_fileExt: link_sub_fileExt || "",
  };
}
