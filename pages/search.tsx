import { NextPage } from "next";
import { useRouter } from "next/router";
import SearchForm from "@/components/navigation/navbar/Search";
import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import { Movie, TvShow } from "@/interfaces/common";
import TMDBPaginatedComponent from "@/components/TMDBPaginatedComponent";
import Media from "@/components/medias/Media";

const Search: NextPage = () => {
  const { query } = useRouter();

  const result = useTMDBPagination<Movie | TvShow>(
    query.q ? `/search/multi?query=${query.q}` : ""
  );

  const { data } = result;

  // remove people from search result
  let medias = data?.results.filter((item) => !("profile_path" in item));

  return (
    <>
      <div className="px-2 md:pt-3 md:px-4">
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
          <div>
            <TMDBPaginatedComponent {...result} buttonClassName="mb-3">
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
            </TMDBPaginatedComponent>
          </div>
        </main>
      </div>
    </>
  );
};

export default Search;
