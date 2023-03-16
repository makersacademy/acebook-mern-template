import React from "react";
import AuthContextProvider from "../../contexts/AuthContext";
import NewPost from "./NewPost";

describe("NewPost component", () => {
  beforeEach(() => {
    cy.mount(
      <AuthContextProvider>
        <NewPost getPosts={() => {}} />
      </AuthContextProvider>
    );
  });

  describe("initially", () => {
    it("should display the placeholder text", () => {
      cy.get('[data-cy="input"]').should(
        "have.attr",
        "placeholder",
        "What's on your mind?"
      );
    });

    it("should have a disabled post button", () => {
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

      it("disables the post button", () => {
        cy.get("#submit").should("have.attr", "disabled");
      });
    });
  });
});
