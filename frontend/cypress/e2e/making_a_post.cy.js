describe("Making a post", () => {
  describe("with invalid credentials", () => {
    it("does not create a new post", () => {
      cy.visit("/posts");
      cy.get("#message").should("not.exist");
    });
  });

  describe("with valid credentials", () => {
    before(() => {
      cy.login("user@email.com", "12345678");
    });

    it("creates a new post", () => {
      cy.createPost("Hello, world");
      cy.get('[data-cy="post"]').should("exist");
      cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
    });
  });
});
