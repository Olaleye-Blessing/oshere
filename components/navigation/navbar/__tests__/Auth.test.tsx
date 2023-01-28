import { useSession, signIn, signOut } from "next-auth/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "@/components/navigation/navbar/Auth";

jest.mock("next-auth/react");

const mockUseSession = useSession as jest.Mock;

(signIn as jest.Mock).mockImplementation(() => jest.fn());
(signOut as jest.Mock).mockImplementation(() => jest.fn());

const userData = {
  name: "Blessing",
  email: "user@gmail.com",
};

const setupComponent = (authenticated?: boolean) => {
  const user = userEvent.setup();

  mockUseSession.mockReturnValue({
    status: authenticated ? "authenticated" : "unauthenticated",
    data: authenticated ? { user: userData } : null,
  });

  render(<Auth />);

  return { user };
};

describe("Auth", () => {
  it("renders", () => {
    setupComponent();

    expect(screen.getByTestId("nav-auth")).toBeInTheDocument();
  });

  it("renders the sign in button when the user is not authenticated", () => {
    setupComponent();

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("renders the sign out button when the user is authenticated", () => {
    setupComponent(true);

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it("logs the user in when the sign in button is clicked", async () => {
    const { user } = setupComponent();

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("logs the user out when the sign out button is clicked", async () => {
    const { user } = setupComponent(true);

    await user.click(screen.getByRole("button", { name: /sign out/i }));

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
