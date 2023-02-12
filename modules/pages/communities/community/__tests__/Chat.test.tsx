import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSession } from "next-auth/react";
import { CommunityProvider } from "@/contexts/Community";
import Chat from "./../Chat";

jest.mock("next-auth/react");

const mockUseSession = useSession as jest.Mock;

const userData = {
  name: "Blessing",
  email: "user@gmail.com",
};

const setupComponent = () => {
  const user = userEvent.setup();

  mockUseSession.mockReturnValue({
    status: "authenticated",
    data: { user: userData },
  });

  render(
    <CommunityProvider>
      <Chat />
    </CommunityProvider>
  );

  return { user };
};

describe("Chat", () => {
  it("renders the chat input", () => {
    setupComponent();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("changes the input value when the user types", async () => {
    setupComponent();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  // TODO: READ ON HOW TO MOCK FIREBASE
  it("clears the input value when the user sends a message", async () => {
    setupComponent();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "Hello");

    expect(input).toHaveValue("Hello");

    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    // expect(input).toHaveValue("");
  });
});
