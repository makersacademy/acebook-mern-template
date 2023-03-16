import React from "react";
import Comment from "./Comment";

describe("Comment component", () => {
  const comment = {
    id: 1,
    message: "Hello, world",
    createdAt: new Date().toISOString(),
    authorName: "Tester",
  };

  beforeEach(() => {
    cy.mount(<Comment comment={comment} />);
  });

  it("displays the comment", () => {
    cy.get('[data-cy="comment"]').should("contain.text", "Hello, world");
  });

  it("should display the author name", () => {
    cy.get('[data-cy="comment"]').should("contain.text", "Tester");
  });

  it("should display the formatted date", () => {
    cy.get('[data-cy="comment"]').should("contain.text", "ago");
  });

  it("should display the avatar", () => {
    cy.get('[data-cy="comment"] img').should("have.attr", "src");
  });
});
