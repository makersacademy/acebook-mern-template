import React from "react";
import Comments from "./Comments";

describe("Comments component", () => {
  it("should display the comment list and new comment form", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept(
      {
        pathname: "/posts/comment",
        query: {
          postId: "1",
        },
      },
      (req) => {
        req.reply({
          statusCode: 200,
          body: {
            postComments: [
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
      }
    ).as("getMockComments");

    cy.mount(<Comments postId="1" />);

    cy.wait("@getMockComments").then(() => {
      cy.get('[data-cy="comment-list"]').should("exist");
      cy.get('[data-cy="comment"]').should("have.length", 2);
    });
  });
});
