import { FC } from "react";
import { useTMDB } from "@/hooks/useTMDB";
import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import TMDBPaginatedComponent from "@/components/TMDBPaginatedComponent";
import { TvShow, Movie, Category } from "@/interfaces/common";
import MainMedias from "@/components/medias/Main";
import { GeneralMediasProps } from "./GeneralMedias";

interface MediasSectionProps extends GeneralMediasProps {
  title: string;
  url: string;
}

const MediasSection: FC<MediasSectionProps> = ({ title, category, url }) => {
  const state = useTMDBPagination<Movie | TvShow>(url);
  const { data } = state;

  return (
    <section className="mb-10">
      <header>
        <h3 className="capitalize">{title}</h3>
      </header>
      <TMDBPaginatedComponent {...state}>
        <MainMedias
          medias={data.results as (TvShow | Movie)[]}
          category={category}
          ulClassName="mt-3 flex whitespace-nowrap justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8"
          liClassName="min-w-[15.05rem]"
        />
      </TMDBPaginatedComponent>
    </section>
  );
};

export default MediasSection;
