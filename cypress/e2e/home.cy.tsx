/// <reference types="cypress" />

import { TMDB_BASE_URL } from "@/configs/paths";

describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", `${TMDB_BASE_URL}/person/popular*`, {
      fixture: "tmdb/popular-people.json",
    }).as("getPopularPeople");
  });

  it("renders home page", () => {
    cy.get("[data-cy='homepage']").should("exist");
  });

  it("has the tvshows category selected by default", () => {
    cy.get("[data-cy='nav__media--category--tvshows']").should(
      "have.class",
      "text-red-primary"
    );
  });

  it("navigates to different media categories", () => {
    cy.get("[data-cy='nav__media--category--tvshows']").click();
    cy.url().should("include", "?category=tvshows");

    cy.get("[data-cy='nav__media--category--movies']").click();
    cy.url().should("include", "?category=movies");
  });

  it("highlights the current media category", () => {
    cy.get("[data-cy='nav__media--category--tvshows']").should(
      "have.class",
      "text-red-primary"
    );

    cy.get("[data-cy='nav__media--category--movies']").click();
    cy.get("[data-cy='nav__media--category--tvshows']").should(
      "not.have.class",
      "text-red-primary"
    );
    cy.get("[data-cy='nav__media--category--movies']").should(
      "have.class",
      "text-red-primary"
    );
  });

  it("navigates to different genres", () => {
    cy.get("[data-cy='nav__genre--1']").click();
    cy.url().should("include", "?category=tvshows&genre=1");
  });

  it("<PeopleMedia /> renders loading indicator on initial mount", () => {
    cy.get("[data-cy=people-media-loading]").should("exist");
    cy.get("[data-cy=people-media]").should("not.exist");
  });

  it("<PeopleMedia /> renders the list of people", () => {
    cy.get("[data-cy=people-media-loading]").should("exist");

    cy.wait("@getPopularPeople");

    cy.get("[data-cy=people-media-loading]").should("not.exist");
    cy.get("[data-cy=people-media]").should("exist");
  });
});

export {};
