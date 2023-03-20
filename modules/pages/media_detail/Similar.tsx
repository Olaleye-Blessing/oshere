import { FC } from "react";
import { Category, Movie, TvShow } from "@/interfaces/common";
import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import MainMedias from "@/components/medias/Main";
import TMDBPaginated from "@/components/TMDBPaginated";

interface SimilarProps {
  category: Category;
  mediaId: string;
}

const Similar: FC<SimilarProps> = ({ category, mediaId }) => {
  let url = category
    ? `${category === "movies" ? "/movie" : "/tv"}/${mediaId}/similar`
    : "";
  let categoryTitle = category === "tvshows" ? "TV Shows" : "Movies";

  const state = useTMDBPagination<Movie | TvShow>(url);
  const { data } = state;

  return (
    <aside data-cy="similar" className="aside">
      <h3 className="capitalize xl:mb-1">Similar {categoryTitle}</h3>
      {state.loading === "idle" && data?.results.length === 0 && (
        <p>No similar {categoryTitle.toLowerCase()} found. </p>
      )}
      <TMDBPaginated {...state}>
        <MainMedias
          medias={data.results as (TvShow | Movie)[]}
          category={category}
          ulClassName="mt-3 flex whitespace-nowrap justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8 xl:flex-col xl:space-x-0 xl:gap-y-5 xl:px-2 xl:overflow-x-hidden xl:scrollbar__show"
          liClassName="min-w-[15.05rem]"
        />
      </TMDBPaginated>
    </aside>
  );
};

export default Similar;
