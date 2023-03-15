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
          comments: { length: 1 },
        }}
      />
    );
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });
});
