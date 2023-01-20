import { FC } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useTMDBPagination } from "@/hooks/useTMDBPagination";
import { TMDBPerson } from "@/interfaces/fetch";
import Person from "./Person";

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
            return <Person key={person.id} person={person} />;
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
