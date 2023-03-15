import React from "react";
import NewComment from "./NewComment";

describe("NewComment component", () => {
  beforeEach(() => {
    cy.mount(<NewComment getComments={() => {}} />);
  });

  describe("initially", () => {
    it("should display the placeholder text", () => {
      cy.get('[data-cy="input"]').should(
        "have.attr",
        "placeholder",
        "Want to comment?"
      );
    });
    it("should have a hid/display comment button", () => {
      cy.get("#submit").should("have.attr", "disabled");
    });
  });

  describe("once text is input", () => {
    beforeEach(() => {
      cy.get('[data-cy="input"]').type("test comment");
    });

    it("should display the text in the input", () => {
      cy.get('[data-cy="input"]').should("have.value", "test comment");
    });

    it("should enable the post button", () => {
      cy.get("#submit").should("not.have.attr", "disabled");
    });

    describe("once the comment button is clicked", () => {
      beforeEach(() => {
        cy.intercept("POST", "/posts/comment", (req) => {
          req.reply({
            statusCode: 201,
            body: { message: "OK" },
          });
        }).as("createComment");
        cy.get("#submit").click();
      });

      it("clears the input", () => {
        cy.wait("@createComment").then(() => {
          cy.get('[data-cy="input"]').should("have.value", "");
        });
      });

      it("disables the comment button", () => {
        cy.get("#submit").should("have.attr", "disabled");
      });
    });
  });
});
