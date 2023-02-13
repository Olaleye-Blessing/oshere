import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchForm from "@/components/navigation/navbar/Search";
import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import { Movie, TvShow } from "@/interfaces/common";
import TMDBPaginated from "@/components/TMDBPaginated";
import Media from "@/components/medias/Media";

const Search: NextPage = () => {
  const { query, isReady } = useRouter();

  const [pageIsReady, setPageIsReady] = useState(false);

  const result = useTMDBPagination<Movie | TvShow>(
    query.q ? `/search/multi?query=${query.q}` : ""
  );

  const {
    data: { results, total_results },
    loading,
  } = result;

  // remove people from search result
  let medias = results.filter((item) => !("profile_path" in item));

  useEffect(() => {
    setPageIsReady(isReady);
  }, [isReady]);

  return (
    <>
      <Head>
        <title>Search Result for {query.q}</title>
        <meta
          name="description"
          content="Search the Oshere database for movies, tv shows, and more."
          key="description"
        />
      </Head>
      <div data-cy="search-page" className="px-2 md:pt-3 md:px-4">
        <header className="md:mb-6">
          {query.q && (
            <h1 className="mt-0 mb-3 mr-3">
              Search Result for{" "}
              <span className="text-white-primary text-opacity-20">
                {query.q}
              </span>
            </h1>
          )}
          <SearchForm className="mb-2 max-w-[24rem] md:hidden" />
        </header>
        <main className="md:px-0">
          {query.q ? (
            <div>
              {loading === "idle" && total_results === 0 ? (
                <p data-cy="empty" className="text-2xl">
                  No results found
                </p>
              ) : (
                <TMDBPaginated {...result} buttonClassName="mb-3">
                  <ul className="mt-2 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
                    {medias?.map((item) => (
                      <Media
                        key={item.id}
                        media={item}
                        category={"title" in item ? "movies" : "tvshows"}
                        className="sm:max-w-xs sm:mx-0"
                      />
                    ))}
                  </ul>
                </TMDBPaginated>
              )}
            </div>
          ) : pageIsReady ? (
            <p className="text-2xl">Search for something</p>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default Search;
