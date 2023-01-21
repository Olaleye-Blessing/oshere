import { render, screen } from "@testing-library/react";
import Person from "@/components/medias/Person";
import { TMDBPerson } from "@/interfaces/fetch";

const person: TMDBPerson = {
  adult: false,
  gender: 2,
  id: 1,
  known_for_department: "Acting",
  name: "Blessing",
  popularity: 344,
  profile_path: "/profile_path.svg",
};

describe("Person", () => {
  it("renders", () => {
    render(<Person person={person} />);

    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });
});
