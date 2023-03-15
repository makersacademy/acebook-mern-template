import React from "react";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("Shows the navbar on the /posts page", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/users", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          user: [
            {
              name: "Poppy Pop",
              username: "poppyp",
            },
          ],
        },
      });
    }).as("getUser");

    cy.mount(<NavBar />);

    cy.wait("@getUser").then(() => {
      cy.get('[data-cy="user"]').should("contain.text", "Poppy Pop");
    });
  });
});
