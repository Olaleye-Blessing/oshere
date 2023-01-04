import useSWR from "swr";
import { TMDBError, TMDBResponse } from "@/interfaces/fetch";
import { TMDB_BASE_URL } from "@/configs/paths";
import { TMDB_API_KEY } from "@/configs/keys";

export const useTMDB = <ResponseType>(url: string, page?: number) => {
  let fetchUrl = new URL(`${TMDB_BASE_URL}${url}`);
  fetchUrl.searchParams.set("api_key", TMDB_API_KEY);
  fetchUrl.searchParams.set("language", "en-US");
  if (page) fetchUrl.searchParams.set("page", page.toString());

  const { data, error, isLoading } = useSWR<
    TMDBResponse<ResponseType>,
    TMDBError
  >(fetchUrl.toString());

  let errMessage: string | undefined;

  if (error) {
    errMessage =
      error.status_code === 7
        ? "Resources not available"
        : error.status_message;
  }

  return {
    data,
    error: errMessage,
    isLoading,
  };
};
