import React from "react";
import Modal from "./Modal";

describe("Modal", () => {
  it("Renders a success modal on the screen", () => {
    cy.mount(
      <Modal
        title="Success"
        subText="You have logged in succesfully"
        type="success"
        id="success-modal"
      />
    );
    cy.get('[data-cy="modal"]').contains("You have logged in succesfully");
  });

  it("Renders a failed modal on the screen", () => {
    cy.mount(
      <Modal
        title="Login Failed"
        subText="Sorry, we weren't able to log you in"
        type="fail"
        id="fail-modal"
      />
    );
    cy.get('[data-cy="modal"]').contains(
      "Sorry, we weren't able to log you in"
    );
  });
});
