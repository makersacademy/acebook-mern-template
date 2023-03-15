import React from "react";
import NewPost from "./NewPost";

describe("NewPost component", () => {
  beforeEach(() => {
    cy.mount(<NewPost getPosts={() => {}} />);
  });

  describe("initially", () => {
    it("should display the placeholder text", () => {
      cy.get('[data-cy="input"]').should(
        "have.attr",
        "placeholder",
        "What's on your mind?"
      );
    });

    xit("should have a disabled post button", () => {
      cy.get("#submit").should("have.attr", "disabled");
    });
  });

  describe("once text is input", () => {
    beforeEach(() => {
      cy.get('[data-cy="input"]').type("test post");
    });

    it("should display the text in the input", () => {
      cy.get('[data-cy="input"]').should("have.value", "test post");
    });

    it("should enable the post button", () => {
      cy.get("#submit").should("not.have.attr", "disabled");
    });

    describe("once the post button is clicked", () => {
      beforeEach(() => {
        cy.intercept("POST", "/posts", (req) => {
          req.reply({
            statusCode: 201,
            body: { message: "OK" },
          });
        }).as("createPost");
        cy.get("#submit").click();
      });

      it("clears the input", () => {
        cy.wait("@createPost").then(() => {
          cy.get('[data-cy="input"]').should("have.value", "");
        });
      });

      xit("disables the post button", () => {
        cy.get("#submit").should("have.attr", "disabled");
      });
    });
  });

  // NewPost.cy.js
  // 1. check if there is a input field in the form (DONE)
  // 2. Empty message and file field should return an error message (DONE)
  // 3. Message but no file field, user should be able to submit
  // 4. File filed but no message, user should be able to submit
  // 5. Both file and message is filled, user should be able to submit

  describe("image-related-tests", () => {
    it("should return an error message if the file and message are both empty", () => {
      cy.get("#submit").click();
      cy.get('[data-cy="error-message"]')
        .invoke("text")
        .should("contain", "Message and Image can't both be empty");
    });
  });
});
