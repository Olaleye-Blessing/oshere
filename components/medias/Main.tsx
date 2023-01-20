import { FC } from "react";
import { Category, Movie, TvShow } from "@/interfaces/common";
import Media from "./Media";

export interface MediasProps {
  medias: (TvShow | Movie)[];
  category?: Category;
  ulClassName?: string;
  liClassName?: string;
}

const Main: FC<MediasProps> = ({
  medias,
  category = "tvshows",
  ulClassName = "flex flex-wrap justify-start gap-5 gap-y-8",
  liClassName = "",
}) => {
  return (
    <ul className={ulClassName}>
      {medias.map((media, index) => {
        return (
          <Media
            key={media.id}
            media={media}
            category={category}
            className={liClassName}
          />
        );
      })}
    </ul>
  );
};

export default Main;
