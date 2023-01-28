import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "@/components/navigation/navbar/Search";

describe("Search", () => {
  it("renders", () => {
    render(<Search />);

    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  it("changes the value of the search input", async () => {
    const user = userEvent.setup();

    render(<Search />);

    expect(screen.getByRole("search")).toHaveValue("");

    await user.type(screen.getByRole("search"), "Blessing");

    expect(screen.getByRole("search")).toHaveValue("Blessing");
  });
});
