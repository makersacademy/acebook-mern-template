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
    });
  });

  // NewPost.cy.js
  // 1. check if there is a input field in the form (DONE)
  // 2. Empty message and file field should return an error message (DONE)
  // 3. Message but no file field, user should be able to submit
  // 4. File filed but no message, user should be able to submit
  // 5. Both file and message is filled, user should be able to submit

  describe("image-related-tests", () => {
    beforeEach(() => {
      cy.intercept("POST", "/posts", (req) => {
        req.reply({
          statusCode: 201,
          body: { message: "OK" },
        });
      }).as("createPost");

      cy.intercept(
        "POST",
        "https://api.cloudinary.com/v1_1/ddav2oh8j/image/upload",
        (req) => {
          req.reply({
            body: {},
          });
        }
      ).as("upload");

      cy.intercept("POST", "/images", (req) => {
        req.reply({
          statusCode: 201,
          body: {},
        });
      }).as("image");
    });

    it("should return an error message if the file and message are both empty", () => {
      cy.get("#submit").click();
      cy.get('[data-cy="error-message"]')
        .invoke("text")
        .should("contain", "Message and Image can't both be empty");
    });

    it("should return no error message if the post field is populated but not the image", () => {
      cy.get('[data-cy="input"').type("I want to sleep");
      cy.get("#submit").click();
      cy.wait("@createPost");
      cy.get('[data-cy="error-message"]').should("not.exist");
    });

    it("should return no error message if the image and post field is populated", () => {
      // SETUP
      const fixtureFile = "acebook-logo.png";
      cy.get('[data-cy="file"]').attachFile(fixtureFile);

      // ACTION
      cy.get('[data-cy="input"').type("I want to sleep");
      cy.get("#submit").click();

      cy.wait("@upload");
      cy.wait("@image");
      cy.wait("@createPost");

      // ASSERT
      cy.get('[data-cy="error-message"]').should("not.exist");
    });

    it("should be able to submit when only the image input is filled", () => {
      // SETUP
      const fixtureFile = "acebook-logo.png";
      cy.get('[data-cy="file"]').attachFile(fixtureFile);

      // ACTION
      cy.get("#submit").click();

      // ASSERT
      cy.wait("@upload");
      cy.wait("@image");
      cy.wait("@createPost");

      cy.get('[data-cy="error-message"]').should("not.exist");
    });
  });
});
