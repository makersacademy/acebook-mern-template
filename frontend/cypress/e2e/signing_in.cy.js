describe("Signing in", () => {

  before(() => {
    cy.signup("someone@example.com", "password", "John", "Smith")
  })

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("with missing email, remains on /login", () => {
    cy.visit("/login");
    cy.get("#password").type("password");
    cy.get("#submit").click();
  
    cy.url().should("include", "/login");
  });

  it("with missing password, remains on login", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();
  
    cy.url().should("include", "/login");
  });
});