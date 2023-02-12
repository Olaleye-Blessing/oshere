import { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Category, Movie, TvShow } from "@/interfaces/common";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";
import CreateCommunity from "@/components/buttons/CreateCommunity";
import Link from "next/link";

interface Props {
  medias: (TvShow | Movie)[];
  category: Category;
}

const localDateOption: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const date = (date: string) =>
  new Date(date).toLocaleDateString("en-US", localDateOption);

const MediaSlider: FC<Props> = ({ category, medias }) => {
  if (medias.length === 0) return null;

  return (
    <Splide
      options={{
        rewind: true,
        perPage: 1,
        perMove: 1,
        pagination: false,
        autoplay: true,
        interval: 10_000,
        pauseOnHover: true,
      }}
      className="h-full"
      aria-label="Media Slider"
    >
      {medias.map((media) => {
        return (
          <SplideSlide
            key={media.id}
            className="h-full overflow-hidden rounded-lg"
          >
            <Link
              href={`/medias/${category}/${media.id}`}
              className="block h-full w-full overflow-hidden rounded-lg"
            >
              <figure className="absolute inset-0 overflow-hidden z-10">
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}/original/${media.backdrop_path}`}
                  alt=""
                  fill
                  priority
                  className="overflow-hidden object-cover"
                />
              </figure>
              <div className="overflow-hidden relative z-20 bg-black bg-opacity-60 h-full flex flex-col px-2 pb-5 sm:px-4 md:px-5">
                <h3 className="mt-auto mb-0">
                  {(media as any).name || (media as any).title || "No Title"}
                </h3>
                <time
                  className="block text-sm text-opacity-70 text-white-primary mb-5"
                  dateTime={
                    (media as any).first_air_date || (media as any).release_date
                  }
                >
                  {date(
                    (media as any).first_air_date || (media as any).release_date
                  )}
                </time>
                <p
                  className="line-clamp text-opacity-80 text-white-primary max-w-2xl"
                  style={{
                    WebkitLineClamp: 3,
                  }}
                >
                  {media.overview}
                </p>

                <div className="mt-2">
                  <CreateCommunity
                    category={category}
                    name={(media as any).name || (media as any).title}
                    id={media.id}
                    poster_path={media.poster_path}
                  />
                </div>
              </div>
            </Link>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default MediaSlider;
