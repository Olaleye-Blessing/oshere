import { render } from "@testing-library/react";
import Genres, {
  Props as GenresProps,
} from "@/components/navigation/genres/Index";

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
];

const props: GenresProps = {
  category: "movies",
  loading: true,
  error: undefined,
  genres: [],
  genre: null,
};

describe("Genres", () => {
  it("renders loading indicator when loading", () => {
    const { getByTestId } = render(<Genres {...props} />);

    expect(getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error message when error", () => {
    const { getByTestId } = render(
      <Genres {...props} loading={false} error="Error" />
    );

    expect(getByTestId("genres-nav-error")).toBeInTheDocument();
  });

  it("renders genres", () => {
    const { getByTestId } = render(
      <Genres {...props} loading={false} genres={genres} />
    );

    expect(getByTestId("genres-nav-data")).toBeInTheDocument();
  });
});
