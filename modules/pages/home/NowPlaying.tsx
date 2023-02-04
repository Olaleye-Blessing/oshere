import { FC } from "react";

import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import { Category, TvShow, Movie } from "@/interfaces/common";
import LoadingIndicator from "@/components/LoadingIndicator";
import MediaSlider from "./MediaSlider";

interface Props {
  category: Category;
}

const NowPlaying: FC<Props> = ({ category }) => {
  const {
    data: { results },
    error,
    loading,
  } = useTMDBPagination<TvShow | Movie>(
    category === "tvshows" ? "/tv/airing_today" : "/movie/now_playing"
  );

  return (
    <section className="media__slider h-[25rem] mb-5">
      <MediaSlider category={category} medias={results} />
      {loading !== "idle" && <LoadingIndicator />}
      {error && <p className="text-red-500">Error: {(error as any).message}</p>}
    </section>
  );
};

export default NowPlaying;
