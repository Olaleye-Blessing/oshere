import Navbar from "@/components/navigation/navbar/Index";
import { render } from "@testing-library/react";

describe("Navbar", () => {
  it("renders", () => {
    const { getByTestId } = render(<Navbar />);
    expect(getByTestId("navbar")).toBeInTheDocument();
  });
});
