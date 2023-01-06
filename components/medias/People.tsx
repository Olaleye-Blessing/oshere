import { TMDBPerson } from "interfaces/fetch";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import LoadingIndicator from "../LoadingIndicator";
import { useTMDBPagination } from "./../../hooks/useTMDBPagination";
import { TMDB_IMAGE_BASE_URL } from "configs/paths";

const People: FC = () => {
  const { data, error, loading, fetchMore } =
    useTMDBPagination<TMDBPerson>(`/person/popular`);

  return (
    <>
      {loading !== "init" && (
        <ul
          data-cy="people-media"
          className="mt-3 flex whitespace-nowrap items-center justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8 xl:flex-col xl:space-x-0 xl:gap-y-5 xl:px-2 xl:overflow-x-hidden xl:scrollbar__show"
        >
          {data?.results.map((person) => {
            return (
              <li key={person.id} className="w-full">
                <Link
                  href="/"
                  className="flex w-full max-w-[22rem] pr-4 rounded-lg bg-black bg-opacity-20 shadow-lg overflow-hidden"
                >
                  <figure className="w-20 relative flex-shrink-0 mr-2 overflow-hidden">
                    <Image
                      src={`${TMDB_IMAGE_BASE_URL}/w500${person.profile_path}`}
                      alt=""
                      width={500}
                      height={500}
                      className="h-full object-cover"
                    />
                  </figure>
                  <div className="truncate">
                    <h4 className="truncate mb-0">{person.name}</h4>
                    <p className="text-white-primary text-opacity-50 font-semibold text-sm">
                      {person.known_for_department}
                    </p>
                    <p className="mt-6 bg-red bg-opacity-10 text-red-primary max-w-max p-1 font-bold text-xs rounded-sm mb-2">
                      {person.popularity}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {loading !== "idle" ? (
        <LoadingIndicator dataCy="people-media-loading" />
      ) : error ? (
        <p data-cy="people-media-error" className="error">
          {error}
        </p>
      ) : null}
      {loading === "idle" && data?.total_pages !== data?.page && (
        <button onClick={fetchMore} className="block my-2 mx-auto">
          Load more
        </button>
      )}
    </>
  );
};

export default People;
