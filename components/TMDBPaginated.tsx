import { FC, PropsWithChildren, ReactNode } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { State as TMDBPaginationState } from "@/reducers/TMDBPagination";

export interface TMDBPaginatedProps extends TMDBPaginationState<any> {
  fetchMore: () => void;
  buttonClassName?: string;
  dataCyLoading?: string;
  dataCyError?: string;
}

const TMDBPaginated: FC<PropsWithChildren<TMDBPaginatedProps>> = ({
  loading,
  data,
  error,
  fetchMore,
  buttonClassName = "",
  dataCyLoading = "tmdbpaginated-loading",
  dataCyError = "tmdbpaginated-error",
  children,
}) => {
  return (
    <>
      {loading !== "init" && data && children}
      <div className="flex items-center justify-center mx-auto mt-3">
        {loading !== "idle" ? (
          <LoadingIndicator dataCy={dataCyLoading} />
        ) : error ? (
          <p data-cy={dataCyError} className="error">
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

export default TMDBPaginated;
