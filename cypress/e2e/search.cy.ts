import { TMDB_BASE_URL } from "@/configs/paths";

const invalidSearchQuery = "ddyudygeiuvhuf";
const emptyResult = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

describe("Search Page", () => {
  beforeEach(() => {
    cy.viewport("iphone-5"); // search form is hidden on larger screen

    cy.intercept("GET", `${TMDB_BASE_URL}/search/**`, {
      fixture: "tvs.json",
    }).as("searchQuery");

    cy.visit("/search");
  });

  it("renders search page", () => {
    cy.get("[data-cy=search-page]").should("exist");
  });

  it("includes the search query in the url", () => {
    cy.get("[data-cy=search-page] input[type='search']").type("peace{enter}");

    cy.wait("@searchQuery");

    cy.url().should("include", "q=peace");
  });

  it("displays a message when there is no search query", () => {
    cy.get("p").should("contain", /search for something/i);
  });

  it("displays results of a valid search query", () => {
    cy.get("[data-cy=search-page] input[type='search']").type("peace{enter}");

    cy.wait("@searchQuery");

    cy.get("main ul").should("exist");
  });

  it("displays a message when there are no results", () => {
    cy.intercept("GET", `${TMDB_BASE_URL}/search/**`, emptyResult).as(
      "emptyResult"
    );

    cy.get("[data-cy=search-page] input[type='search']").type(
      `${invalidSearchQuery}{enter}`
    );

    cy.wait("@emptyResult");

    cy.get("[data-cy=empty]").should("exist");
  });

  it("should navigate to another page when any of the results is clicked", () => {
    cy.get("[data-cy=search-page] input[type='search']").type("peace{enter}");

    cy.wait("@searchQuery");

    cy.get("main ul li:first-child").click();

    cy.url().should("not.include", "search");
  });
});
