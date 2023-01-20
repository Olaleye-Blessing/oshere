import { FC, PropsWithChildren, ReactNode } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { State as TMDBPaginationState } from "@/reducers/TMDBPagination";

interface TMDBPaginatedComponentProps extends TMDBPaginationState<any> {
  fetchMore: () => void;
  buttonClassName?: string;
}

const TMDBPaginatedComponent: FC<
  PropsWithChildren<TMDBPaginatedComponentProps>
> = ({ loading, data, error, fetchMore, buttonClassName = "", children }) => {
  return (
    <>
      {loading !== "init" && data && children}
      <div className="flex items-center justify-center mx-auto mt-3">
        {loading !== "idle" ? (
          <LoadingIndicator dataCy="people-media-loading" />
        ) : error ? (
          <p data-cy="people-media-error" className="error">
            {error}
          </p>
        ) : null}
        {loading === "idle" && data?.total_pages > data?.page && (
          <button onClick={fetchMore} className={buttonClassName}>
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default TMDBPaginatedComponent;
