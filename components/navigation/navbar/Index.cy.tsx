/// <reference types="cypress" />

import Navbar from "./Index";

describe("<Navbar />", () => {
  it("mounts", () => {
    cy.mount(<Navbar />);

    cy.get("nav").should("exist");
  });

  it("toggles the menu", () => {
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
