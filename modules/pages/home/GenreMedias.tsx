import { FC } from "react";
import MainMedias from "@/components/medias/Main";
import { Category, Movie, TvShow } from "@/interfaces/common";
import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import LoadingIndicator from "@/components/LoadingIndicator";

interface GenreMediasProps {
  genre: string;
  category: Category;
}

const GenreMedias: FC<GenreMediasProps> = ({ category, genre }) => {
  let url = `/discover/${
    category === "movies" ? "movie" : "tv"
  }?with_genres=${genre}&with_watch_monetization_types=flatrate`;
  url +=
    category === "movies"
      ? "&sort_by=release_date.asc&include_adult=true&include_video=false"
      : "&sort_by=popularity.desc&include_null_first_air_dates=false&with_status=0&with_type=0";
  let { data, error, loading, fetchMore } = useTMDBPagination(url);

  return (
    <>
      {loading !== "init" && data && (
        <MainMedias
          medias={data.results as (TvShow | Movie)[]}
          category={category}
        />
      )}
      <div className="flex items-center justify-center my-4">
        {loading !== "idle" ? (
          <LoadingIndicator dataCy="genre-media-loading" />
        ) : error ? (
          <p data-cy="genre-media-error" className="error">
            {error}
          </p>
        ) : null}
        {loading === "idle" && data?.total_pages !== data?.page && (
          <button onClick={fetchMore}>Load more</button>
        )}
      </div>
    </>
  );
};

export default GenreMedias;
