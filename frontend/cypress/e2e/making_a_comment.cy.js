describe("Making a comment", () => {
  describe("with invalid credentials", () => {
    it("does not create a comment", () => {
      cy.visit("/posts");
      cy.get("#commentInput").should("not.exist");
    });
  });

  describe("with valid credentials", () => {
    beforeEach(() => {
      cy.login("user@email.com", "12345678");
    });

    it("creates a comment and displays a comment", () => {
      cy.createPost("Hello world");
      cy.get('[data-cy="post"]')
        .first()
        .within(() => {
          cy.get("#comments-btn").click();
          cy.get("#comment-input").type("Hello world");
          cy.get("#submit-comment-btn").click();
        });
    });

    it("displays comment", () => {
      cy.get('[data-cy="post"]')
        .first()
        .within(() => {
          cy.get("#comments-btn").click();
          cy.get('[data-cy="comment"]').should("contain.text", "Hello world");
        });
    });

    it("displays a message when no comments are available", () => {
      cy.createPost("Hello world");
      cy.get('[data-cy="post"]')
        .first()
        .within(() => {
          cy.get("#comments-btn").click();
          cy.get('[data-cy="no-comments"]').should(
            "contain.text",
            "No comments yet"
          );
        });
    });
  });
});
