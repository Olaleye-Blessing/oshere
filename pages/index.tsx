import Head from "next/head";
import { useSearchParams } from "next/navigation";
import MediaNav from "@/components/navigation/media/Index";
import GenresNav from "@/components/navigation/genres/Index";
import Aside from "@/modules/pages/home/Aside";
import GenreMedias from "@/modules/pages/home/GenreMedias";
import { Category } from "@/interfaces/common";
import { useTMDB } from "@/hooks/useTMDB";
import GeneralMedias from "@/modules/pages/home/GeneralMedias";
import NowPlaying from "@/modules/pages/home/NowPlaying";

interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

export default function Home() {
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") || "tvshows") as Category;
  const genre = searchParams.get("genre");
  const {
    data: genresData,
    error: genreError,
    loading: genreLoading,
  } = useTMDB<GenresResponse>(
    `/genre/${category === "tvshows" ? "tv" : "movie"}/list`
  );

  return (
    <>
      <Head>
        <title>
          Oshere | browse movies, tv series, people, popular movies, trending
          movie, popular series, trending series, active communities.
        </title>
      </Head>
      <main data-cy="homepage" className="overflow-x-hidden md:pt-4">
        <header>
          <MediaNav pageCategory={category} />

          <GenresNav
            category={category}
            loading={genreLoading}
            error={genreError}
            genres={genresData?.genres || []}
            genre={genre}
          />

          <NowPlaying category={category} />
        </header>
        {genre ? (
          <section className="">
            <h1 className="mb-3 text-2xl md:text-4xl">
              <span className="capitalize">{category}</span>{" "}
              <span className="text-red-primary">/</span>{" "}
              <span className="text-white text-opacity-40">
                {genresData?.genres.find((g) => g.id === Number(genre))?.name}
              </span>
            </h1>
            <GenreMedias category={category} genre={genre} />
          </section>
        ) : (
          <GeneralMedias category={category} />
        )}
      </main>
      <Aside />
    </>
  );
}
