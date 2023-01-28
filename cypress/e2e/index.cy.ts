import { TMDB_BASE_URL } from "@/configs/paths";

describe("Home page", () => {
  beforeEach(() => {
    cy.intercept("GET", `${TMDB_BASE_URL}/person/popular*`, {
      fixture: "people.json",
    }).as("getPopularPeople");

    cy.intercept("GET", `${TMDB_BASE_URL}/tv/**`, {
      fixture: "tvs.json",
    }).as("tvShows");

    cy.intercept("GET", `${TMDB_BASE_URL}/movie/**`, {
      fixture: "movies.json",
    }).as("movies");

    cy.intercept("GET", `${TMDB_BASE_URL}/genre/**`, {
      fixture: "genres.json",
    }).as("genres");

    cy.visit("/");

    // these two occur no matter which media type is selected
    cy.wait(["@getPopularPeople", "@genres"]);
  });

  it("renders home page", () => {
    cy.wait(["@tvShows"]);

    cy.get("[data-cy=home-page]").should("exist");
  });

  it("switches the selected media type", () => {
    cy.wait(["@tvShows"]);

    cy.get("[data-cy=nav__media--category--movies]").click();

    cy.wait(["@movies"]);

    cy.url().should("include", "movies");
  });

  it("switches the selected genre", () => {
    const genre = {
      id: 16,
      name: "Animation",
    };

    cy.wait(["@tvShows"]);

    cy.get(`[data-cy=nav__genre--${genre.id}]`).click();

    cy.wait(["@tvShows"]);

    cy.url().should("include", `genre=${genre.id}`);
  });
});
