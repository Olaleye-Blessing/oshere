import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";
import { Category, MovieMediaPage, TvMediaPage } from "@/interfaces/common";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  media: TvMediaPage & MovieMediaPage;
  category: Category;
}

const Index: FC<Props> = ({ media, category }) => {
  return (
    <>
      <div className="absolute h-full w-full inset-0 z-[200]">
        <Image
          src={`${TMDB_IMAGE_BASE_URL}/original${
            media.poster_path || media.backdrop_path
          }`}
          alt=""
          className=""
          fill
          objectFit="cover"
          priority
        />
      </div>
      <div className="relative z-[210] bg-black bg-opacity-80 h-full flex flex-col justify-center px-2 md:pl-4">
        <header className="flex items-center justify-start">
          <h1>{media.name || media.title || "No Title"}</h1>
        </header>
        <p className="max-h-[30rem] overflow-y-auto">
          {media.overview || "No Overview"}
        </p>
        {media.genres.length > 0 && (
          <section className="flex items-center justify-start flex-wrap mt-6">
            <p className="mb-2 mr-4 text-lg text-opacity-80 text-white-primary">
              Genres:
            </p>
            <ul className="flex items-center justify-start flex-wrap">
              {media.genres.map((genre) => (
                <li key={genre.id} className="mr-3 last:mr-0 mb-2">
                  <Link
                    href={`/?category=${category}&genre=${genre.id}`}
                    className="block px-3 pt-1 pb-2 text-sm font-semibold bg-red-primary bg-opacity-10 text-red-primary rounded-md"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {media.spoken_languages.length > 0 && (
          <p className="flex items-center justify-start flex-wrap mt-3">
            <span className="mr-2">Spoken Languages:</span>
            <span className="">
              {media.spoken_languages.map((lang) => lang.name).join(", ")}
            </span>
          </p>
        )}
        {category === "tvshows" && (
          <p className="flex items-center justify-start flex-wrap mt-3">
            <span className="mr-2">Seasons:</span>
            <span className="">{media.number_of_seasons}</span>
          </p>
        )}
        <time
          className="flex items-center justify-start flex-wrap mt-3"
          dateTime={media.release_date || media.first_air_date}
        >
          <span className="mr-2">Release Date:</span>
          <span className="">{media.release_date || media.first_air_date}</span>
        </time>
      </div>
    </>
  );
};

export default Index;
