/// <reference types="cypress" />

import PeopleMedia from "./People";
import { TMDB_BASE_URL } from "@/configs/paths";

describe("<PeopleMedia />", () => {
  beforeEach(() => {
    cy.mount(<PeopleMedia />);

    cy.intercept("GET", `${TMDB_BASE_URL}/person/popular*`, {
      fixture: "tmdb/popular-people.json",
    }).as("getPopularPeople");
  });

  it("renders loading indicator on initial mount", () => {
    cy.get("[data-cy=people-media-loading]").should("exist");
    cy.get("[data-cy=people-media]").should("not.exist");
  });
});
