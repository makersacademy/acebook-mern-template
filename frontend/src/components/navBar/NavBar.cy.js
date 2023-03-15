import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "../../contexts/AuthContext";
import ModalContextProvider from "../../contexts/ModalContext";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("Shows the navbar on the /posts page", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/users", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          user: {
            name: "Poppy Pop",
            username: "poppyp",
          },
        },
      });
    }).as("getUser");

    cy.mount(
      <AuthContextProvider>
        <ModalContextProvider>
          <Router>
            <NavBar />
          </Router>
        </ModalContextProvider>
      </AuthContextProvider>
    );

    cy.wait("@getUser").then(() => {
      cy.get('[data-cy="user"]').should("contain.text", "Poppy Pop");
    });
  });

  it("Shows a menu when the profile name is clicked", () => {
    cy.mount(
      <AuthContextProvider>
        <ModalContextProvider>
          <Router>
            <NavBar />
          </Router>
        </ModalContextProvider>
      </AuthContextProvider>
    );
    cy.get('[data-cy="menu_items"]').should("not.exist");

    cy.get('[data-cy="profile_button"]').click();
    cy.get('[data-cy="menu_items"]').should("exist").should("be.visible");
  });
});
