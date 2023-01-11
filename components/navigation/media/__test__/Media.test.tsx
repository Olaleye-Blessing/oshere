import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Media from "./../Index";

describe("Media", () => {
  it("renders correctly", () => {
    const { container } = render(<Media pageCategory="movies" />);
    expect(container).toBeInTheDocument();
  });
});
