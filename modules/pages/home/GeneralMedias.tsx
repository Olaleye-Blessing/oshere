import { FC } from "react";
import MediasSection from "./MediasSection";
import { Category } from "@/interfaces/common";

export interface GeneralMediasProps {
  category: Category;
}

const GeneralMedias: FC<GeneralMediasProps> = ({ category }) => {
  let urlCategory = category === "tvshows" ? "tv" : "movie";

  return (
    <>
      <MediasSection
        category={category}
        title={`Popular ${category}`}
        url={`/${urlCategory}/popular`}
      />
      <MediasSection
        category={category}
        title={`Top Rated ${category}`}
        url={`/${urlCategory}/top_rated`}
      />
      <MediasSection
        category={category}
        title={category === "tvshows" ? "Airing Today" : "Now Playing"}
        url={`/${urlCategory}/${
          category === "tvshows" ? "airing_today" : "now_playing"
        }`}
      />
    </>
  );
};

export default GeneralMedias;
