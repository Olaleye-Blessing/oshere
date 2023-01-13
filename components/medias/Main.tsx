import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";
import { Category, Movie, TvShow } from "@/interfaces/common";
import CreateCommunity from "@/components/buttons/CreateCommunity";

interface MediasProps {
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
          <li
            key={index}
            className={`w-full mx-auto max-w-[15.625rem] ${liClassName}`}
          >
            <Link
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
              <div className="px-3">
                <p className="truncate text-white-primary text-opacity-50 my-2">
                  {media.overview}
                </p>
                <h4 className="leading-6">
                  {category === "tvshows"
                    ? (media as TvShow).name
                    : (media as Movie).title}
                </h4>
              </div>
              <div className="px-3 mt-auto">
                <CreateCommunity
                  category={category}
                  {...media}
                  name={(media as TvShow).name || (media as Movie).title}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Main;
