import { TMDB_BASE_URL } from "@/configs/paths";

const ids = {
  valid: {
    tv: 119051,
    movie: 76600,
  },
  invalid: 999999999,
};

describe("Media Info Page", () => {
  beforeEach(() => {
    cy.intercept("GET", `${TMDB_BASE_URL}/**/similar?**`, {
      fixture: "tvs.json",
    }).as("similar");

    cy.intercept("GET", `${TMDB_BASE_URL}/tv/${ids.valid.tv}?**`, {
      fixture: "tv.json",
    }).as("tv");

    cy.intercept("GET", `${TMDB_BASE_URL}/movie/${ids.valid.movie}?**`, {
      fixture: "movie.json",
    }).as("movie");

    cy.intercept("GET", RegExp(`${TMDB_BASE_URL}/(tv|movie)/${ids.invalid}?`), {
      statusCode: 404,
      body: {
        status_code: 34,
        status_message: "The resource you requested could not be found.",
        success: false,
      },
    }).as("invalid");
  });

  it("renders a tv show info page", () => {
    cy.visit(`/medias/tvshows/${ids.valid.tv}`);
    cy.wait(["@tv", "@similar"]);

    cy.get("[data-cy=media-info-tvshows-page]").should("exist");
  });

  it("renders a movie info page", () => {
    cy.visit(`/medias/movies/${ids.valid.movie}`);
    cy.wait(["@movie", "@similar"]);

    cy.get("[data-cy=media-info-movies-page]").should("exist");
  });

  it("renders an error message when the id is invalid", () => {
    cy.visit(`/medias/tvshows/${ids.invalid}`);
    cy.wait("@invalid");

    cy.get("[data-cy=error]").should("exist");
  });

  it("navigates to home page with the selected genre when the genre is clicked", () => {
    cy.visit(`/medias/tvshows/${ids.valid.tv}`);
    cy.wait(["@tv", "@similar"]);

    cy.get("[data-cy=media-info-tvshows-page] [data-cy^=genre]")
      .first()
      .click();

    cy.url().should("include", "genre").and("include", "category=tvshows");
  });

  it("changes the media id when a similar media is clicked", () => {
    cy.visit(`/medias/tvshows/${ids.valid.tv}`);
    cy.wait(["@tv", "@similar"]);

    cy.get("[data-cy=similar] ul li:nth-child(2) a").click();

    cy.url().should("not.include", ids.valid.tv);
  });
});
