/// <reference types="cypress" />

import Carousel from "./Index";

const carouselItems = Array.from({ length: 4 }, (_, i) => (
  <p key={i} className="">
    Testing {i}
  </p>
));

describe("<Carousel />", () => {
  it("mounts", () => {
    cy.mount(<Carousel items={carouselItems} />);

    cy.get("[data-cy='carousel']").should("exist");
  });

  it("renders items", () => {
    cy.mount(<Carousel items={carouselItems} />);

    cy.get("[data-cy='carousel-item']").should("have.length", 4);
  });

  it("slides", () => {
    let slideInterval = 3_000;
    cy.mount(<Carousel items={carouselItems} slideInterval={slideInterval} />);

    cy.get("#carousel__item-0").should("have.class", "opacity-100");

    cy.wait(slideInterval);

    cy.get("#carousel__item-0").should("have.class", "opacity-0");
  });
});
