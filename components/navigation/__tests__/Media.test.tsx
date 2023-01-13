import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Media from "./../media/Index";
import { GetByTestId } from "@/interfaces/tests";

let getByTestId: GetByTestId;

describe("Media", () => {
  beforeEach(() => {
    const component = render(<Media pageCategory="movies" />);
    getByTestId = component.getByTestId;
  });

  it("renders correctly", () => {
    const { container } = render(<Media pageCategory="movies" />);

    expect(container).toBeInTheDocument();
  });

  it("contains the correct links", () => {
    expect(getByTestId("nav__media--category--movies")).toHaveTextContent(
      /movies/i
    );

    expect(getByTestId("nav__media--category--tvshows")).toHaveTextContent(
      /tv shows/i
    );
  });

  it("has the correct active category when it mounts", () => {
    expect(getByTestId("nav__media--category--movies")).toHaveClass(
      "text-red-primary"
    );
  });

  // it("selects the correct category when clicked", async () => {
  //   let tvshowsCategory = getByTestId("nav__media--category--tvshows");

  //   fireEvent.click(tvshowsCategory);

  //   expect(tvshowsCategory).toHaveClass("text-red-primary");
  // });
});
