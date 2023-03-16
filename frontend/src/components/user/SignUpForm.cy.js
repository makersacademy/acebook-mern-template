import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ModalContextProvider from "../../contexts/ModalContext";
import SignUpForm, { checkPassword, passwordConfirmation } from "./SignUpForm";
import ModalList from "../modalList/ModalList";
import AuthContextProvider from "../../contexts/AuthContext";

describe("Signing up", () => {
  describe("#checkPassword", () => {
    it("should return false if the password.length < 6", () => {
      expect(checkPassword("12345")).to.equal(false);
    });

    it("should return false if the password doesn't have a capital letter", () => {
      expect(checkPassword("abcdef")).to.equal(false);
    });

    it("should return true if the password is more than six letters and has a capital letter at the beginning", () => {
      expect(checkPassword("Abcdef")).to.equal(true);
    });

    it("should return true if the password is more than six letters and has a capital letter in the middle", () => {
      expect(checkPassword("abcdEf")).to.equal(true);
    });
  });

  describe("#passwordConfirmation", () => {
    it("should return false if both passwords do not match", () => {
      expect(passwordConfirmation("Abcdef", "Abcdeg")).to.equal(false);
    });

    it("should return true if both passwords match", () => {
      expect(passwordConfirmation("Abcdeg", "Abcdeg")).to.equal(true);
    });
  });

  describe("form submission", () => {
    beforeEach(() => {
      cy.mount(
        <ModalContextProvider>
          <AuthContextProvider>
            <Router>
              <ModalList />
              <SignUpForm />
            </Router>
          </AuthContextProvider>
        </ModalContextProvider>
      );
    });

    it("calls the /users endpoint", () => {
      cy.intercept("POST", "/users", {
        statusCode: 201,
        body: {
          message: "You've successfully signed up. Please log in.",
        },
      }).as("signUpRequest");

      cy.get("#name").type("someone");
      cy.get("#username").type("someone");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password");
      cy.get("#password2").type("Password");
      cy.get("#submit").click();
      cy.wait("@signUpRequest").then(({ response }) => {
        expect(response.body.message).to.eq(
          "You've successfully signed up. Please log in."
        );
      });
    });

    it("should display an error modal when the password is invalid", () => {
      // SETUP
      cy.get("#name").type("someone");
      cy.get("#username").type("someone");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("wrong-password");
      cy.get("#password2").type("wrong-password");

      // ACTION
      cy.get("#submit").click();

      // ASSERT
      cy.get('[data-cy="modal"]').should(
        "have.text",
        "Password must have at least 6 characters and 1 capital letter."
      );
    });

    it("should display an error modal when password !== password2", () => {
      // SETUP
      cy.get("#name").type("someone");
      cy.get("#username").type("someone");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password");
      cy.get("#password2").type("AnotherPassword");

      // ACTION
      cy.get("#submit").click();

      // ASSERT
      cy.get('[data-cy="modal"]').should(
        "have.text",
        "Both passwords do not match"
      );
    });
  });
});
