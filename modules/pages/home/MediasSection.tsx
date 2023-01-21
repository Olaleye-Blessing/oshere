import { FC } from "react";
import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import TMDBPaginated from "@/components/TMDBPaginated";
import { TvShow, Movie } from "@/interfaces/common";
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
    <section className="mb-6">
      <header>
        <h3 className="capitalize">{title}</h3>
      </header>
      <TMDBPaginated {...state}>
        <MainMedias
          medias={data.results as (TvShow | Movie)[]}
          category={category}
          ulClassName="mt-3 flex whitespace-nowrap justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8"
          liClassName="min-w-[15.05rem]"
        />
      </TMDBPaginated>
    </section>
  );
};

export default MediasSection;
