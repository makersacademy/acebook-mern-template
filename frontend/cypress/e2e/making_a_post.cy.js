describe("Making a post", () => {
  before(() => {
    cy.signup("user@email.com", "12345678", "user");
  });

  it("Signed in user makes posts and they appear on page in correct order", () => {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();

    cy.visit("/posts");
    cy.get("#message").type("Hello, world");
    cy.get("#submit").click();
    cy.get("#message").type("Hello, again world");
    cy.get("#submit").click();
    cy.get("#feed").within(() => {
      cy.log("does this work");
      cy.get("article").eq(0).contains("Post from user:Hello, again world");
      cy.get("article").eq(1).contains("Post from user:Hello, world");
    });
  });
});
