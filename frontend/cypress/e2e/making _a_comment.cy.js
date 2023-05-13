describe("Commenting on a post", () => {

    before(() => {
      cy.signup("user@email.com", "12345678", 'toppy')
      cy.login("user@email.com", "12345678")
    })
  
    it("with valid credentials, you should have added a comment '/posts'", () => {
      cy.visit("/posts");
      cy.get("#message").type("message to post")
      cy.get("#submit").click();
      cy.get("#comment").type("message to post")
      cy.get("#submit").click();
      cy.url().should("include", "/posts");
    });
});
