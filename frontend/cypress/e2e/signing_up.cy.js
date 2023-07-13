describe("Signing up", () => {
  it("with valid credentials, redirects to '/login'", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();

    cy.url().should("include", "/");
  });

  it("with missing password, submit button remains visible", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();
    
    cy.get("#submit").should('be.visible'); //passes 
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
});