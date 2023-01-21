import { render, screen } from "@testing-library/react";
import TMDBPaginated, { TMDBPaginatedProps } from "@/components/TMDBPaginated";
import { State as TMDBPaginationState } from "@/reducers/TMDBPagination";

const state: TMDBPaginationState<any> = {
  data: {
    page: 1,
    results: [],
    total_pages: 3,
    total_results: 2,
  },
  error: undefined,
  loading: "init",
};

const props: TMDBPaginatedProps = {
  ...state,
  fetchMore: () => {},
};

const setup = (
  overrideProps?: Partial<TMDBPaginatedProps>,
  children?: React.ReactNode
) => {
  const newProps = { ...props, ...overrideProps };

  return render(<TMDBPaginated {...newProps}>{children}</TMDBPaginated>);
};

//TODO: add more tests when useTMDBPagination is tested

describe("TMDBPaginated", () => {
  it("renders loading indicator when loading is not 'idle'", () => {
    setup();

    expect(screen.getByTestId("tmdbpaginated-loading")).toBeInTheDocument();
  });

  it("renders error when there is an error on initial rendering", () => {
    setup({ loading: "idle", error: "There was an error" });

    expect(screen.getByText(/there was an error/i)).toBeInTheDocument();
  });

  it("renders children when loading is not 'init'", () => {
    setup({ loading: "idle" }, <ul></ul>);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders load more button when loading is 'idle' and there are more pages", () => {
    setup({
      loading: "idle",
      data: { ...props.data, page: 1, total_pages: 4 },
    });

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("doesn't render load more when there are no more pages", () => {
    setup({
      loading: "idle",
      data: { ...props.data, page: 4, total_pages: 4 },
    });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
