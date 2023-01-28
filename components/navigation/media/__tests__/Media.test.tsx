import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Media from "@/components/navigation/media/Index";

describe("Media", () => {
  it("renders", () => {
    render(<Media pageCategory="movies" />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("shows the correct media category as active", () => {
    const { rerender } = render(<Media pageCategory="movies" />);

    expect(screen.getByRole("link", { name: /movies/i })).toHaveClass(
      "text-red-primary"
    );

    rerender(<Media pageCategory="tvshows" />);

    expect(screen.getByRole("link", { name: /tv shows/i })).toHaveClass(
      "text-red-primary"
    );
  });
});
