import { FC } from "react";
import CreateCommunity from "@/components/buttons/CreateCommunity";
import BookmarkMedia from "@/components/buttons/BookmarkMedia";
import { Category, Movie, TvShow } from "@/interfaces/common";

interface Props {
  category: Category;
  media: TvShow | Movie;
}

const Action: FC<Props> = ({ category, media }) => {
  const name = (media as TvShow).name || (media as Movie).title;

  return (
    <div className="px-3 mt-auto flex items-center justify-start">
      <CreateCommunity category={category} {...media} name={name} />
      <BookmarkMedia
        bookmark={{
          name,
          id: media.id,
          category,
          description: media.overview,
          poster_path: media.poster_path,
        }}
      />
    </div>
  );
};

export default Action;
