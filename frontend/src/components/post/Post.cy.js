import React from "react";
import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: "Hello, world",
          author: { username: "Abi" },
          createdAt: "2023-01-01T12:00:00.00+00:00",
          comments: { length: 2 },
        }}
      />
    );
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
    cy.get("#comments-btn-container").within(() => {
      cy.get("#comment-count").should("contain.text", "2");
    });
  });
});
