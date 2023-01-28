describe("Home page", () => {
  it("Test", () => {
    cy.visit("/");

    cy.get("main").should("be.visible");
  });
});

export {};
