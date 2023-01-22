import { render } from "@testing-library/react";
import Navbar from "@/components/navigation/navbar/Index";

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: null,
  }),
}));

jest.mock("next/router", () => require("next-router-mock"));

describe("Navbar", () => {
  it("renders", () => {
    const { getByTestId } = render(<Navbar />);
    expect(getByTestId("navbar")).toBeInTheDocument();
  });
});
