import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "./SignUpForm";

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(
      <Router>
        <SignUpForm />
      </Router>
    );

    cy.intercept("POST", "/users", { message: "OK" }).as("signUpRequest");

    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait("@signUpRequest").then((interception) => {
      expect(interception.response.body.message).to.eq("OK");
    });
  });
});
