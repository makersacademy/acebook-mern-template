import React from "react";
import ModalContextProvider from "../../contexts/modalContext";
import ModalList from "./ModalList";

describe("Modal", () => {
  it("should display nothing if an empty array is passed", () => {
    const modalList = [];
    cy.mount(
      <ModalContextProvider>
        <ModalList modals={modalList} />
      </ModalContextProvider>
    );

    cy.get('[data-cy="modal"]').should("not.exist");
  });

  it("should display a modal", () => {
    const modalList = [
      {
        id: crypto.randomUUID(),
        message: "This is the message",
        type: "success",
      },
    ];
    cy.mount(
      <ModalContextProvider>
        <ModalList modals={modalList} />
      </ModalContextProvider>
    );

    cy.get('[data-cy="modal"]').should("have.length", 1);
    cy.get('[data-cy="modal-list"]').contains("This is the message");
  });

  it("should display multiple modals", () => {
    const modalList = [
      {
        id: crypto.randomUUID(),
        message: "This is the message",
        type: "success",
      },
      {
        id: crypto.randomUUID(),
        message: "This is the second message",
        type: "fail",
      },
    ];
    cy.mount(
      <ModalContextProvider>
        <ModalList modals={modalList} />
      </ModalContextProvider>
    );

    cy.get('[data-cy="modal"]').should("have.length", 2);
    cy.get('[data-cy="modal-list"]').contains("This is the message");
    cy.get('[data-cy="modal-list"]').contains("This is the second message");
  });
});
