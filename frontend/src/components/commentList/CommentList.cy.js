import React from "react";
import CommentList from "./CommentList";

describe("CommentList component", () => {
  const comments = [
    {
      id: 1,
      message: "Hello, world",
      createdAt: new Date().toISOString(),
      authorName: "Tester",
    },
    {
      id: 2,
      message: "Hello again, world",
      createdAt: new Date().toISOString(),
      authorName: "Tester",
    },
  ];

  beforeEach(() => {
    cy.mount(<CommentList comments={comments} />);
  });

  it("displays the comments", () => {
    cy.get('[data-cy="comment"]').should("have.length", 2);
  });
});
