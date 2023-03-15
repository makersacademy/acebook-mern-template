import React from "react";
import Comments from "./Comments";

describe("Comments component", () => {
  describe("when post has no comments", () => {
    beforeEach(() => {
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
              postComments: [],
            },
          });
        }
      ).as("getMockComments");
    });

    it("should display the new comment form", () => {
      cy.mount(<Comments postId="1" />);
      cy.wait("@getMockComments").then(() => {
        cy.get('[data-cy="new-comment-form"]').should("exist");
      });
    });

    it("should display a message when there are no comments", () => {
      cy.mount(<Comments postId="1" />);
      cy.wait("@getMockComments").then(() => {
        cy.get('[data-cy="no-comments"]').should("exist");
      });
    });
  });

  describe("when comments are available", () => {
    beforeEach(() => {
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
    });

    it("should display the new comment form", () => {
      cy.mount(
        <Comments postId="1" updateCommentCount={{ updateCommentCount: 1 }} />
      );
      cy.wait("@getMockComments").then(() => {
        cy.get('[data-cy="new-comment-form"]').should("exist");
      });
    });

    it("should display the comment list when comments are present", () => {
      cy.mount(<Comments postId="1" />);
      cy.wait("@getMockComments").then(() => {
        cy.get('[data-cy="comment-list"]').should("exist");
        cy.get('[data-cy="comment"]').should("have.length", 2);
      });
    });
  });
});
