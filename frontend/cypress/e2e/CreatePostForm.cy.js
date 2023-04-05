describe("Creates a post.", () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // this is used to not fail the test when something
    // outside of cypress is causing an issue
    return false
  })

  it("Redirects to '/posts' after creating post.", () => {
    cy.intercept("POST", "/posts", (req) => {
      req.reply((res) => {
        res.send({ success: true });
      });
    }).as("createpost");
    
    cy.visit("/signup");
    cy.signup("user@email.com", "12345678")
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
    cy.visit("/createpost");
    cy.get("#message").type("Hello World");
    cy.get("#submit").click();
  
    cy.wait("@createpost");
    cy.url().should("include", "/posts");
  });
});
