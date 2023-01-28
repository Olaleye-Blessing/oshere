import { render, screen } from "@testing-library/react";
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
    render(<Genres {...props} />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error message when error", () => {
    render(<Genres {...props} loading={false} error="Error" />);

    expect(screen.getByTestId("genres-nav-error")).toBeInTheDocument();
  });

  it("renders genres", () => {
    render(<Genres {...props} loading={false} genres={genres} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders active genre", () => {
    const genre = genres[0];

    const genresProps = {
      ...props,
      loading: false,
      genres,
    };

    const { rerender } = render(
      <Genres {...genresProps} genre={String(genre.id)} />
    );

    expect(screen.getByRole("link", { name: genre.name })).toHaveClass(
      "text-red-primary"
    );

    rerender(<Genres {...genresProps} genre={String(genres[1].id)} />);

    expect(screen.getByRole("link", { name: genre.name })).not.toHaveClass(
      "text-red-primary"
    );
  });
});
