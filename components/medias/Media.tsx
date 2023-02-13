import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { MediasProps } from "./Main";
import { Movie, TvShow } from "@/interfaces/common";
import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";
import CreateCommunity from "@/components/buttons/CreateCommunity";
import BookmarkMedia from "@/components/buttons/BookmarkMedia";
import Action from "./Action";

interface MediaProps extends Pick<MediasProps, "category"> {
  media: TvShow | Movie;
  className?: string;
}

const Media: FC<MediaProps> = ({
  media,
  category = "tvshows",
  className = "",
}) => {
  return (
    <li className={`w-full mx-auto max-w-[15.625rem] ${className}`}>
      <Link
        data-cy={`media--${category}--${media.id}`}
        href={`/medias/${category}/${media.id}`}
        className="flex flex-col w-full h-full pb-12 transition-all duration-200 ease-in-out rounded-lg overflow-hidden bg-black bg-opacity-20 shadow-lg ring-white-primary ring-opacity-10 ring-1 hover:shadow-lg hover:bg-opacity-40 focus:ring-red-primary focus:ring-opacity-20 hover:scale-[1.03] focus:scale-[1.03]"
      >
        <figure>
          <Image
            src={`${TMDB_IMAGE_BASE_URL}/w500${media.poster_path}`}
            alt=""
            width={500}
            height={500}
            className="h-full object-cover"
          />
        </figure>
        <div className="px-3 mb-5">
          <p className="truncate text-white-primary text-opacity-50 my-2">
            {media.overview}
          </p>
          <h4 className="leading-6">
            {category === "tvshows"
              ? (media as TvShow).name
              : (media as Movie).title}
          </h4>
        </div>
        <Action category={category} media={media} />
      </Link>
    </li>
  );
};

export default Media;
