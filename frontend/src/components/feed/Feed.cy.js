import React from "react";
import AuthContextProvider from "../../contexts/AuthContext";
import Feed from "./Feed";

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.mount(
      <AuthContextProvider>
        <Feed />
      </AuthContextProvider>
    );

    cy.intercept("get", "/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          token: "fakeToken",
          posts: [
            {
              _id: 1,
              message: "Hello, world",
              author: { username: "chris" },
              createdAt: "2022-01-01",
            },
            {
              _id: 2,
              message: "Hello again, world",
              author: { username: "chris" },
              createdAt: "2023-03-08",
            },
          ],
        },
      });
    }).as("getPosts");

    cy.wait("@getPosts").then(() => {
      cy.get('[data-cy="post"]')
        .should("contain.text", "Hello again, world")
        .and("contain.text", "Hello, world");
    });
  });
});
