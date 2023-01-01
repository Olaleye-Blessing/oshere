/// <reference types="cypress" />

import Navbar from "./Index";

describe("<Navbar />", () => {
  it("should mount", () => {
    cy.mount(<Navbar />);

    cy.get("nav").should("exist");
  });

  it("should toggle nav", () => {
    cy.viewport("iphone-xr");
    cy.mount(<Navbar />);

    cy.get("[data-cy=navbar__toggle]").click();
    cy.get("[data-cy=navbar__list--cont]").should(
      "have.class",
      "h-[calc(100vh-4rem)]"
    );

    cy.get("[data-cy=navbar__toggle]").click();
    cy.get("[data-cy=navbar__list--cont]").should(
      "not.have.class",
      "h-[calc(100vh-4rem)]"
    );
  });
});
