import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./LoginForm";

const navigate = () => {};

describe("Logging in", () => {
  it("calls the /tokens endpoint", () => {
    cy.mount(
      <Router>
        <LoginForm navigate={navigate} />
      </Router>
    );

    cy.intercept("POST", "/tokens", { token: "fakeToken" }).as("loginRequest");

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.body.token).to.eq("fakeToken");
    });
  });
});
