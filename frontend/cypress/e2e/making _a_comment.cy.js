describe("Commenting on a post", () => {

  before(() => {
    cy.signup("user@email.com", "12345678", "toppy")
  })

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get("#message").type("message to post")
    cy.get("#submit").click();
    cy.get("#comment").type("comment to post")
    cy.get("#submit-comment").click();
    cy.url().should("include", "/posts");
    });
});
