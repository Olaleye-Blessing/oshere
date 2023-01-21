import { render, screen } from "@testing-library/react";
import Communities from "./../Index";

const communities = [
  {
    id: "1",
    category: "movies",
    name: "Jame Bond",
    coverPhoto: "/coverPhoto.jpg",
  },
];

describe("Communities", () => {
  it("renders empty message when there are no communities", () => {
    render(<Communities communities={[]} />);

    expect(screen.getByText(/no communities/i)).toBeInTheDocument();
  });

  it("renders list of communities", () => {
    render(<Communities communities={communities} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
