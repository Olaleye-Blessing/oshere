import { FC, PropsWithChildren, ReactNode } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { State as TMDBPaginationState } from "@/reducers/TMDBPagination";

interface TMDBPaginatedComponentProps extends TMDBPaginationState<any> {
  fetchMore: () => void;
}

const TMDBPaginatedComponent: FC<
  PropsWithChildren<TMDBPaginatedComponentProps>
> = ({ loading, data, error, fetchMore, children }) => {
  return (
    <>
      {loading !== "init" && data && children}
      {loading !== "idle" ? (
        <LoadingIndicator dataCy="people-media-loading" />
      ) : error ? (
        <p data-cy="people-media-error" className="error">
          {error}
        </p>
      ) : null}
      {loading === "idle" && data?.total_pages !== data?.page && (
        <button onClick={fetchMore}>Load more</button>
      )}
    </>
  );
};

export default TMDBPaginatedComponent;
