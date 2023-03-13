import React from "react";
import Modal from "./Modal";

describe("Modal", () => {
  it("Renders a success modal on the screen", () => {
    cy.mount(<Modal message="Test success" type="success" />);
    cy.get('[data-cy="modal"]').contains("Test success");
    cy.get('[data-cy="modal"]').should("have.class", "bg-green-50");
  });

  it("Renders an error modal on the screen", () => {
    cy.mount(<Modal message="Test error" type="error" />);
    cy.get('[data-cy="modal"]').contains("Test error");
    cy.get('[data-cy="modal"]').should("have.class", "bg-red-50");
  });
});
