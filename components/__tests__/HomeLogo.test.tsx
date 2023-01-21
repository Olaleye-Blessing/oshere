import { render, screen } from "@testing-library/react";

import HomeLogo from "@/components/HomeLogo";

describe("HomeLogo", () => {
  it("renders", () => {
    render(<HomeLogo />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
